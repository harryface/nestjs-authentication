import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/base.model';

@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    nullable: false,
    unique: true
  })
  userName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  pic: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // for google auth
  @Column({ nullable: true })
  subId: string;
}
