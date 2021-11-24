import ServiceMapper from '@modules/service/infra/mappers/service.mapper';

describe('service.mapper', () => {
	it('should be defined', () => {
		const mapper = new ServiceMapper();
		expect(mapper.toDomain).toBeDefined();
		expect(mapper.toPersistence).toBeDefined();
	});
});
