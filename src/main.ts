// Stryker disable all
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '@config/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap () {
	const app = await NestFactory.create(AppModule, { logger: ['log'] });
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(PORT);
}
bootstrap();
