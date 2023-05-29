import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { priceType } from "../types";

@Schema()
export class Fruit {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Fruit" })
  productId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  priceBy: priceType;

  @Prop({ required: true })
  image: string;
}

export const FruitSchema = SchemaFactory.createForClass(Fruit);
