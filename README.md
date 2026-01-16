# 🚀 Intelligent Quality Engineering Hub

A high-performance, AI-augmented Quality Observability Platform built with **AWS Amplify Gen 2**, **React 19**, and **Playwright**. This system demonstrates a closed-loop "Shift-Right" strategy by streaming real-time test telemetry to a cloud-native backend for automated AI triage.

## 🛠 Tech Stack (2026 Standard)
- **Frontend:** React 19, TypeScript, Vite, Recharts (Observability)
- **Backend:** AWS Amplify Gen 2 (Infrastructure-as-Code)
- **Database:** Amazon DynamoDB (Serverless NoSQL)
- **AI/Logic:** AWS Lambda + Amazon Bedrock (Claude 3.5 Agentic Analysis)
- **Automation:** Playwright (Custom AWS Telemetry Reporter)

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
npx playwright test

# Fetches the live Production outputs
npx ampx generate outputs --app-id YOUR_APP_ID --branch main
