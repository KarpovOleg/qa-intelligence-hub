import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="portfolio-container about-page">
      <header className="senior-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>System Architecture & Design</h1>
        <p>A Closed-Loop AI-Agentic Quality Intelligence Platform</p>
      </header>

      <section className="about-content">
        <div className="intro-block">
          <h2>The Philosophy</h2>
          <p>
            In 2026, Quality Engineering is no longer about "scripts passing." It is about <strong>Observability</strong> and <strong>MTTR (Mean Time to Recovery)</strong>.
            This platform decouples the execution engine from the reporting layer, treating test telemetry as a first-class citizen in the AWS Cloud.
          </p>
        </div>

        <div className="tech-stack-grid">
          <div className="tech-card">
            <h3>1. The Execution Engine</h3>
            <p><strong>Playwright / Selenium</strong></p>
            <p>
              Represents the "Shift-Left" phase. By using a <strong>Custom AWS Reporter</strong>,
              we extract raw telemetry—including stack traces and performance metrics—directly from the test runner.
            </p>
          </div>

          <div className="tech-card">
            <h3>2. The Data Highway</h3>
            <p><strong>AppSync (GraphQL)</strong></p>
            <p>
              Uses <strong>WebSocket Subscriptions</strong> to enable real-time observability.
              When a test finishes in a remote CI/CD pipeline, the dashboard updates instantly without a browser refresh.
            </p>
          </div>

          <div className="tech-card">
            <h3>3. The Agentic AI Quality Logic</h3>
            <p><strong>AWS Lambda & Bedrock</strong></p>
            <p>
              When a failure is detected, a serverless <strong>AI Agent</strong> is triggered.
              It performs an inference call to <strong>Claude 3.5 Sonnet</strong> to distinguish between
              brittle selectors and genuine code regressions.
            </p>
          </div>

          <div className="tech-card">
            <h3>4. The Intelligence Lake</h3>
            <p><strong>Amazon DynamoDB</strong></p>
            <p>
              A high-performance NoSQL store providing 2026-standard data persistence.
              This allows for the <strong>Historical Trend Analysis</strong> and
              Pass-Rate metrics seen in the main dashboard.
            </p>
          </div>
        </div>

        <div className="detailed-explanation">
          <h2>2026 Workflow Integration</h2>
          <div className="workflow-step">
            <span className="step-num">✓</span>
            <p><strong>Decoupled Architecture:</strong> The test runner has no dependency on the dashboard, allowing it to be integrated into Jenkins, GitHub Actions, or local machines via a single <code>amplify_outputs.json</code> file.</p>
          </div>
          <div className="workflow-step">
            <span className="step-num">✓</span>
            <p><strong>Self-Healing Context:</strong> Instead of manual triage, the AI analysis suggests <code>data-testid</code> improvements or <code>actionTimeout</code> adjustments directly in the failure card.</p>
          </div>
          <div className="workflow-step">
            <span className="step-num">✓</span>
            <p><strong>Infrastructure as Code:</strong> Built using <strong>Amplify Gen 2</strong>, the entire backend is defined in TypeScript, ensuring the testing infrastructure is version-controlled and reproducible.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
