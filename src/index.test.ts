import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Ec2CdkStack } from './index';
import { Template } from 'aws-cdk-lib/assertions';

test('test default setup', () => {
    const app = new cdk.App();
    const userDataPath = path.join(__dirname, 'testUserData.sh');
    const stack = new Ec2CdkStack(
        app,
        'StackIdentifier',
        {},
        {
            userDataPath
        }
    );
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
});

test('test with no user data', () => {
    const app = new cdk.App();
    const stack = new Ec2CdkStack(app, 'StackIdentifier', {}, {});
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
});

test('test with options', () => {
    const app = new cdk.App();
    const userDataPath = path.join(__dirname, 'testUserData.sh');
    const stack = new Ec2CdkStack(app, 'StackIdentifier', {}, {
        userDataPath,
        vpcProps: {
            natGateways: 1
        },
        securityGroupProps: {
            allowAllOutbound: false
        },
        allowPorts: [8080],
        image: 'image-id',
        ec2Props: {
            instanceName: 'MyInstance'
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
});
