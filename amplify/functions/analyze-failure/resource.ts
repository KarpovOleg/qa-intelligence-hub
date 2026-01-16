import { defineFunction } from '@aws-amplify/backend';

export const analyzeFailure = defineFunction({
  name: 'analyze-failure',
  entry: './handler.ts'
});
