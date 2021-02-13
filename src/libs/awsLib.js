// **** THIS FILE IS EXPORTED TO ---> src/index.js ****
// Amplify required
import { Storage } from "aws-amplify";
// -------------- Application Begins Bellow ------------ //

// This function stores our file to AWS S3 Bucket
export async function s3Upload(file) {

    // Naming our file
    const filename = `${Date.now()}-${file.name}`;
     
    const stored = await Storage.put(filename, file, {
        level: 'protected',
        contentType: file.type 
    });

    return stored.key;
}