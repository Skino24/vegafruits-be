import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { FruitModule } from "./fruit/fruit.module";
import { VegetableModule } from './vegetable/vegetable.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://fvagvtv:yQXi0VZqK8XT2iwr@vfcluster1.trzv03q.mongodb.net/", {
      dbName: "dev",
    }),
    UsersModule,
    FruitModule,
    AuthModule,
    VegetableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
