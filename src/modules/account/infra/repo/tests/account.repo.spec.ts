import { IMapper } from 'types-ddd';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import AccountRepo from '@modules/account/infra/repo/account.repo';
import AccountMapper from '@modules/account/infra/mappers/account.mapper';

describe('account.repo', () => {
	let mapper: IMapper<AccountAggregate, AccountModel>;

	beforeAll(() => {
		mapper = new AccountMapper();
	});

	it('should be defined', () => {
		const repo = new AccountRepo(mapper);
		expect(repo).toBeDefined();
	});
});
