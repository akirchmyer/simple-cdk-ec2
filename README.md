# simple-cdk-ec2

Spin up a simple EC2 server via CDK. Run your provided user data script.

## How to use

````
npm install simple-cdk-ec2
````

````
import * as cdk from 'aws-cdk-lib'
import * as path from 'path';
import { Ec2CdkStack } from 'simple-cdk-ec2'

const app = new cdk.App();

const userDataPath = path.join(__dirname, '../src/config.sh');
new Ec2CdkStack(app, 'MyEc2CdkStack', {}, {
    userDataPath,
    image: 'ami-090fa75af13c156b4'
});
````
