import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as sharp from 'sharp';


@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.S3_ENDPOINT ?? '',
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_ID ?? '',
        secretAccessKey: process.env.CLOUDFLAR_SECRET ?? '',
      },
    });
    
  }

  async uploadFile(file): Promise<{data: {url:string}} | null> {
    if (!file) {
      console.error('No file provided for upload');
      return null; 
    }

    const buffer = Buffer.from(file.buffer);
    const fileName = `${Date.now()}-${file.originalname.split('.')[0]}.webp`;

    try {
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 100 })
        .toBuffer();

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET ?? '',
        Key: fileName,
        Body: webpBuffer,
        ContentType: 'image/webp',
        ACL: 'public-read',
      });
      await this.s3Client.send(putObjectCommand);

      const fileUrl = `${process.env.CDN_URL ?? process.env.S3_ENDPOINT}/${fileName}`;
      console.log('File uploaded successfully:', fileUrl);
      
      return {
        data:{
          url: fileUrl,
        }
      }
    } catch (error) {
      console.error('Error uploading file', error);
      return null; 
    }
  }
}
