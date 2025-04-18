#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { App2ServiceYStack } from '../lib/service-y-stack';

const app     = new cdk.App();
const version = app.node.tryGetContext('version') as string ?? 'dev';

new App2ServiceYStack(
  app,
  `app2-service-y-${version}`,
  {
    stackName: `app2-service-y-${version}`,
    env: { account: '495599745704', region: 'ap-southeast-2' },
    description: `Serverless deployment of app2-service-y v${version}`,
  },
);
