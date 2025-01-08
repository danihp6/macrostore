/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProxyHandler } from 'aws-lambda';
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const PRODUCTS_TABLE_NAME = process.env.PRODUCTS_TABLE_NAME ?? '';
const PRODUCT_IMAGES_BUCKET_NAME = process.env.PRODUCT_IMAGES_BUCKET_NAME ?? '';
const headers = {
  'Access-Control-Allow-Origin': '*'
};

const dynamodb = new DynamoDBClient();
const s3 = new S3Client();

export const handler: ProxyHandler = async (event)  => {
  if (!event.pathParameters) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'Path parameters required'
      })
    };
  }

  const { department } = event.pathParameters;

  if (!department) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'department required'
      })
    };
  }

  let filterExpression: undefined | string = undefined;
  const expressionAttributeValues: { [key: string]: any } = {};
  let expressionAttributeNames:  undefined | { [key: string]: any } = undefined;

  Object.entries(event.queryStringParameters ?? {}).forEach(([key, value], index) => {
    const attributePlaceholder = `#${key}`;
    const valuePlaceholder = `:${key}`;

    if (!filterExpression) {
      filterExpression = '';
    }
    filterExpression += `${index > 0 ? ' AND ' : ''}${attributePlaceholder} = ${valuePlaceholder}`;

    expressionAttributeValues[valuePlaceholder] = { S: value };
    if (!expressionAttributeNames) {
      expressionAttributeNames = {};
    }
    expressionAttributeNames[attributePlaceholder] = key;
  });

  const response = await dynamodb.send(new QueryCommand({
    TableName: PRODUCTS_TABLE_NAME,
    KeyConditionExpression: 'department = :department',
    FilterExpression: filterExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: {
      ':department': { S: department },
      ...expressionAttributeValues
    },
  }));

  if (!response.Items) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'not exists'
      })
    };
  }

  const products = await Promise.all(
    response.Items?.map(async item => {
      const product = unmarshall(item);
      const image = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: PRODUCT_IMAGES_BUCKET_NAME,
          Key: product.image,
        }),
        { expiresIn: 300 }
      );
      return {
        ...product,
        image
      };
    }) ?? []
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      products
    })
  };
};
