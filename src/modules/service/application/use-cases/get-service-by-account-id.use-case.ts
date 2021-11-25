import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result, Logger } from 'types-ddd';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceModel from '@modules/service/infra/models/service.model';

@Injectable()
export class GetServiceByAccountIdUseCase implements IUseCase<string, Result<ServiceModel[], string>> {
	constructor (
		@Inject('ServiceRepository')
		private readonly serviceRepo: IServiceRepo<ServiceAggregate, ServiceModel>
	) { }

	async execute (accountId: string): Promise<Result<ServiceModel[], string>> {
		try {
			const services = await this.serviceRepo.findAsByAccountIdModel(accountId);
			return Result.ok(services);
		} catch (error: any) {
			Logger.error(error.message);
			return Result.fail('Internal Server Error on CreateGetServiceUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default GetServiceByAccountIdUseCase;
