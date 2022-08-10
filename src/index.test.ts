import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Ec2CdkStack } from './index';
import { Template } from 'aws-cdk-lib/assertions';

test('test default setup', () => {
    const app = new cdk.App();
    const userDataPath = path.join(__dirname, 'testUserData.sh');

    const stack = new Ec2CdkStack(app, 'StackIdentifier', {}, {
        userDataPath
    });

    const template = Template.fromStack(stack);

    expect(template.toJSON()).toMatchSnapshot();
});

test('test with options', () => {
    const app = new cdk.App();
    const userDataPath = path.join(__dirname, 'testUserData.sh');

    const stack = new Ec2CdkStack(app, 'StackIdentifier', {}, {
        userDataPath,
        image: 'image-id'
    });

    const template = Template.fromStack(stack);

    expect(template.toJSON()).toMatchSnapshot();
});