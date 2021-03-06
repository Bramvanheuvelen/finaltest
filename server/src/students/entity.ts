import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { IsString, IsOptional } from 'class-validator';
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import { Evaluation } from '../evaluations/entity';
import { Batch } from '../batches/entity'

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

  @IsOptional()
  @IsString()
  @Column('text', {nullable: true})
  score: string

  @OneToMany(_ => Evaluation, evaluation => evaluation.student, {eager:true})
  evaluations: Evaluation[];

  @ManyToOne(_ => Batch, batch => batch.students)
  batch: Batch
 
}