import { IMapper } from 'types-ddd';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import ServiceRepo from '@modules/service/infra/repo/service.repo';
import ServiceMapper from '@modules/service/infra/mappers/service.mapper';

describe('service.repo', () => {
	let mapper: IMapper<ServiceAggregate, ServiceModel>;

	beforeAll(() => {
		mapper = new ServiceMapper();
	});

	it('should be defined', () => {
		const repo = new ServiceRepo(mapper);
		expect(repo).toBeDefined();
	});
});
