import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Context } from '../context';
import { Constants } from '../constants';

export class DatabaseStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const context = Context.get();

    new dynamodb.Table(this, 'products', {
      tableName: context.fullName(Constants.productsTableName),
      partitionKey: {
        name: 'class',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });
  }
}
