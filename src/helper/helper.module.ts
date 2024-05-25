import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UtilsService } from './utils.service';

@Module({
  providers: [S3Service, UtilsService],
  exports: [S3Service, UtilsService]
})
export class HelperModule {}
