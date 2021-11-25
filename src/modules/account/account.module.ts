import { Module } from '@nestjs/common';
import AccountResolver from '@modules/account/infra/graphql/account.resolver';
import AccountService from '@modules/account/account.service';
import CreateAccountUseCase from '@modules/account/application/use-cases/create-account.use-case';
import AccountRepo from '@modules/account/infra/repo/account.repo';
import AccountMapper from '@modules/account/infra/mappers/account.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountModel from './infra/models/account.model';
import { ServiceModule } from '../service/service.module';
import UpdateAccountUseCase from './application/use-cases/update-account.use-case';
import GetAccountUseCase from './application/use-cases/get-account.use-case';
import AccountServiceModel from './infra/models/account-service.model';
import GetServiceByAccountIdUseCase from '../service/application/use-cases/get-service-by-account-id.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([AccountModel, AccountServiceModel]), ServiceModule
	],
	providers: [
		AccountMapper,
		{
			provide: 'AccountRepository',
			useClass: AccountRepo
		},
		CreateAccountUseCase,
		UpdateAccountUseCase,
		GetAccountUseCase,
		GetServiceByAccountIdUseCase,
		AccountService,
		AccountResolver
	],
	exports: []
})
export class AccountModule {}
