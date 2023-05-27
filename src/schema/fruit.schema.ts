import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class Fruit {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Fruit" })
  productId: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  priceBy: string;

  @Prop()
  image: string;
}

export const FruitSchema = SchemaFactory.createForClass(Fruit);
