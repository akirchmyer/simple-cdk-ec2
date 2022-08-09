import * as path from 'path';
import { Ec2CdkStack } from './index';
import { Stack } from 'aws-cdk-lib';
import 'jest-cdk-snapshot';

test('test default setup', () => {
  const stack = new Stack();

  const userDataPath = path.join(__dirname, 'testUserData.sh');

  new Ec2CdkStack(stack, 'StackName', {}, {
      userDataPath
  });

  expect(stack).toMatchCdkSnapshot({
      yaml: true,
      ignoreAssets: true
  });
});

test('test with options', () => {
  const stack = new Stack();

  const userDataPath = path.join(__dirname, 'testUserData.sh');

  new Ec2CdkStack(stack, 'StackName', {}, {
      image: 'foobar',
      userDataPath
  });

  expect(stack).toMatchCdkSnapshot({
      yaml: true,
      ignoreAssets: true
  });

});