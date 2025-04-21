import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejsLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class App2ServiceYStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const version = this.node.tryGetContext('version') as string ?? 'dev';

    // Create Lambda function from TypeScript
    const lambdaFunction = new nodejsLambda.NodejsFunction(this, `app2-service-y-${version}-lambda-function`, {
      functionName: `app2-service-y-${version}-lambda-function`,
      entry: path.join(__dirname, '../../app2-service-y/dist/index.js'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: ['aws-sdk'],
      }
    });

    // Create API Gateway
    const api = new apigateway.RestApi(this, `app2-service-y-${version}-api`, {
      restApiName: `app2-service-y-${version}-api`,
      deployOptions: {
        stageName: 'prod'
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

    // Add getresult endpoint
    const getResultResource = api.root.addResource('getresult');
    getResultResource.addMethod('GET', new apigateway.LambdaIntegration(lambdaFunction));

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'API Gateway URL'
    });
  }
}