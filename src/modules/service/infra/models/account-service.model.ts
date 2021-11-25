import { Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import AccountModel from '@modules/account/infra/models/account.model';
import ServiceModel from './service.model';

@Entity({ name: 'accounts_service' })
export class AccountServiceModel {
    @PrimaryColumn({ type: 'uuid' })
    serviceId!: string;

    @PrimaryColumn({ type: 'uuid' })
    accountId!: string;

    @ManyToOne(() => ServiceModel, as => as.accountService)
    service!: ServiceModel;

    @ManyToOne(() => AccountModel, as => as.accountService)
    account!: AccountModel;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: false })
    updatedAt!: Date;
}

export default AccountServiceModel;
