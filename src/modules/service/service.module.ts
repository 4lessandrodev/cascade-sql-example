import { Module } from '@nestjs/common';
import ServiceResolver from '@modules/service/infra/graphql/service.resolver';
import ServiceService from '@modules/service/service.service';
import CreateServiceUseCase from '@modules/service/application/use-cases/create-service.use-case';
import ServiceRepo from '@modules/service/infra/repo/service.repo';
import ServiceMapper from '@modules/service/infra/mappers/service.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import ServiceModel from './infra/models/service.model';

@Module({
	imports: [TypeOrmModule.forFeature([ServiceModel])],
	providers: [
		ServiceMapper,
		ServiceRepo,
		CreateServiceUseCase,
		ServiceService,
		ServiceResolver
	],
	exports: [
		ServiceMapper,
		ServiceRepo
	]
})
export class ServiceModule {}
