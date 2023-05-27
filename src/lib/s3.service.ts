import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Readable } from "stream";

@Injectable()
export class S3Service {
  private readonly s3Client = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  async uploadImageToS3(imageBase64: string, bucketName: string, fileName: string) {
    const buf = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""),'base64')

    const params: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };

    const data = await this.s3Client.upload(params).promise();
    return data.Location;
  }
}
