import { Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import AccountType from '@modules/account/infra/graphql/types/account.type';
import AccountService from '@modules/account/account.service';
import CreateAccountInput from '@modules/account/infra/graphql/inputs/create-account.input';
import UpdateAccountInput from './inputs/update-account.input';
import ServiceType from '@modules/service/infra/graphql/types/service.type';

@Resolver(() => AccountType)
export class AccountResolver {
	constructor (
		@Inject(AccountService)
		private readonly accService: AccountService
	) {}

	@Mutation(() => Boolean)
	async createAccount (
		@Args('CreateAccountInput') input: CreateAccountInput
	): Promise<boolean> {
		const result = await this.accService.create(input);
		return result.isSuccess;
	}

	@Mutation(() => Boolean)
	async updateAccount (
		@Args('UpdateAccountInput') input: UpdateAccountInput
	): Promise<boolean> {
		const result = await this.accService.update(input);
		return result.isSuccess;
	}

	@Query(() => [AccountType])
	async getAccount (): Promise<AccountType[]> {
		return await this.accService.findAll();
	}

	@ResolveField(() => ServiceType)
	async services (@Parent() account: AccountType): Promise<ServiceType[]> {
		return await this.accService.findByAccountId(account.id);
	}
}

export default AccountResolver;
