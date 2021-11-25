import { Injectable, Inject } from '@nestjs/common';
import ServiceModel from '@modules/service/infra/models/service.model';
import CreateServiceUseCase from '@modules/service/application/use-cases/create-service.use-case';
import CreateServiceDto from '@modules/service/application/use-cases/create-service.dto';
import HandlerErrorOnFailure from '@shared/result-error-handler/result-error-handler';
import { Result } from 'types-ddd';
import GetServiceUseCase from './application/use-cases/get-service.use-case';

@Injectable()
export class ServiceService {
	constructor (
		@Inject(CreateServiceUseCase)
		private readonly createServiceUseCase: CreateServiceUseCase,

		@Inject(GetServiceUseCase)
		private readonly getServicesUseCase: GetServiceUseCase
	) {}

	async create (dto: CreateServiceDto): Promise<Result<void>> {
		return HandlerErrorOnFailure(await this.createServiceUseCase.execute(dto));
	}

	async findAll (): Promise<ServiceModel[]> {
		return (await this.getServicesUseCase.execute()).getResult();
	}
}

export default ServiceService;
