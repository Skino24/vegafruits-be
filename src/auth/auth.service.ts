import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt"; // 1
import * as bcrypt from "bcrypt";
import { User } from "../schema/user.schema";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUser(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const validUser = await this.validateUser(email, password);

    if (validUser) {
      const payload = { email: validUser.email, sub: validUser.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
