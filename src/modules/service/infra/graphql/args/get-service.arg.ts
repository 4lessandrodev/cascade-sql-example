import { ArgsType, Field, Int, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType()
class GetServiceArgs {
	@Field(() => Int, { nullable: false })
	id!: number;

	@Field({ defaultValue: '' })
	name?: string;
}

export default GetServiceArgs;
