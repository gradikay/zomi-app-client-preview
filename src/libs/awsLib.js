// **** THIS FILE IS EXPORTED TO ---> src/index.js ****
// Amplify required
import { Storage } from "aws-amplify";
// -------------- Application Begins Bellow ------------ //


// s3Upload is exported to src/index.js
// This stores file to AWS S3 Bucket
export async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;

    //const stored = await Storage.vault.put(filename, file, { // Use this for private images
    const stored = await Storage.put(filename, file, {
        level: 'protected',
        contentType: file.type 
        //contentType: 'image/png'
    });

    return stored.key;
}


// -------------- Learn More Begins Bellow ------------ //
// More Info here ---> https://docs.amplify.aws/lib/storage/upload/q/platform/js#public-level