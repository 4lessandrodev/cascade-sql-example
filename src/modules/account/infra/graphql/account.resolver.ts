import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import AccountType from '@modules/account/infra/graphql/types/account.type';
import GetAccountArgs from '@modules/account/infra/graphql/args/get-account.arg';
import AccountService from '@modules/account/account.service';
import CreateAccountInput from '@modules/account/infra/graphql/inputs/create-account.input';

@Resolver(() => AccountType)
export class AccountResolver {
	constructor (
		@Inject(AccountService)
		private readonly service: AccountService
	) {}

	@Mutation(() => Boolean)
	async createAccount (
		@Args('CreateAccountInput') input: CreateAccountInput
	): Promise<boolean> {
		const result = await this.service.create(input);
		return result.isSuccess;
	}

	@Query(() => AccountType)
	async getAccount (
		@Args('input', { type: () => GetAccountArgs }) input: GetAccountArgs
	): Promise<AccountType> {
		console.log('Get', input);
		return {
			id: 1,
			name: 'some account'
		};
	}
}

export default AccountResolver;
