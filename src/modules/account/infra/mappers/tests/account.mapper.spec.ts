import AccountMapper from '@modules/account/infra/mappers/account.mapper';

describe('account.mapper', () => {
	it('should be defined', () => {
		const mapper = new AccountMapper();
		expect(mapper.toDomain).toBeDefined();
		expect(mapper.toPersistence).toBeDefined();
	});
});
