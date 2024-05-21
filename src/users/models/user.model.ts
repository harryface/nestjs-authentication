import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/common/base.model';

@Table
export class User extends BaseModel {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	userName: string;

	@Column
	firstName: string;

	@Column
	lastName: string;

	@Column(DataType.DATE)
	birthDate: Date;

	@Column
	pic: string;

	@Column(DataType.NUMBER)
	phone: number;

	@Column({
		type: DataType.ENUM('he/him', 'she/her', 'they/them', 'ze/hir', 'other'),
		defaultValue: 'other',
		allowNull: false
	})
	pronoun: 'he/him' | 'she/her' | 'they/them' | 'ze/hir' | 'other';

	@Column
	countryCode: string;

	@Column
	password: string;

	@Column({ defaultValue: true })
	isActive: boolean;

	// for google auth
	@Column
	subId: string;

	@Column
	get full_name(): string {
		return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
	}
}
