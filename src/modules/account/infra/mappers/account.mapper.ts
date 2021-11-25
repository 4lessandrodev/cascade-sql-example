import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Injectable } from '@nestjs/common';
import { IMapper, DomainId, Result } from 'types-ddd';
import AccountServiceModel from '../models/account-service.model';

export const AccountAggregateFactory = (model: AccountModel): Result<AccountAggregate> => {
	// check value object results here before initialize aggregate
	return AccountAggregate.create({
		ID: DomainId.create(model.id),
		name: model.name,
		servicesId: model.accountService.map((as) => as?.serviceId),
		createdAt: model.createdAt,
		updatedAt: model.updatedAt
	});
};

export const AccountModelFactory = (aggregate: AccountAggregate): AccountModel => {
	const accounts = aggregate.servicesId.map((as) => {
		const account = new AccountServiceModel();
		account.accountId = aggregate?.id?.uid;
		account.serviceId = as;
		return account;
	});

	const model = {
		id: aggregate.id.value.toString(),
		accountService: accounts,
		name: aggregate.name,
		createdAt: aggregate.createdAt,
		updatedAt: aggregate.updatedAt
	};

	return model;
};

@Injectable()
export class AccountMapper implements IMapper<AccountAggregate, AccountModel> {
	toDomain (model: AccountModel) {
		return AccountAggregateFactory(model).getResult();
	}

	toPersistence (aggregate: AccountAggregate) {
		return AccountModelFactory(aggregate);
	}
}

export default AccountMapper;
