import { Filter, IMapper } from 'types-ddd';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Inject, Injectable } from '@nestjs/common';
import AccountMapper from '../mappers/account.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepo implements IAccountRepo<AccountAggregate, AccountModel> {
	constructor (
		@Inject(AccountMapper)
		private readonly mapper: IMapper<AccountAggregate, AccountModel>,

		@InjectRepository(AccountModel)
		private readonly conn: Repository<AccountModel>
	) {	}

	async save (aggregate: AccountAggregate): Promise<void> {
		const entity = this.mapper.toPersistence(aggregate);
		await this.conn.save(entity);
	};

	async findMany (filter: Filter<Partial<AccountModel>>): Promise<AccountAggregate[]> {
		const entities = await this.conn.find(filter);
		return entities.map((entity) => this.mapper.toDomain(entity));
	};

	async findOne (filter: Filter<Partial<AccountModel>>): Promise<AccountAggregate|null> {
		const entity = await this.conn.findOne(filter);
		if (!entity) {
			return null;
		}
		return this.mapper.toDomain(entity);
	}

	async findAsModel (filter: Filter<Partial<AccountModel>>): Promise<AccountModel[]> {
		return await this.conn.find(filter);
	};
}

export default AccountRepo;
