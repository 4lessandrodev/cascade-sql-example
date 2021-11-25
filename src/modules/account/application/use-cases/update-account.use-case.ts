import { IUseCase, Result, Logger } from 'types-ddd';
import UpdateAccountDto from './update-account.dto';
import IAccountRepo from '@modules/account/domain/repo/account.repo';
import AccountAggregate from '@modules/account/domain/aggregates/account.aggregate';
import AccountModel from '@modules/account/infra/models/account.model';
import { Inject, Injectable } from '@nestjs/common';
import IServiceRepo from '@modules/service/domain/repo/service.repo';
import ServiceAggregate from '@modules/service/domain/aggregates/service.aggregate';
import ServiceModel from '@modules/service/infra/models/service.model';

@Injectable()
export class UpdateAccountUseCase implements IUseCase<UpdateAccountDto, Result<void, string>> {
	constructor (
		@Inject('AccountRepository')
		private readonly accountRepo: IAccountRepo<AccountAggregate, AccountModel>,

		@Inject('ServiceRepository')
		private readonly serviceRepo: IServiceRepo<ServiceAggregate, ServiceModel>

	) { }

	async execute (dto: UpdateAccountDto): Promise<Result<void, string>> {
		try {
			const aggregateOrError = await this.accountRepo.findOne({ id: dto.id });

			if (!aggregateOrError) {
				return Result.fail('Aggregate not found');
			}

			const aggregate = aggregateOrError;

			if (dto.servicesId.length > 0) {
				const services = await this.serviceRepo.findAsModel(dto.servicesId);
				aggregate.changeServices(services.map((srv) => {
					return srv.id;
				}));
			}

			aggregate.changeName(dto.name);

			await this.accountRepo.save(aggregate);
			return Result.success();
		} catch (error: any) {
			Logger.error(error.message);
			return Result.fail('Internal Server Error on CreateUpdateAccountUseCase', 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default UpdateAccountUseCase;
