import CreateAccountUseCase from '@modules/account/application/use-cases/create-account.use-case';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';

describe('create-account.use-case', () => {
	let repo: IAccountRepo<AccountAggregate, AccountModel>;

	beforeEach(() => {
		repo = {
			save: jest.fn(),
			findMany: jest.fn()
		};
	});

	it('should be defined', () => {
		const useCase = new CreateAccountUseCase(repo);
		expect(useCase).toBeDefined();
	});
});
