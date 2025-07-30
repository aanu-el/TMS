import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@nestjs/core";

@Module({
  imports: [
    RouterModule.register([
      {
        path: "client/auth",
        module: AuthModule
      }
    ]),
    AuthModule
  ]
})
export class ClientModule {}
