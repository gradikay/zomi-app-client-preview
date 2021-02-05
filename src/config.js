// **** THIS FILE IS EXPORTED TO src/index.js ****
// **** NOTE **** FOR SECURITY REASONS -- KEEP THIS FILE PRIVATE -- .env (file) --
// ------ Communication with Backend / API
// Development Configuration from AWS
const dev = {
    s3: {
        REGION: "us-east-2", 
        BUCKET: "bozindo-shared-gateway-dev-attachmentsbucket-1xgfpp5vaw031"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://i7tzxcoca3.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_IxqkRSS8O",
        APP_CLIENT_ID: "3f583tq60homo7cjp44guc7j02",
        IDENTITY_POOL_ID: "us-east-2:ca4ee6f9-d725-4f26-8b80-0928db51365c"
    }
};

// Production Configuration from AWS
const prod = {
    s3: {
        REGION: "us-east-2",
        BUCKET: "bozindo-shared-gateway-prod-attachmentsbucket-hsdwjkl3yiwv"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://ct592l6az0.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_XQIdRwL0E",
        APP_CLIENT_ID: "4alui28r3tmghuivhdg1lt0o7c",
        IDENTITY_POOL_ID: "us-east-2:19742690-3392-4876-90cd-0817ff6d5ac7"
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};