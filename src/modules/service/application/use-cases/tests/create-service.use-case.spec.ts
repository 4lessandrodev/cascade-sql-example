import CreateServiceUseCase from '@modules/service/application/use-cases/create-service.use-case';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';

describe('create-service.use-case', () => {
	let repo: IServiceRepo<ServiceAggregate, ServiceModel>;

	beforeEach(() => {
		repo = {
			save: jest.fn(),
			findMany: jest.fn(),
			findAsModel: jest.fn(),
			findOne: jest.fn(),
			findAsByAccountIdModel: jest.fn()
		};
	});

	it('should be defined', () => {
		const useCase = new CreateServiceUseCase(repo);
		expect(useCase).toBeDefined();
	});
});
