import { Filter, IMapper } from 'types-ddd';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Inject, Injectable } from '@nestjs/common';
import AccountMapper from '../mappers/account.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountServiceModel } from '../graphql/types/account.type';

@Injectable()
export class AccountRepo
implements IAccountRepo<AccountAggregate, AccountModel>
{
	constructor (
		@Inject(AccountMapper)
		private readonly mapper: IMapper<AccountAggregate, AccountModel>,

		@InjectRepository(AccountModel)
		private readonly accountConnection: Repository<AccountModel>,

		@InjectRepository(AccountServiceModel)
		private readonly accountServiceConnection: Repository<AccountServiceModel>
	) {}

	async save (aggregate: AccountAggregate): Promise<void> {
		const entity = this.mapper.toPersistence(aggregate);

		await this.accountServiceConnection.delete({ accountId: entity.id });

		await this.accountConnection.save(entity);
	}

	async findMany (ids: string[]): Promise<AccountAggregate[]> {
		const entities = await this.accountConnection.findByIds(ids);
		return entities.map((entity) => this.mapper.toDomain(entity));
	}

	async findOne (
		filter: Filter<Partial<AccountModel>>
	): Promise<AccountAggregate | null> {
		const entity = await this.accountConnection.findOne({
			...filter,
			relations: ['accountService']
		});
		if (!entity) {
			return null;
		}

		return this.mapper.toDomain(entity);
	}

	async findAsModel (): Promise<AccountModel[]> {
		const models = await this.accountConnection.find({
			relations: ['accountService']
		});
		return models;
	}
}

export default AccountRepo;
