import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from '$env/dynamic/private'

const credentials = {
  accessKeyId: env.TEBI_MASTER_KEY!,
  secretAccessKey: env.TEBI_MASTER_SECRET!
};

// Create an S3 service client object.
const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global"
});

export async function uploadImage(bucket: string, key: string, file: Buffer, format: string): Promise<string | null> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${key}.${format}`,
    Body: file,
    ContentDisposition: `inline`,
  })

  const result = await s3Client.send(command)
  
  if (result.$metadata.httpStatusCode! >= 200 && result.$metadata.httpStatusCode! <= 200) {
    return `${key}.${format}`
  } else {
    return null
  }
}

export async function deleteImage(bucket: string, name: string): Promise<boolean> {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: name
  })
  const result = await s3Client.send(command)
  if (result.$metadata.httpStatusCode! >= 200 && result.$metadata.httpStatusCode! <= 200) {
    return true
  } else {
    return false
  }
}