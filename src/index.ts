import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as KeyPair from 'cdk-ec2-key-pair';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';

interface Ec2CdkStackOptions {
    userDataPath?: string,
    vpcProps?: ec2.VpcProps,
    securityGroupProps?: ec2.SecurityGroupProps,
    allowPorts?: Array<number>,
    image?: string,
    ec2Props?: ec2.SecurityGroupProps
}

export class Ec2CdkStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps, options: Ec2CdkStackOptions) {
    super(scope, id, props);

    const key = new KeyPair.KeyPair(this, `${id}KeyPair`, {
       name: `${id}-keypair`,
       description: 'Key Pair created with CDK Deployment'
    });

    const vpc = new ec2.Vpc(this, `${id}VPC`, {
      natGateways: 0,
      subnetConfiguration: [{
        cidrMask: 24,
        name: "asterisk",
        subnetType: ec2.SubnetType.PUBLIC
      }],
      ...(options.vpcProps || {})
    });

    const securityGroup = new ec2.SecurityGroup(this, `${id}SecurityGroup`, {
      vpc,
      description: 'Allow SSH (TCP port 22) in',
      allowAllOutbound: true,
      ...(options.securityGroupProps || {})
    });

    (options.allowPorts || [22, 80, 443]).forEach((port) => {
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(port), `Allow ${port}`)
    });

    const role = new iam.Role(this, `${id}Ec2Role`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'))

    const ami = new ec2.GenericLinuxImage({
        // Amazon Linux 2 Kernel 5.10 AMI 2.0.20220719.0 x86_64 HVM gp2
        'us-east-1': options.image || 'ami-090fa75af13c156b4',
    });

    const ec2Instance = new ec2.Instance(this, `${id}Instance`, {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ami,
      securityGroup: securityGroup,
      keyName: key.keyPairName,
      role: role,
      instanceName: `${id}Ec2Instance`,
      ...(options.ec2Props || {})
    });

    if (options.userDataPath) {
      // Create an asset that will be used as part of User Data to run on first load
      const asset = new Asset(this, `${id}Asset`, { path: options.userDataPath });
      const localPath = ec2Instance.userData.addS3DownloadCommand({
        bucket: asset.bucket,
        bucketKey: asset.s3ObjectKey,
      });

      ec2Instance.userData.addExecuteFileCommand({
        filePath: localPath,
        arguments: '--verbose -y'
      });
      asset.grantRead(ec2Instance.role);
    }

    // Create outputs for connecting
    new cdk.CfnOutput(this, 'IP Address', { value: ec2Instance.instancePublicIp });
    new cdk.CfnOutput(this, 'Key Name', { value: key.keyPairName })
    new cdk.CfnOutput(this, 'Download Key Command', { value: 'aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text > cdk-key.pem && chmod 400 cdk-key.pem' })
    new cdk.CfnOutput(this, 'ssh command', { value: 'ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@' + ec2Instance.instancePublicIp })
  }
}
