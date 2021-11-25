import { IUseCase, Result, Logger, DomainId } from 'types-ddd';
import CreateServiceDto from './create-service.dto';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateServiceUseCase implements IUseCase<CreateServiceDto, Result<void, string>> {
	constructor (
		@Inject('ServiceRepository')
		private readonly serviceRepo: IServiceRepo<ServiceAggregate, ServiceModel>
	) { }

	async execute (dto: CreateServiceDto): Promise<Result<void, string>> {
		try {
			const aggregateOrError = ServiceAggregate.create({
				ID: DomainId.create(),
				name: dto.name
			});
			if (aggregateOrError.isFailure) {
				return Result.fail(aggregateOrError.errorValue());
			}
			const aggregate = aggregateOrError.getResult();
			await this.serviceRepo.save(aggregate);
			return Result.success();
		} catch (error: any) {
			Logger.error(error.message);
			return Result.fail('Internal Server Error on CreateServiceUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CreateServiceUseCase;
