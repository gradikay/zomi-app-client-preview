// This file is exported to src/index.js
// **** NOTE **** FOR SECURITY REASONS -- Put variable in a .env (file) --
// ------ Communication with Backend / API

// Development Configuration from AWS
const dev = {
    s3: {
        REGION: "us-east-2", 
        ATTACHEMENTS_BUCKET_NAME: "larissa-app-services-dev-attachmentsbucket-fyyb4yts28zd"
    },
    apiGateway: {
        REGION: "us-east-2",
        SERVICE_ENDPOINT: "https://c2p83ddrt4.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_OIRYrkCPn",
        USER_POOL_CLIENT_ID: "60mqtsj4t6q2j969ubugj5g4at",
        IDENTITY_POOL_ID: "us-east-2:cd57a59c-71d2-4cf9-870a-bcf421287e5a"
    }
};

// Production Configuration from AWS
const prod = {
    s3: {
        REGION: "us-east-2",
        ATTACHEMENTS_BUCKET_NAME: "bozindo-shared-gateway-prod-attachmentsbucket-hsdwjkl3yiwv"
    },
    apiGateway: {
        REGION: "us-east-2",
        SERVICE_ENDPOINT: "https://ct592l6az0.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_XQIdRwL0E",
        USER_POOL_CLIENT_ID: "4alui28r3tmghuivhdg1lt0o7c",
        IDENTITY_POOL_ID: "us-east-2:19742690-3392-4876-90cd-0817ff6d5ac7"
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