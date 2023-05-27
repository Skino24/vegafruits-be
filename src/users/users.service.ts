import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<User>) {}

  async addUser(createUserDTO: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
