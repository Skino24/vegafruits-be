import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class Vegetable {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Vegetable" })
  productId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  priceBy: string;

  @Prop({ required: true })
  image: string;
}

export const VegetableSchema = SchemaFactory.createForClass(Vegetable);
