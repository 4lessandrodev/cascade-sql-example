import { Injectable, Inject } from '@nestjs/common';
import AccountModel from '@modules/account/infra/models/account.model';
import CreateAccountUseCase from '@modules/account/application/use-cases/create-account.use-case';
import CreateAccountDto from '@modules/account/application/use-cases/create-account.dto';
import HandlerErrorOnFailure from '@shared/result-error-handler/result-error-handler';
import { Result } from 'types-ddd';
import UpdateAccountUseCase from './application/use-cases/update-account.use-case';
import CreateUpdateAccountDto from './application/use-cases/update-account.dto';
import GetAccountUseCase from './application/use-cases/get-account.use-case';
import GetServiceByAccountIdUseCase from '../service/application/use-cases/get-service-by-account-id.use-case';
import ServiceModel from '../service/infra/models/service.model';

@Injectable()
export class AccountService {
	constructor (
		@Inject(CreateAccountUseCase)
		private readonly createAccountUseCase: CreateAccountUseCase,

		@Inject(UpdateAccountUseCase)
		private readonly updateAccountUseCase: UpdateAccountUseCase,

		@Inject(GetAccountUseCase)
		private readonly getAccountUseCase: GetAccountUseCase,

		@Inject(GetServiceByAccountIdUseCase)
		private readonly getServicesByAccoundIdUseCase: GetServiceByAccountIdUseCase
	) {}

	async create (dto: CreateAccountDto): Promise<Result<void>> {
		return HandlerErrorOnFailure(await this.createAccountUseCase.execute(dto));
	}

	async update (dto: CreateUpdateAccountDto): Promise<Result<void>> {
		return HandlerErrorOnFailure(await this.updateAccountUseCase.execute(dto));
	}

	async findAll (): Promise<AccountModel[]> {
		return (await this.getAccountUseCase.execute()).getResult();
	}

	async findByAccountId (accountId: string): Promise<ServiceModel[]> {
		return (await this.getServicesByAccoundIdUseCase.execute(accountId)).getResult();
	}
}

export default AccountService;
