import {PrismaService} from "@/api/common/config/prisma.service";
import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthRepository} from "./auth.repository";
import {AuthService} from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService]
})
export class AuthModule {}
