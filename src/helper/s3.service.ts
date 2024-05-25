import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {}

  getS3Object() {
    return new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY')
      },
      endpoint: 'http://localhost:9444'
    });
  }

  async uploadFile(file, fileName: string) {
    console.log(file);

    return await this.s3Upload(
      file.buffer,
      this.configService.get('AWS_S3_BUCKET'),
      fileName
    );
  }

  async s3Upload(file, bucket: string, name: string) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file
    };

    try {
      const s3Response = await this.getS3Object().send(
        new PutObjectCommand(params)
      );
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
