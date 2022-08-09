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

## Developing this package

### To build compiled js

````
npm run build
````

### To run unit lint & unit tests

````
npm run unit
npm run lint
npm run lint:fix // clean up files per eslint config
npm test // run lint & unit tests
````

### To deploy to the npm registry via CircleCi

Once CircleCi is enabled and registry env values are configured, deployment to an npm registry is done automatically via CircleCi for all updates to the main branch.

````
git push origin main
````
