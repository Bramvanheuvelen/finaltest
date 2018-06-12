import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsString } from 'class-validator';
import {BaseEntity} from 'typeorm/repository/BaseEntity'
// import { Evaluation } from '../evaluation/entity';
// import { Batch } from '../batches/entity'

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  surname: string

  @IsString()
  @Column('text')
  lastname: string

  @IsString()
  @Column('text')
  picture: string

  @IsString()
  @Column('integer')
  batch_id: number

  // @OneToMany(type => Evaluation, evaluation => evaluation.user)
  // evaluations: Evaluation[];

  // @OneToMany(type => Batch, batch => batch.student)
  // batches: Batch[];
 
}