import { AggregateRoot, Result, BaseDomainEntity } from 'types-ddd';

export interface AccountAggregateProps extends BaseDomainEntity {
	name: string;
	servicesId: string[];
}

export class AccountAggregate extends AggregateRoot<AccountAggregateProps> {
	private constructor (props: AccountAggregateProps) {
		super(props, AccountAggregate.name);
	}

	get name (): string {
		return this.props.name;
	}

	get servicesId (): string[] {
		return this.props.servicesId;
	}

	changeServices (services: string[]): void {
		this.props.servicesId = services;
	}

	changeName (name: string): void {
		this.props.name = name;
	}

	public static create (props: AccountAggregateProps): Result<AccountAggregate> {
		return Result.ok(new AccountAggregate(props));
	}
}

export default AccountAggregate;
