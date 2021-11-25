import { Filter, IMapper } from 'types-ddd';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import { Inject, Injectable } from '@nestjs/common';
import ServiceMapper from '../mappers/service.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AccountServiceModel from '../models/account-service.model';

@Injectable()
export class ServiceRepo implements IServiceRepo<ServiceAggregate, ServiceModel> {
	constructor (
		@Inject(ServiceMapper)
		private readonly mapper: IMapper<ServiceAggregate, ServiceModel>,

		@InjectRepository(ServiceModel)
		private readonly serviceConnection: Repository<ServiceModel>,

		@InjectRepository(AccountServiceModel)
		private readonly accountServiceConnection: Repository<AccountServiceModel>
	) {	}

	async save (aggregate: ServiceAggregate): Promise<void> {
		const entity = this.mapper.toPersistence(aggregate);

		await this.serviceConnection.save(entity);
	};

	async findMany (ids: string[]): Promise<ServiceAggregate[]> {
		const entities = await this.serviceConnection.findByIds(ids);
		return entities.map((entity) => this.mapper.toDomain(entity));
	};

	async findOne (filter: Filter<Partial<ServiceModel>>): Promise<ServiceAggregate|null> {
		const entity = await this.serviceConnection.findOne(filter);
		if (!entity) {
			return null;
		}
		return this.mapper.toDomain(entity);
	}

	async findAsModel (ids?: string[]): Promise<ServiceModel[]> {
		if (ids?.length) {
			return await this.serviceConnection.findByIds(ids);
		}
		return await this.serviceConnection.find();
	};

	async findAsByAccountIdModel (accountId: string): Promise<ServiceModel[]> {
		const accSrvs = await this.accountServiceConnection.find({ where: { accountId } });
		const ids = accSrvs.map((accSv) => accSv.serviceId);
		const services = this.serviceConnection.findByIds(ids);
		return services as unknown as ServiceModel[];
	};
}

export default ServiceRepo;
