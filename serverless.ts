import type { AWS } from '@serverless/typescript';
import { shipping } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'code-challenge',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    endpointType: 'regional',

  },
  functions: {
    'shipping-dates': shipping
  }
}

module.exports = serverlessConfiguration;
