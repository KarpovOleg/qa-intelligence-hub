# 🚀 Intelligent Quality Engineering Hub

A high-performance, AI-augmented Quality Observability Platform built with **AWS Amplify Gen 2**, **React 19**, and **Playwright**. This system demonstrates a closed-loop "Shift-Right" strategy by streaming real-time test telemetry to a cloud-native backend for automated AI triage.

## 🛠 Tech Stack (2026 Standard)
- **Frontend:** React 19, TypeScript, Vite, Recharts (Observability)
- **Backend:** AWS Amplify Gen 2 (Infrastructure-as-Code)
- **Database:** Amazon DynamoDB (Serverless NoSQL)
- **AI/Logic:** AWS Lambda + Amazon Bedrock (Claude 3.5 Agentic Analysis)
- **Automation:** Playwright (Custom AWS Telemetry Reporter)

---

## 🛠️ Senior QA Engineering Standards

### 1. Cloud-Native Quality Observability (Shift-Right Architecture)
*   **Infrastructure-as-Code (IaC)**: The project utilizes **Amplify Gen 2** to define the entire quality stack—including Authentication, a DynamoDB Data Lake, and Lambda Triage Functions—entirely in **TypeScript**. This approach ensures that the QA infrastructure is version-controlled, reproducible, and capable of scaling horizontally alongside the production application.
*   **Real-Time Data Highway**: The integration of **AppSync (GraphQL) with WebSocket Subscriptions** (`observeQuery`) transitions the quality paradigm from "static reporting" to "live observability." WebSocket connectivity ensures the dashboard receives instant quality signals the moment a test completes in a remote CI/CD pipeline.
*   **Decoupled Reporting Infrastructure**: The `AWSAmplifyReporter` decouples test execution from the reporting UI. This allows the Playwright engine to function as a "data producer" from any environment (Local, GitHub Actions, or Jenkins) while syncing to a centralized AWS Intelligence Lake.

### 2. Agentic AI & Autonomous Triage
*   **Intelligent Failure Analysis**: The architecture includes an **AI-Agentic Triage layer** that moves beyond traditional logging. A custom AWS Lambda (`analyze-failure`) intercepts failure metadata to distinguish between brittle selectors (environmental noise) and genuine code regressions.
*   **Self-Healing Context**: The project structure captures `error-context.md` and failure telemetry to generate **Self-Healing insights**. Instead of relying on manual triage, the system utilizes AI-driven analysis to suggest `data-testid` improvements or timeout adjustments, directly reducing the **Mean Time to Recovery (MTTR)**.

### 3. Advanced TypeScript Project Orchestration
*   **Environment Isolation (The Solution Pattern)**: A 3-tier `tsconfig` structure (`app`, `node`, `test`) enforces industry-standard environment isolation. This configuration ensures that browser-side React code is strictly separated from Node.js-based test utilities, preventing "leaky" dependencies and accidental security exposures.
*   **Global Type Augmentation**: The implementation of `environment.d.ts` to augment `NodeJS.ProcessEnv` provides total type-safety for environment variables. This eliminates a significant category of configuration errors during multi-environment test orchestration.

### 4. Defensive Engineering & Reliability
*   **Built-in URL Normalization**: The `apiHelper.ts` utility implements a "Reliability First" strategy. Regex-based sanitization handles trailing slashes and environment-specific endpoints, ensuring the framework is resilient against human configuration errors in `.env` files.
*   **Resilient Data Handling**: The `Dashboard.tsx` implementation utilizes defensive casting (`Number(curr.duration || 0)`) and conditional rendering for metrics. These guards ensure UI stability during high-frequency data ingestion and handle cases where initial telemetry may be incomplete.

### 5. Full-Cycle Quality Advocacy
*   **Performance as a Quality Metric**: The inclusion of a **Performance Trend Line** using Recharts demonstrates a philosophy where execution latency is treated as a critical quality state rather than a simple binary pass/fail result.
*   **Contract-Driven Automation**: The use of a shared **Schema** between the backend and the automation suite enforces strict data contracts. Any deviation in the quality data model is caught at compile-time, significantly reducing the maintenance overhead of the automation platform.

---

## 🏃‍♂️ Getting Started

### 1. Prerequisites
- **Node.js:** v22.x or v24.x (LTS)
- **AWS CLI:** Configured with an active IAM profile
- **Environment:** Access to an AWS Account (Active 2026 Free Tier)

### 2. Initial Setup
```bash

# Install dependencies using 2026 legacy resolution
npm install --legacy-peer-deps

# Install Playwright browsers
npx playwright install chromium

# Local Development (Cloud Sandbox)
npx ampx sandbox

# Launches dashboard at http://localhost:5173
npm run dev

# Triggers real-time telemetry sync to DynamoDB
API_ENV=staging npx playwright test

# Fetches the live Production outputs
npx ampx generate outputs --app-id YOUR_APP_ID --branch main
