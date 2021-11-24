import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';

describe('account.aggregate', () => {
	it('should be defined', () => {
		const aggregate = AccountAggregate.create;
		expect(aggregate).toBeDefined();
	});
});
