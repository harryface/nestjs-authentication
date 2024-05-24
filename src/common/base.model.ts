import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

// https://typeorm.io/entities#column-types
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
