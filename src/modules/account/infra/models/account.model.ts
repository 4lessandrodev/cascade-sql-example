import {
	Entity,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm';
import AccountServiceModel from './account-service.model';

@Entity({ name: 'accounts' })
export class AccountModel {
	@PrimaryColumn({ type: 'uuid', nullable: false })
	id!: string;

	@OneToMany(() => AccountServiceModel, (as) => as.account, {
		cascade: true,
		onDelete: 'CASCADE',
		orphanedRowAction: 'delete',
		onUpdate: 'CASCADE'
	})
	accountService!: AccountServiceModel[];

	@Column({ type: 'varchar', length: 20, nullable: false })
	name!: string;

	@CreateDateColumn({ type: 'datetime', nullable: false })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'datetime', nullable: false })
	updatedAt!: Date;
}

export default AccountModel;
