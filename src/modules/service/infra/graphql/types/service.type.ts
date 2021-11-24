import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceType {
	@Field(() => Int)
	id!: number;

	@Field(() => String)
	name!: string;
}

export default ServiceType;
