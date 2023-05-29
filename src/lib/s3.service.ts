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

  async uploadImageToS3(image: Express.Multer.File, bucketName: string, fileName: string) {
    const params: S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
      Body: image.buffer,
      ContentType: 'image/jpeg'
    };

    const data = await this.s3Client.upload(params).promise();
    return data.Location;
  }
}
