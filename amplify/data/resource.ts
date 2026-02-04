import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { analyzeFailure } from '../functions/analyze-failure/resource';

const schema = a.schema({
  TestResult: a.model({
    testName: a.string().required(),
    framework: a.enum(['SELENIUM', 'PLAYWRIGHT']),
    status: a.enum(['PASSED', 'FAILED']),
    errorLog: a.string(),
    aiRootCause: a.string(),
    duration: a.float(),
  }).authorization(allow => [allow.publicApiKey()]),

  analyzeFailure: a.query()
    .arguments({ errorLog: a.string() })
    .returns(a.string())
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(analyzeFailure))
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  }
});