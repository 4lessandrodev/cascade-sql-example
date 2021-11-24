import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountType {
	@Field(() => Int)
	id!: number;

	@Field(() => String)
	name!: string;
}

export default AccountType;
