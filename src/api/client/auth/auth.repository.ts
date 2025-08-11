import {SaveUserData, User} from "@/api/client/auth/interface/user.interface";
import {PrismaService} from "@/api/common/config/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {email}
    });
  }

  async createUser(data: SaveUserData): Promise<User> {
    return await this.prismaService.user.create({
      data
    });
  }
}
