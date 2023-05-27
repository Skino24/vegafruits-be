import { Module } from "@nestjs/common";
import { FruitService } from "./fruit.service";
import { FruitController } from "./fruit.controller";
import { FruitSchema } from "../schema/fruit.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { S3Service } from "../lib/s3.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Fruit", schema: FruitSchema }])],
  providers: [FruitService, S3Service],
  controllers: [FruitController],
  exports: [FruitService],
})
export class FruitModule {}
