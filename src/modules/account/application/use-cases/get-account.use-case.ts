import { IUseCase, Result, Logger } from 'types-ddd';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountUseCase implements IUseCase<void, Result<AccountModel[], string>> {
	constructor (
		@Inject('AccountRepository')
		private readonly accountRepo: IAccountRepo<AccountAggregate, AccountModel>

	) { }

	async execute (): Promise<Result<AccountModel[], string>> {
		try {
			const accounts = await this.accountRepo.findAsModel();
			console.log(accounts);

			return Result.ok(accounts);
		} catch (error: any) {
			Logger.error(error.message);
			return Result.fail('Internal Server Error on CreateGetAccountUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default GetAccountUseCase;
