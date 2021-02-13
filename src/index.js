// This file is importing information/variables from src/config.js
// React required
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; 
// CSS -- Global CSS // For Entire App goes to index.css
import './css/index.css';
// App - Returning Our Entire Application
import App from './App';
// Amplify - User interation with Cognito
import Amplify from 'aws-amplify';
// config - AWS credentials
import config from './config';
// -------------- Application Begins Bellow ------------ //

// Amplify enables connection with AWS
// Informations from -- src/config.js --
Amplify.configure({

    // API - AWS Cognito, User Pool for -- user information --
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.USER_POOL_CLIENT_ID
    },
    // API - AWS S3 Bucket for -- file storage --
    Storage: {
        AWSS3: {
            region: config.s3.REGION,
            bucket: config.s3.ATTACHEMENTS_BUCKET_NAME,
            identityPoolId: config.cognito.IDENTITY_POOL_ID
        }
    },
    // API - AWS Lambda Function for -- api call to DynamoDB [Database] --
    API: {
        endpoints: [
            {
                // name: -- Naming your Endpoint makes it easy to use - Name it whatever you want!
                name: "posts",
                endpoint: config.apiGateway.SERVICE_ENDPOINT,
                region: config.apiGateway.REGION
            },
        ]
    }
});

ReactDOM.render(
    <Router>

        { /* Entire Application - Start */ }
        <App />
        { /* Entire Application - End */}

    </Router>,
    document.getElementById('root')
);
