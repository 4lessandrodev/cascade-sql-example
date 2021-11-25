import { InputType, Field, ID } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class UpdateAccountInput {
	@IsNotEmpty()
	@Field(() => ID, { nullable: false })
	id!: string;

	@IsNotEmpty()
	@Length(3, 19)
	@Field(() => String, { nullable: false })
	name!: string;

	@IsArray()
	@Field(() => [String], { nullable: false })
	servicesId!: string[];
}

export default UpdateAccountInput;
