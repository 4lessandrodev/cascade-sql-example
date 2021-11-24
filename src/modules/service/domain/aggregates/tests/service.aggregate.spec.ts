import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';

describe('service.aggregate', () => {
	it('should be defined', () => {
		const aggregate = ServiceAggregate.create;
		expect(aggregate).toBeDefined();
	});
});
