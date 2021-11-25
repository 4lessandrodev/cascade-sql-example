import { IUseCase, Result, Logger, DomainId } from 'types-ddd';
import CreateAccountDto from './create-account.dto';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Inject, Injectable } from '@nestjs/common';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';

@Injectable()
export class CreateAccountUseCase implements IUseCase<CreateAccountDto, Result<void, string>> {
	constructor (
		@Inject('AccountRepository')
		private readonly accountRepo: IAccountRepo<AccountAggregate, AccountModel>,

		@Inject('ServiceRepository')
		private readonly serviceRepo: IServiceRepo<ServiceAggregate, ServiceModel>

	) { }

	async execute (dto: CreateAccountDto): Promise<Result<void, string>> {
		try {
			const serviceExists = await this.serviceRepo.findMany(dto.servicesId);

			const hasTheSameLength = serviceExists.length === dto.servicesId.length;

			if (!hasTheSameLength) {
				return Result.fail('Some Services is not available. Please check It.', 'NOT_FOUND');
			}

			const aggregateOrError = AccountAggregate.create({
				ID: DomainId.create(),
				servicesId: dto.servicesId,
				name: dto.name
			});
			if (aggregateOrError.isFailure) {
				return Result.fail(aggregateOrError.errorValue());
			}
			const aggregate = aggregateOrError.getResult();
			await this.accountRepo.save(aggregate);
			return Result.success();
		} catch (error: any) {
			Logger.error(error.message);
			return Result.fail('Internal Server Error on CreateAccountUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CreateAccountUseCase;
