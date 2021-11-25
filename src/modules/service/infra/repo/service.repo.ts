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
		private readonly srvConn: Repository<ServiceModel>,

		@InjectRepository(AccountServiceModel)
		private readonly accSvrConn: Repository<AccountServiceModel>
	) {	}

	async save (aggregate: ServiceAggregate): Promise<void> {
		const entity = this.mapper.toPersistence(aggregate);

		await this.srvConn.save(entity);
	};

	async findMany (ids: string[]): Promise<ServiceAggregate[]> {
		const entities = await this.srvConn.findByIds(ids);
		return entities.map((entity) => this.mapper.toDomain(entity));
	};

	async findOne (filter: Filter<Partial<ServiceModel>>): Promise<ServiceAggregate|null> {
		const entity = await this.srvConn.findOne(filter);
		if (!entity) {
			return null;
		}
		return this.mapper.toDomain(entity);
	}

	async findAsModel (ids?: string[]): Promise<ServiceModel[]> {
		if (ids?.length) {
			return await this.srvConn.findByIds(ids);
		}
		return await this.srvConn.find();
	};

	async findAsByAccountIdModel (accountId: string): Promise<ServiceModel[]> {
		const accSrvs = await this.accSvrConn.find({ where: { accountId } });
		const ids = accSrvs.map((accSv) => accSv.serviceId);
		const services = this.srvConn.findByIds(ids);
		return services as unknown as ServiceModel[];
	};
}

export default ServiceRepo;
