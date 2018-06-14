import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsString, IsDate } from 'class-validator';
import {Type} from "class-transformer";
import {BaseEntity} from 'typeorm/repository/BaseEntity'
import Teacher from '../teachers/entity'
import { Student } from '../students/entity';


@Entity()
export class Evaluation extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  score: string

  @IsString()
  @Column('text')
  remark: string

  @IsDate()
  @Column('date')
  @Type(() => Date)
@Column('text')
date: Date

@ManyToOne(_ => Teacher, teacher => teacher.evaluation, {eager:true})
teacher: Teacher;

@ManyToOne(_ => Student, student => student.evaluations)
student: Student

}