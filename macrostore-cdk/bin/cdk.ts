#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SpaStack, DatabaseStack, ComputeStack, IntegrationStack } from '../lib/stacks';
import { Context } from '../lib/context';

const app = new cdk.App();
const env = app.node.tryGetContext('env') ?? 'dev';
const context = Context.create(env);

new SpaStack(app, context.fullName('ClothingStoreSpaStack'), {
  spaName: 'clothing-store'
});
new SpaStack(app, context.fullName('ElectronicsStoreSpaStack'), {
  spaName: 'electronics-store'
});
new DatabaseStack(app, context.fullName('DatabaseStack'));
new ComputeStack(app, context.fullName('ComputeStack'));
new IntegrationStack(app, context.fullName('IntegrationStack'));