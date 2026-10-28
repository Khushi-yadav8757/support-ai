import { Scalekit } from '@scalekit-sdk/node';

// Initialize the Scalekit client with your credentials
export const scalekit = new Scalekit(
  process.env.SCALEKIT_ENVIRONMENT_URL!,
  process.env.SCALEKIT_CLIENT_ID!,
  process.env.SCALEKIT_CLIENT_SECRET!
);