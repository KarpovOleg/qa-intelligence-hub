import { test, expect } from '@playwright/test';
import { apiGet, BASE_URL } from '../utils/apiHelper';

interface Endpoint {
  path: string;
  expectedHeader: string;
}

const endpoints: Endpoint[] = [
  { path: '/', expectedHeader: '<h1>Example Domain</h1>' },
  { path: 'https://www.iana.org/domains/reserved', expectedHeader: '<title>IANA-managed Reserved Domains</title>' },
];

test.describe(`API tests for environment: ${process.env.API_ENV || 'prod'}`, () => {

  for (const e of endpoints) {
    const p: string = e.path.startsWith('http') ? e.path : `${BASE_URL}${e.path}`;

    test(`GET ${p}`, async () => {
      console.info(`Testing ${p}`);

      const { response, body } = await apiGet(e.path);

      try {
        expect(response.status).toBe(200);
      } catch (err) {
        console.error(`Status code check failed for ${p}`);
        console.error('Response body:', body);
        throw err;
      }

      try {
        expect(body).toContain(e.expectedHeader);
      } catch (err) {
        console.error(`Body check failed for ${p}`);
        console.error('Response body:', body);
        throw err;
      }

      console.info(`Test passed for ${p}`);
    });
  }
});
