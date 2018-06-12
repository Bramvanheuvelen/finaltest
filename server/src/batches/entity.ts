import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNumber, IsDate } from 'class-validator';
import { Type } from "class-transformer";
import { BaseEntity } from 'typeorm/repository/BaseEntity'
//import { Student } from '../students/entity';
//import { isDate } from 'util';


@Entity('batches')
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsNumber()
  @Column('integer')
  batch_id: number

 @IsDate()
  @Column('date')
  @Type(() => Date)
  startDate: Date

  @IsDate()
@Column('date')
@Type(() => Date)
endDate: Date

// @ManyToOne(type => Student, student => student.batches)
// student: Student;

}