import { Filter, IMapper } from 'types-ddd';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import { Inject, Injectable } from '@nestjs/common';
import ServiceMapper from '../mappers/service.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRepo implements IServiceRepo<ServiceAggregate, ServiceModel> {
	constructor (
		@Inject(ServiceMapper)
		private readonly mapper: IMapper<ServiceAggregate, ServiceModel>,

		@InjectRepository(ServiceModel)
		private readonly conn: Repository<ServiceModel>
	) {	}

	async save (aggregate: ServiceAggregate): Promise<void> {
		const entity = this.mapper.toPersistence(aggregate);

		await this.conn.save(entity);
	};

	async findMany (filter: Filter<Partial<ServiceModel>>): Promise<ServiceAggregate[]> {
		const entities = await this.conn.find(filter);
		return entities.map((entity) => this.mapper.toDomain(entity));
	};

	async findOne (filter: Filter<Partial<ServiceModel>>): Promise<ServiceAggregate|null> {
		const entity = await this.conn.findOne(filter);
		if (!entity) {
			return null;
		}
		return this.mapper.toDomain(entity);
	}

	async findAsModel (filter: Filter<Partial<ServiceModel>>): Promise<ServiceModel[]> {
		return await this.conn.find(filter);
	};
}

export default ServiceRepo;
