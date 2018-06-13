import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { IsString, IsDate } from 'class-validator';
import { Type } from "class-transformer";
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Student } from '../students/entity';



@Entity('batches')
export class Batch extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number


  @Column('text')
  batch_id: String

 @IsDate()
  @Column('date')
  @Type(() => Date)
  startDate: Date

  @IsDate()
@Column('date')
@Type(() => Date)
endDate: Date

@OneToMany(_ => Student, student => student.batch, {eager:true})
students: Student[]

}