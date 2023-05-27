import { Controller, Request, Get, Post, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { Public } from "./decorators/publicDecorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Public()
  @Post("/register")
  async register(@Body() createUserDTO: CreateUserDto) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @Public()
  @Post("/login")
  async login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @Get("/user")
  getProfile(@Request() req) {
    return req.user;
  }
}
