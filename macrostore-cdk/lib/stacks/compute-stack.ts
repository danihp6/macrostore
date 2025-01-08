import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdanodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Context } from '../context';
import * as path from 'path';
import { Constants } from '../constants';

const lambdasPath = path.join(__dirname, '../../src/lambdas');

export class ComputeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const context = Context.get();

    const productsTableName = context.fullName(Constants.productsTableName);
    const productImagesBucketName = context.fullName(Constants.productImagesName);

    const getProducts = new lambdanodejs.NodejsFunction(this, 'get-products', {
      functionName: context.fullName('get-products'),
      entry: path.join(lambdasPath, 'get-products', 'index.ts'),
      runtime: lambda.Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(3),
      environment: {
        PRODUCTS_TABLE_NAME: productsTableName,
        PRODUCT_IMAGES_BUCKET_NAME: productImagesBucketName
      },
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'dynamodb:Query'
          ],
          resources: [
            `arn:aws:dynamodb:${this.region}:${this.account}:table/${productsTableName}`
          ]
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            's3:GetObject'
          ],
          resources: [
            `arn:aws:s3:::${productImagesBucketName}/*`
          ]
        })
      ],
      logRetention: logs.RetentionDays.ONE_DAY
    });
    getProducts.grantInvoke(new iam.ServicePrincipal('apigateway.amazonaws.com'));
  }
}
