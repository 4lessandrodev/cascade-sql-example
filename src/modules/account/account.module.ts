import { Module } from '@nestjs/common';
import AccountResolver from '@modules/account/infra/graphql/account.resolver';
import AccountService from '@modules/account/account.service';
import CreateAccountUseCase from '@modules/account/application/use-cases/create-account.use-case';
import AccountRepo from '@modules/account/infra/repo/account.repo';
import AccountMapper from '@modules/account/infra/mappers/account.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountModel from './infra/models/account.model';
import { ServiceModule } from '../service/service.module';

@Module({
	imports: [TypeOrmModule.forFeature([AccountModel]), ServiceModule],
	providers: [
		AccountMapper,
		AccountRepo,
		CreateAccountUseCase,
		AccountService,
		AccountResolver
	],
	exports: []
})
export class AccountModule {}
