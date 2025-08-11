import {AuthRepository} from "@/api/client/auth/auth.repository";
import {SignUpDto} from "@/api/client/auth/dto/signup.dto";
import {
  generateHash,
  generateUUID,
  generateVerificationCode
} from "@/api/common/helpers/authHelpers";
import {ServiceResponse} from "@/api/utils/serviceResponse";
import {HttpStatus, Injectable, Logger} from "@nestjs/common";
import {Status} from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  private readonly logger = new Logger(AuthService.name);
  /**
   * Handles user signup.
   * @param data - The data transfer object containing user signup details.
   */
  async signup(userData: SignUpDto) {
    try {
      const {firstName, lastName, email, password} = userData;
      // check if user exists
      const userExists = await this.authRepository.findUserByEmail(email);

      if (userExists) {
        return ServiceResponse.failure(
          "User already exists",
          null,
          HttpStatus.BAD_REQUEST
        );
      }

      // generate a user_uuid
      const userUuid = generateUUID();

      // hash the password
      const hashedPassword = await generateHash(password.trim());

      // Generate a verification code
      const {verificationCode, expiresIn} = generateVerificationCode();

      const dbSaveColumns = {
        userUuid: userUuid,
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email,
        password: hashedPassword,
        status: Status.pending,
        verificationCode,
        expiresIn
      };

      // save user to the database
      const user = await this.authRepository.createUser(dbSaveColumns);
      if (!user) {
        return ServiceResponse.failure(
          "Failed to create user",
          null,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      // remove sensitive data before returning
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password: _, ...userWithoutPassword} = user;

      return ServiceResponse.success(
        "User created successfully",
        userWithoutPassword,
        HttpStatus.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating user: ${(ex as Error).message}`;
      this.logger.error(errorMessage);

      return ServiceResponse.failure(
        "An error occurred during signup",
        null,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
