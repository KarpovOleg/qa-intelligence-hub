import { Reporter, TestCase, TestResult as PlaywrightTestResult } from '@playwright/test/reporter';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json' with { type: 'json' };

Amplify.configure(outputs);
const client = generateClient<Schema>();

class AWSAmplifyReporter implements Reporter {
  private promises: Promise<any>[] = [];

  onTestEnd(test: TestCase, result: PlaywrightTestResult) {
    const status = result.status === 'passed' ? 'PASSED' : 'FAILED';

    const syncOperation = (async () => {
      try {
        let aiInsight = "N/A";
        if (status === 'FAILED') {
          const { data } = await client.queries.analyzeFailure({
            errorLog: result.errors?.[0]?.message || "Timeout"
          });
          aiInsight = data || "Analysis failed";
        }

        await client.models.TestResult.create({
          testName: test.title,
          framework: 'PLAYWRIGHT',
          status: status,
          duration: result.duration,
          errorLog: result.errors?.[0]?.message || 'No errors',
          aiRootCause: aiInsight
        });
        console.log(`[AWS] Synced: ${test.title}`);
      } catch (err) {
        console.error(`[AWS] Sync failed for ${test.title}:`, err);
      }
    })();

    this.promises.push(syncOperation);
  }

  // Playwright WILL wait for this method to finish
  async onEnd() {
    console.log(`[AWS] Waiting for ${this.promises.length} results to finalize...`);
    await Promise.all(this.promises);
    console.log(`[AWS] All cloud operations complete ✅`);
  }
}

export default AWSAmplifyReporter;
