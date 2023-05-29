import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from "../auth/decorators/publicDecorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { VegetableService } from "./vegetable.service";
import { UpdateVegetableDto } from "../dto/update-vegetable.dto";
import { CreateVegetableDto } from "../dto/create-vegetable.dto";

@Controller('vegetable')
export class VegetableController {constructor(private readonly vegetableService: VegetableService) { }

@Post()
@UseInterceptors(FileInterceptor('image'))
async createVegetable(@Res() response, @UploadedFile() image: Express.Multer.File, @Body() createVegetableDto: CreateVegetableDto) {
  try {
    const imageUrl = await this.vegetableService.uploadImageToS3(image, createVegetableDto.name);
    createVegetableDto.image = imageUrl;
    const newVegetable = await this.vegetableService.createVegetable(createVegetableDto);
    return response.status(HttpStatus.CREATED).json({
      message: "Vegetable has been created successfully",
      newVegetable,
    });
  } catch (err) {
    console.log(err);
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: "Error: Vegetable not created!",
      error: "Bad Request",
    });
  }
}

@Put("/:id")
async updateVegetable(@Res() response, @Param("id") VegetableId: string, @Body() updateVegetableDto: UpdateVegetableDto) {
  try {
    const existingVegetable = await this.vegetableService.updateVegetable(VegetableId, updateVegetableDto);
    return response.status(HttpStatus.OK).json({
      message: "Vegetable has been successfully updated",
      existingVegetable,
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Public()
@Get()
async getVegetables(@Res() response) {
  try {
    const vegetableData = await this.vegetableService.getAllVegetables();
    return response.status(HttpStatus.OK).json({
      message: "All Vegetables data found successfully",
      vegetableData,
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Public()
@Get("/:id")
async getVegetable(@Res() response, @Param("id") VegetableId: string) {
  try {
    const existingVegetable = await this.vegetableService.getVegetable(VegetableId);
    return response.status(HttpStatus.OK).json({
      message: "Vegetable found successfully",
      existingVegetable,
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}

@Delete("/:id")
async deleteVegetable(@Res() response, @Param("id") VegetableId: string) {
  try {
    const deletedVegetable = await this.vegetableService.deleteVegetable(VegetableId);
    return response.status(HttpStatus.OK).json({
      message: "Vegetable deleted successfully",
      deletedVegetable,
    });
  } catch (err) {
    return response.status(err.status).json(err.response);
  }
}}
