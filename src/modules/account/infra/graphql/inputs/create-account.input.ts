import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateAccountInput {
	@IsNotEmpty()
	@Length(3, 19)
	@Field(() => String, { nullable: false })
	name!: string;

	@IsArray()
	@Field(() => [String], { nullable: false })
	servicesId!: string[];
}

export default CreateAccountInput;
