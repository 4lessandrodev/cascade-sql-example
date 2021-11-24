import { ArgsType, Field, Int, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType()
class GetAccountArgs {
	@Field(() => Int, { nullable: false })
	id!: number;

	@Field({ defaultValue: '' })
	name?: string;
}

export default GetAccountArgs;
