import { AggregateRoot, Result, BaseDomainEntity } from 'types-ddd';

export interface ServiceAggregateProps extends BaseDomainEntity {
	name: string;
}

export class ServiceAggregate extends AggregateRoot<ServiceAggregateProps> {
	private constructor (props: ServiceAggregateProps) {
		super(props, ServiceAggregate.name);
	}

	get name (): string {
		return this.props.name;
	}

	public static create (
		props: ServiceAggregateProps
	): Result<ServiceAggregate> {
		return Result.ok(new ServiceAggregate(props));
	}
}

export default ServiceAggregate;
