import { Field, ID, ObjectType } from '@nestjs/graphql';
import ServiceType from '@modules/service/infra/graphql/types/service.type';

@ObjectType()
export class AccountServiceModel {
	@Field(() => String)
    serviceId!: string;

	@Field(() => String)
	accountId!: string;

	@Field(() => ServiceType)
	service!: ServiceType;

	@Field(() => Date)
    createdAt!: Date;

	@Field(() => Date)
    updatedAt!: Date;
}

@ObjectType()
export class AccountType {
	@Field(() => ID)
	id!: string;

	@Field(() => [ServiceType], { nullable: true })
	services?: ServiceType[];

	@Field(() => String)
	name!: string;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
    updatedAt!: Date;
}

export default AccountType;
