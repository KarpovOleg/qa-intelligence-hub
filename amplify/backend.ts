import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { analyzeFailure } from './functions/analyze-failure/resource';

defineBackend({
  auth,
  data,
  analyzeFailure,
});
