import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: region!,
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});

export async function uploadObject(
  key: string,
  fileBuffer: Buffer,
  contentType: string,
) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  };
  const uploadCommand = new PutObjectCommand(params);
  try {
    await s3Client.send(uploadCommand);
    return { success: true, key };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to upload object to S3");
  }
}

export async function deleteObject(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const deleteCommand = new DeleteObjectCommand(params);
  try {
    await s3Client.send(deleteCommand);
    return { success: true };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete object from S3");
  }
}

export async function createPresignedUrl(key: string) {
  try {
    const expiryMinutes = 60 * 24 * 6; // 6 days
    const input = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * expiryMinutes,
    });
    return url;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create presigned url");
  }
}

export async function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsBinaryString(file);
  });
}
