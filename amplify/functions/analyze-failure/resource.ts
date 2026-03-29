import { defineFunction } from '@aws-amplify/backend';

export const analyzeFailure = defineFunction({
  name: 'analyze-failure',
  entry: './handler.ts',
  timeoutSeconds: 30,
  environment: {
    BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID ?? '',
  },
});
