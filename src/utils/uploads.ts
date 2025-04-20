import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s2 = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT ?? '',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_ID ?? '',
    secretAccessKey: process.env.CLOUDFLAR_SECRET ?? '',
  },
});

export const upload = async (file):Promise<string> => {
  console.log(file)
  if (!file) return;
console.log(file);
  const buffer = Buffer.from(file);
  const fileName = `${Date.now()}-${file.name.split('.')[0]}.webp`;
  try {
    const webpBuffer = await sharp(buffer)
    .webp({ quality: 100 }) 
    .toBuffer();

  
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET ?? "",
      Key: fileName,
      Body: webpBuffer,
      ContentType: "image/webp",
      ACL: "public-read",
    });

    await s2.send(putObjectCommand);

    const fileUrl = `${process.env.CDN_URL ?? process.env.S3_ENDPOINT}/${fileName}`;
    console.log(fileUrl);
} catch (error) {
    console.error('Error uploading file', error);
  }
};
