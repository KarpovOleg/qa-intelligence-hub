import { test, expect } from '@playwright/test';

const BASE_URL = process.env.SUT_URL || 'https://example.com';

interface Endpoint {
  path: string;
  expectedStatus: number;
  expectedText: string;
}

const endpoints: Endpoint[] = [
  { path: '/', expectedStatus: 200, expectedText: '<h1>Example Domain</h1>' },
  { path: '/api', expectedStatus: 404, expectedText: '<title>Example Domain</title>' },
];

test.use({ ignoreHTTPSErrors: true });

test.describe(`API tests for SUT: ${BASE_URL}`, () => {
  for (const e of endpoints) {
    const p: string = e.path.startsWith('http') ? e.path : `${BASE_URL}${e.path}`;

    test(`GET ${p}`, async ({ request }) => {
      console.info(`Testing ${p}`);

      const response = await request.get(e.path);
      const body = await response.text();

      try {
        expect(response.status()).toBe(e.expectedStatus);
      } catch (err) {
        console.error(`Status code check failed for ${p}`);
        console.error('Response body:', body);
        throw err;
      }

      try {
        expect(body).toContain(e.expectedText);
      } catch (err) {
        console.error(`Body check failed for ${p}`);
        console.error('Response body:', body);
        throw err;
      }

      console.info(`Test passed for ${p}`);
    });
  }
});
