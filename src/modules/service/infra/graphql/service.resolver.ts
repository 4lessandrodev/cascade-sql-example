import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import ServiceType from '@modules/service/infra/graphql/types/service.type';
import GetServiceArgs from '@modules/service/infra/graphql/args/get-service.arg';
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

	@Query(() => ServiceType)
	async getService (
		@Args('input', { type: () => GetServiceArgs }) input: GetServiceArgs
	): Promise<ServiceType> {
		console.log('Get', input);
		return {
			id: 1,
			name: 'some service'
		};
	}
}

export default ServiceResolver;
