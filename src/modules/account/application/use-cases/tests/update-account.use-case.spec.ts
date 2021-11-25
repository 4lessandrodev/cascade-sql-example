import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import UpdateAccountUseCase from '@modules/account/application/use-cases/update-account.use-case';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import IServiceRepo from '@modules/service/domain/repo/service.repo';

describe('create-update-account.use-case', () => {
	let repo: IAccountRepo<AccountAggregate, AccountModel>;
	let repo2: IServiceRepo<ServiceAggregate, ServiceModel>;

	beforeEach(() => {
		repo = {
			save: jest.fn(),
			findMany: jest.fn(),
			findAsModel: jest.fn(),
			findOne: jest.fn()
		};

		repo2 = {
			findAsModel: jest.fn(),
			findMany: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn()
		};
	});

	it('should be defined', () => {
		const useCase = new UpdateAccountUseCase(repo, repo2);
		expect(useCase).toBeDefined();
	});
});
