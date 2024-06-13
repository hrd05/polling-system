const AWS = require('aws-sdk');
require('dotenv').config();

const uploadToS3 = (profilePicture, filename) => {
    return new Promise((resolve, reject) => {
        const BUCKET_NAME = process.env.BUCKET_NAME;
        const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
        const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;

        let s3Bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET
        })

        var params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: profilePicture,
            ACL: 'public-read',
            ContentType: "image/jpeg"
        }

        s3Bucket.upload(params, (err, response) => {
            if (err) {
                console.log('something went wrong', err);
                reject(err);
            }
            else {
                // console.log('success', response)
                resolve(response.Location)
            }
        })
    })
}

module.exports = {
    uploadToS3
}
