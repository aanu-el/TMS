import {Controller, Post, Body, Res} from "@nestjs/common";
import {Response} from "express";
import {AuthService} from "./auth.service";
import {SignUpDto} from "@/api/client/auth/dto/signup.dto";
import {handleServiceResponse} from "@/api/utils/httpHandler";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * Handles user signup.
   * @param signupDto - The data transfer object containing user signup details.
   */
  @Post("signup")
  async signup(@Body() signupDto: SignUpDto, @Res() response: Response) {
    const serviceResponse = await this.authService.signup(signupDto);

    return handleServiceResponse(serviceResponse, response);
  }
}
