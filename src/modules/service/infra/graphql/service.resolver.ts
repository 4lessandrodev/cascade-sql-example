import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ServiceType from '@modules/service/infra/graphql/types/service.type';
import ServiceService from '@modules/service/service.service';
import CreateServiceInput from '@modules/service/infra/graphql/inputs/create-service.input';

@Resolver(() => ServiceType)
export class ServiceResolver {
	constructor (
		@Inject(ServiceService)
		private readonly service: ServiceService
	) {}

	@Mutation(() => Boolean)
	async createService (
		@Args('CreateServiceInput') input: CreateServiceInput
	): Promise<boolean> {
		const result = await this.service.create(input);
		return result.isSuccess;
	}

	@Query(() => [ServiceType])
	async getService (): Promise<ServiceType[]> {
		return await this.service.findAll();
	}
}

export default ServiceResolver;
