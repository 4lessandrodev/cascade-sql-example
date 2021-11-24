import { Injectable, Inject } from '@nestjs/common';
import AccountModel from '@modules/account/infra/models/account.model';
import CreateAccountUseCase from '@modules/account/application/use-cases/create-account.use-case';
import CreateAccountDto from '@modules/account/application/use-cases/create-account.dto';
import HandlerErrorOnFailure from '@shared/result-error-handler/result-error-handler';
import { Result } from 'types-ddd';

@Injectable()
export class AccountService {
	private readonly account: AccountModel[] = [];

	constructor (
		@Inject(CreateAccountUseCase)
		private readonly createAccountUseCase: CreateAccountUseCase
	) {}

	async create (dto: CreateAccountDto): Promise<Result<void>> {
		return HandlerErrorOnFailure(await this.createAccountUseCase.execute(dto));
	}

	findAll (): AccountModel[] {
		return this.account;
	}
}

export default AccountService;
