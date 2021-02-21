// This file is exported to src/index.js
// **** NOTE **** FOR SECURITY REASONS -- Put variable in a .env (file) --
// ------ Communication with Backend / API

// Development Configuration from AWS
const dev = {
    s3: {
        REGION: "us-east-2", 
        ATTACHEMENTS_BUCKET_NAME: "zomi-app-services-dev-attachmentsbucket-77vc1q95m2x4"
    },
    apiGateway: {
        REGION: "us-east-2",
        SERVICE_ENDPOINT: "https://5x5ym27hbi.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_greDxjNEl",
        USER_POOL_CLIENT_ID: "6th64ltq348426krvulhd8mp99",
        IDENTITY_POOL_ID: "us-east-2:40f2b81f-6980-4a68-86dd-fcde1128a4a8"
    }
};

// Production Configuration from AWS
const prod = {
    s3: {
        REGION: "...",
        ATTACHEMENTS_BUCKET_NAME: "..."
    },
    apiGateway: {
        REGION: "...",
        SERVICE_ENDPOINT: "..."
    },
    cognito: {
        REGION: "...",
        USER_POOL_ID: "...",
        USER_POOL_CLIENT_ID: "...",
        IDENTITY_POOL_ID: "..."
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 1000000,
    ...config
};