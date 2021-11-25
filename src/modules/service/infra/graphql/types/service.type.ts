import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceType {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
    name!: string;

	@Field(() => Date)
    createdAt!: Date;

	@Field(() => Date)
    updatedAt!: Date;
}

export default ServiceType;
