import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsString } from 'class-validator';
import {Type} from "class-transformer";
import {BaseEntity} from 'typeorm/repository/BaseEntity'
//import { User } from '../teachers/entity'


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

  @Type(() => Date)
@Column('text')
date: Date

// @ManyToOne(type => User, user => user.evaluation)
// user: User;


}