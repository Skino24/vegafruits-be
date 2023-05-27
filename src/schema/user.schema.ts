import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
