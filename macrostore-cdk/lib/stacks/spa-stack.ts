import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontorigins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Context } from '../context';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface SpaStackProps extends cdk.StackProps {
  spaName: string;
}

export class SpaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SpaStackProps) {
    super(scope, id, props);
    const context = Context.get();
    const { spaName } = props;

    const destinationBucket = new s3.Bucket(this, 'bucket', {
      bucketName: context.fullName(spaName),
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      'distribution-OIA',
      {
        comment: `Setup access from CloudFront to the spa bucket ( read )`,
      }
    );
    destinationBucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(this, 'distribution', {
      defaultBehavior: {
        origin: new cloudfrontorigins.S3Origin(destinationBucket, {
          originAccessIdentity: originAccessIdentity,
        }),
      },
      defaultRootObject: 'index.html',
    });

    new s3deployment.BucketDeployment(this, 'bucket-deployment', {
      sources: [
        s3deployment.Source.asset(`../dist/${spaName}`)
      ],
      destinationBucket,
      distribution,
      distributionPaths: ['/index.html']
    });
  }
}
