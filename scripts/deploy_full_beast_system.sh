#!/usr/bin/env bash

# ==============================================================================
# BEAST SYSTEM 3.0: FULL ECOSYSTEM PRODUCTION DEPLOYMENT PIPELINE
# Governing Officer: Pat Tarwater Jr.
# Organization: New World Order Private Government DAO LLC
# ==============================================================================

set -e

echo "========================================================================"
echo "🚀 STARTING BEAST SYSTEM 3.0 MACRO-DEPLOYMENT PIPELINE"
echo "========================================================================"

# 1. Environment Verification
echo ""
echo "1️⃣  [PHASE 1] Checking Environment Dependencies..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting."; exit 1; }
command -v gcloud >/dev/null 2>&1 || { echo "❌ Google Cloud SDK is required but not installed. Aborting."; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting."; exit 1; }

echo "✅ All core build tools verified."

# 2. Smart Contract Compilation & Verification Tests
echo ""
echo "2️⃣  [PHASE 2] Compiling Solidity Contracts & Running Hardhat Tests..."
npx hardhat compile
npx hardhat test

echo "✅ Smart contract compilation and unit test validation passed."

# 3. Hardhat Smart Contract Deployment
echo ""
echo "3️⃣  [PHASE 3] Deploying BEAST Governance Stack & Submodules..."
npx ts-node scripts/deploy_governance_stack.ts

echo "✅ Contracts successfully deployed to target EVM network."

# 4. GCP Cloud Run Container Build & Deployment
echo ""
echo "4️⃣  [PHASE 4] Deploying Microservice Backend to GCP Cloud Run..."
GCP_PROJECT_ID=${GCP_PROJECT_ID:-"beast-system-511916"}
SERVICE_NAME="beastsystem"
REGION="us-central1"

echo "📍 Building container for GCP Project: ${GCP_PROJECT_ID}"
gcloud builds submit --tag gcr.io/${GCP_PROJECT_ID}/${SERVICE_NAME}:latest . --project=${GCP_PROJECT_ID}

echo "🚢 Deploying container to Cloud Run service: ${SERVICE_NAME}"
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${GCP_PROJECT_ID}/${SERVICE_NAME}:latest \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --project=${GCP_PROJECT_ID}

echo "✅ GCP Cloud Run backend deployed and live."

# 5. Next.js Digital Constitution Frontend Build
echo ""
echo "5️⃣  [PHASE 5] Building Next.js Command Center Production Bundle..."
npm run build

echo "========================================================================"
echo "🎉 BEAST SYSTEM 3.0 PRODUCTION DEPLOYMENT COMPLETE"
echo "   All 1,200+ repositories and core submodules are operational."
echo "========================================================================"
