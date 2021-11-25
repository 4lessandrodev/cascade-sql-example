import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDbConfig } from './config/db.config';
import { AccountModule } from './modules/account/account.module';
import { ServiceModule } from './modules/service/service.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(MysqlDbConfig),
		ServiceModule,
		AccountModule,
		GraphQLModule.forRoot({
			debug: false,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql')
		})
	],
	providers: []
})
export class AppModule {}
