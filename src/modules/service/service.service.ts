import { Injectable, Inject } from '@nestjs/common';
import ServiceModel from '@modules/service/infra/models/service.model';
import CreateServiceUseCase from '@modules/service/application/use-cases/create-service.use-case';
import CreateServiceDto from '@modules/service/application/use-cases/create-service.dto';
import HandlerErrorOnFailure from '@shared/result-error-handler/result-error-handler';
import { Result } from 'types-ddd';

@Injectable()
export class ServiceService {
	private readonly service: ServiceModel[] = [];

	constructor (
		@Inject(CreateServiceUseCase)
		private readonly createServiceUseCase: CreateServiceUseCase
	) {}

	async create (dto: CreateServiceDto): Promise<Result<void>> {
		return HandlerErrorOnFailure(await this.createServiceUseCase.execute(dto));
	}

	findAll (): ServiceModel[] {
		return this.service;
	}
}

export default ServiceService;
