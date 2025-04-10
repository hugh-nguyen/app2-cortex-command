#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { App2ServiceYStack } from '../lib/service-y-stack';

const app = new cdk.App();
new App2ServiceYStack(app, 'ServiceYStack', {
  env: { 
    account: "495599745704", 
    region: 'ap-southeast-2' 
  },
  description: 'Serverless deployment of app2-service-y using Lambda and API Gateway',
});