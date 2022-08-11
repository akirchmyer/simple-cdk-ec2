# simple-cdk-ec2

Quickly run an EC2 instance which:
- Has its own configurable VPC, Subnet, Security Group, and Role
- Has an SSH key pair automatically created
- Is open to ports 22, 80 and 443 by default (also configurable)
- Automatically runs a provided user data script

## How to use

````
npm install simple-cdk-ec2
````

````
import * as cdk from 'aws-cdk-lib'
import * as path from 'path';
import { Ec2CdkStack } from 'simple-cdk-ec2'

const app = new cdk.App();

const userDataPath = path.join(__dirname, './path/to/a/useful/boot/script.sh');
new Ec2CdkStack(app, 'MyEc2CdkStack', {}, {
    userDataPath,
    image: 'ami-090fa75af13c156b4'
});
````

````
cdk deploy  // deploy your CDK app
cdk destroy // destroy your CDK app
````

## Configuration

| Prop name   | Type        | Default Value | Description |
| ----------- | ----------- | ------------- | ----------- |
| userDataPath | ?string | null | Path to a file which contains a bash script that runs after your EC2 instance is created |
| image | ?string | 'ami-090fa75af13c156b4' | Which machine image to use for your Ec2 |
| allowPorts | ?Array<number> | [22, 80, 443] | Which ports should your security group allow public Ipv4 ingress |
| vpcProps | ?ec2.VpcProps (from aws-cdk-lib/aws-ec2) | See index.ts | Override the default VPC configuration in this package |
| securityGroupProps | ?ec2.SecurityGroupProps (from aws-cdk-lib/aws-ec2) | See index.ts | Override the default Security Group configuration in this package |
| ec2Props | ?ec2.Ec2Props (from aws-cdk-lib/aws-ec2) | See index.ts | Override the default EC2 instance configuration in this package |
