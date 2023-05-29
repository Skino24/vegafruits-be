import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Vegetable } from "../schema/vegetable.schema";
import { S3Service } from "../lib/s3.service";
import { CreateVegetableDto } from "../dto/create-vegetable.dto";
import { UpdateVegetableDto } from "../dto/update-vegetable.dto";

@Injectable()
export class VegetableService {
    constructor(@InjectModel("Vegetable") private VegetableModel: Model<Vegetable>, private s3Service: S3Service) {}

  async uploadImageToS3(imageBase64: Express.Multer.File, name: string): Promise<string> {
    return this.s3Service.uploadImageToS3(imageBase64, process.env.AWS_BUCKET_NAME, name)
  }

  async createVegetable(createVegetableDto: CreateVegetableDto): Promise<Vegetable> {
    const newVegetable = await new this.VegetableModel(createVegetableDto);
    return newVegetable.save();
  }

  async updateVegetable(VegetableId: string, updateVegetableDto: UpdateVegetableDto): Promise<Vegetable> {
    const existingVegetable = await this.VegetableModel.findByIdAndUpdate(VegetableId, updateVegetableDto, { new: true });
    if (!existingVegetable) {
      throw new NotFoundException(`Vegetable #${VegetableId} not found`);
    }
    return existingVegetable;
  }

  async getAllVegetables(): Promise<Vegetable[]> {
    const VegetableData = await this.VegetableModel.find();
    if (!VegetableData || VegetableData.length == 0) {
      throw new NotFoundException("Vegetables data not found!");
    }
    return VegetableData;
  }

  async getVegetable(VegetableId: string): Promise<Vegetable> {
    const existingVegetable = await this.VegetableModel.findById(VegetableId).exec();
    if (!existingVegetable) {
      throw new NotFoundException(`Vegetable #${VegetableId} not found`);
    }
    return existingVegetable;
  }

  async deleteVegetable(VegetableId: string): Promise<Vegetable> {
    const deletedVegetable = await this.VegetableModel.findByIdAndDelete(VegetableId);
    if (!deletedVegetable) {
      throw new NotFoundException(`Vegetable #${VegetableId} not found`);
    }
    return deletedVegetable;
  }
}
