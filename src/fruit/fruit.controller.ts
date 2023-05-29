import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreateFruitDto } from "src/dto/create-fruit.dto";
import { UpdateFruitDto } from "src/dto/update-fruit.dto";
import { FruitService } from "src/fruit/fruit.service";
import { Public } from "../auth/decorators/publicDecorator";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("fruit")
export class FruitController {
  constructor(private readonly fruitService: FruitService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createFruit(@Res() response, @UploadedFile() image: Express.Multer.File, @Body() createFruitDto: CreateFruitDto) {
    try {
      const imageUrl = await this.fruitService.uploadImageToS3(image, createFruitDto.name);
      createFruitDto.image = imageUrl;
      const newFruit = await this.fruitService.createFruit(createFruitDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Fruit has been created successfully",
        newFruit,
      });
    } catch (err) {
      console.log(err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "Error: Fruit not created!",
        error: "Bad Request",
      });
    }
  }

  @Put("/:id")
  async updateFruit(@Res() response, @Param("id") fruitId: string, @Body() updateFruitDto: UpdateFruitDto) {
    try {
      const existingFruit = await this.fruitService.updateFruit(fruitId, updateFruitDto);
      return response.status(HttpStatus.OK).json({
        message: "Fruit has been successfully updated",
        existingFruit,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Public()
  @Get()
  async getFruits(@Res() response) {
    try {
      const fruitData = await this.fruitService.getAllFruits();
      return response.status(HttpStatus.OK).json({
        message: "All fruits data found successfully",
        fruitData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Public()
  @Get("/:id")
  async getFruit(@Res() response, @Param("id") fruitId: string) {
    try {
      const existingFruit = await this.fruitService.getFruit(fruitId);
      return response.status(HttpStatus.OK).json({
        message: "Fruit found successfully",
        existingFruit,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete("/:id")
  async deleteFruit(@Res() response, @Param("id") fruitId: string) {
    try {
      const deletedFruit = await this.fruitService.deleteFruit(fruitId);
      return response.status(HttpStatus.OK).json({
        message: "Fruit deleted successfully",
        deletedFruit,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
