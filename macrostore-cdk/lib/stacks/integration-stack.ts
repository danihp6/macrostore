import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Context } from '../context';
import { Constants } from '../constants';

const apiDefinitionPath = 'assets/apis/api.yaml';

export class IntegrationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const context = Context.get();

    new apigateway.SpecRestApi(this, 'api', {
      restApiName: context.fullName('api'),
      apiDefinition: apigateway.ApiDefinition.fromAsset(apiDefinitionPath),
      deployOptions: {
        stageName: context.env,
        variables: {
          appName: Constants.appName,
          env: context.env
        }
      }
    });
  }
}
