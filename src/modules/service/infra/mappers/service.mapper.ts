import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';
import { IMapper, DomainId, Result } from 'types-ddd';

export const ServiceAggregateFactory = (model: ServiceModel): Result<ServiceAggregate> => {
	// check value object results here before initialize aggregate

	return ServiceAggregate.create({
		ID: DomainId.create(model.id),
		name: model.name,
		createdAt: model.createdAt,
		updatedAt: model.updatedAt
	});
};

export const ServiceModelFactory = (aggregate: ServiceAggregate): ServiceModel => {
	return {
		id: aggregate.id.value.toString(),
		name: aggregate.name,
		createdAt: aggregate.createdAt,
		updatedAt: aggregate.updatedAt
	};
};

export class ServiceMapper implements IMapper<ServiceAggregate, ServiceModel> {
	toDomain (model: ServiceModel) {
		return ServiceAggregateFactory(model).getResult();
	}

	toPersistence (aggregate: ServiceAggregate) {
		return ServiceModelFactory(aggregate);
	}
}

export default ServiceMapper;
