# GCP Deployment Guide

This document outlines the steps to deploy the ETL Dashboard application to Google Cloud Platform.

## Prerequisites

- Google Cloud Platform account
- Google Cloud SDK installed and configured
- Docker installed locally (for testing)

## Environment Variables

The following environment variables must be configured in your GCP deployment:

```
# Required API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
NEXT_PUBLIC_API_KEY=your-api-key

# The port where the application listens (default: 8080)
PORT=8080
```

## Deployment Steps

### 1. Build and Test Locally

```bash
# Build Docker image
docker build -t etl-dashboard -f Dockerfile .

# Run locally to test
docker run -p 8080:8080 \
  -e NEXT_PUBLIC_API_BASE_URL=your-api-url \
  -e NEXT_PUBLIC_API_KEY=your-api-key \
  etl-dashboard
```

### 2. Deploy to Google Cloud Run

```bash
# Tag the image for Google Container Registry
docker tag etl-dashboard gcr.io/[YOUR-PROJECT-ID]/etl-dashboard

# Push to GCR
docker push gcr.io/[YOUR-PROJECT-ID]/etl-dashboard

# Deploy to Cloud Run
gcloud run deploy etl-dashboard \
  --image gcr.io/[YOUR-PROJECT-ID]/etl-dashboard \
  --platform managed \
  --allow-unauthenticated \
  --region [REGION] \
  --set-env-vars="NEXT_PUBLIC_API_BASE_URL=your-api-url,NEXT_PUBLIC_API_KEY=your-api-key"
```

### 3. Securely Managing Sensitive Environment Variables

For sensitive data like API keys, use Google Cloud Secret Manager:

```bash
# Create a secret
gcloud secrets create etl-api-key --data-file=/path/to/api/key/file

# Grant Secret Manager access to the Cloud Run service account
gcloud secrets add-iam-policy-binding etl-api-key \
  --member=serviceAccount:service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor

# Reference the secret in Cloud Run deployment
gcloud run deploy etl-dashboard \
  --image gcr.io/[YOUR-PROJECT-ID]/etl-dashboard \
  --platform managed \
  --allow-unauthenticated \
  --region [REGION] \
  --set-env-vars="NEXT_PUBLIC_API_BASE_URL=your-api-url" \
  --update-secrets="NEXT_PUBLIC_API_KEY=etl-api-key:latest"
```

## Continuous Deployment

For CI/CD, consider setting up a Cloud Build trigger to automatically build and deploy when changes are pushed to your repository.

Example `cloudbuild.yaml`:

```yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/etl-dashboard', '.']
  
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/etl-dashboard']
  
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'etl-dashboard'
      - '--image=gcr.io/$PROJECT_ID/etl-dashboard'
      - '--platform=managed'
      - '--region=[REGION]'
      - '--set-env-vars=NEXT_PUBLIC_API_BASE_URL=[YOUR_API_URL]'
      - '--update-secrets=NEXT_PUBLIC_API_KEY=etl-api-key:latest'

images:
  - 'gcr.io/$PROJECT_ID/etl-dashboard'
```

## Monitoring and Logging

After deployment, monitor your application using:
- Google Cloud Console > Cloud Run > etl-dashboard > Logs
- Google Cloud Console > Operations > Logging
- Google Cloud Console > Operations > Monitoring

## Troubleshooting

If you encounter issues:
1. Check container logs in Cloud Run
2. Verify environment variables are correctly set
3. Ensure Cloud Run service has proper IAM permissions for any other GCP services it needs to access 