import dotenv from 'dotenv'
import upload_s3 from "aws-sdk/clients/s3.js"
import fileStream from "fs";


dotenv.config()

const bucket_region = process.env.region
const bucketName = process.env.AWS_Bucket_name
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3_upload = new upload_s3({
  region:bucket_region,
  accessKeyId,
  secretAccessKey
});

  
async function upload(file, namefile)
{
    const filestream = fileStream.createReadStream(file.path);
    return s3_upload.upload({
        Bucket : bucketName,
        Body : filestream,
        Key : namefile,
        // Key : file.filename + "_" + file.originalname,
    })
    .promise();
}
function deleteFile(fileName)
{
    
    return s3_upload.deleteObject({
        Bucket : bucketName,
        Key : fileName,
        // Key : file.filename + "_" + file.originalname,
    })
    .promise();
}



export {upload, deleteFile};
