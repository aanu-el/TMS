import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {versions} from "@/api/common/config/version.conf";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(versions.v1.apiPrefix);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept"
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error("Error during application bootstrap:", error);
  process.exit(1);
});
