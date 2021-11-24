import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateServiceInput {
	@IsNotEmpty()
	@Length(3, 19)
	@Field(() => String, { nullable: false })
	name!: string;
}

export default CreateServiceInput;
