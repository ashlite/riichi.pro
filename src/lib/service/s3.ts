import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { ListObjectsV2CommandInput } from "@aws-sdk/client-s3";
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

// export async function getCoreAsset() {
//   const command: ListObjectsV2CommandInput = {
//     Bucket: 'core.asset'
//   }
//   await s3Client.send(new ListObjectsV2Command(command))
// }