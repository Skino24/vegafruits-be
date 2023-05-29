import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateFruitDto } from "src/dto/create-fruit.dto";
import { Model } from "mongoose";
import { UpdateFruitDto } from "src/dto/update-fruit.dto";
import { Fruit } from "../schema/fruit.schema";
import { S3Service } from "../lib/s3.service";

@Injectable()
export class FruitService {
  constructor(@InjectModel("Fruit") private fruitModel: Model<Fruit>, private s3Service: S3Service) {}

  async uploadImageToS3(imageBase64: Express.Multer.File, name: string): Promise<string> {
    return this.s3Service.uploadImageToS3(imageBase64, process.env.AWS_BUCKET_NAME, name)
  }

  async createFruit(createFruitDto: CreateFruitDto): Promise<Fruit> {
    const newFruit = await new this.fruitModel(createFruitDto);
    return newFruit.save();
  }

  async updateFruit(fruitId: string, updateFruitDto: UpdateFruitDto): Promise<Fruit> {
    const existingFruit = await this.fruitModel.findByIdAndUpdate(fruitId, updateFruitDto, { new: true });
    if (!existingFruit) {
      throw new NotFoundException(`Fruit #${fruitId} not found`);
    }
    return existingFruit;
  }

  async getAllFruits(): Promise<Fruit[]> {
    const fruitData = await this.fruitModel.find();
    if (!fruitData || fruitData.length == 0) {
      throw new NotFoundException("Fruits data not found!");
    }
    return fruitData;
  }

  async getFruit(fruitId: string): Promise<Fruit> {
    const existingFruit = await this.fruitModel.findById(fruitId).exec();
    if (!existingFruit) {
      throw new NotFoundException(`Fruit #${fruitId} not found`);
    }
    return existingFruit;
  }

  async deleteFruit(fruitId: string): Promise<Fruit> {
    const deletedFruit = await this.fruitModel.findByIdAndDelete(fruitId);
    if (!deletedFruit) {
      throw new NotFoundException(`Fruit #${fruitId} not found`);
    }
    return deletedFruit;
  }
}
