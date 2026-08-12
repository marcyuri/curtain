import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import env from "../../../config/env.js";

// Document 13, Ch.11.1 — stockage compatible S3 en production.
// Instancié uniquement si STORAGE_DRIVER=s3 (voir storage/index.js) —
// n'exige donc les variables S3_* qu'au moment où ce driver est
// réellement sélectionné, jamais en développement local.

const client = new S3Client({ region: env.S3_REGION });

async function upload({ buffer, filename, mimeType }) {

    await client.send(
        new PutObjectCommand({
            Bucket: env.S3_BUCKET,
            Key: filename,
            Body: buffer,
            ContentType: mimeType,
        })
    );

    return { url: `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${filename}` };

}

async function remove(url) {

    const filename = url.split("/").pop();

    await client.send(
        new DeleteObjectCommand({
            Bucket: env.S3_BUCKET,
            Key: filename,
        })
    );

}

const s3StorageProvider = { upload, remove };

export default s3StorageProvider;
