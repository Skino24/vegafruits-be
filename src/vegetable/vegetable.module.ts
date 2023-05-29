import { Module } from '@nestjs/common';
import { VegetableController } from './vegetable.controller';
import { VegetableService } from './vegetable.service';
import { S3Service } from "../lib/s3.service";
import { MongooseModule } from "@nestjs/mongoose";
import { VegetableSchema } from "../schema/vegetable.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Vegetable", schema: VegetableSchema }])],
  controllers: [VegetableController],
  providers: [VegetableService, S3Service],
  exports: [VegetableService],
})
export class VegetableModule {}
