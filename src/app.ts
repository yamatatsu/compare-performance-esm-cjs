import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";

const app = new cdk.App();
const stack = new cdk.Stack(app, "ComparePerformanceEsmCjs");

new nodejs.NodejsFunction(stack, "CJS", {
  functionName: "ComparePerformanceEsmCjs-CJS",
  entry: "src/handler.ts",
  architecture: lambda.Architecture.ARM_64,
  runtime: lambda.Runtime.NODEJS_20_X,
});

new nodejs.NodejsFunction(stack, "ESM", {
  functionName: "ComparePerformanceEsmCjs-ESM",
  entry: "src/handler.ts",
  architecture: lambda.Architecture.ARM_64,
  runtime: lambda.Runtime.NODEJS_20_X,
  bundling: {
    target: "node20",
    format: nodejs.OutputFormat.ESM,
    nodeModules: ["zod", "@aws-lambda-powertools/logger"],
  },
});
