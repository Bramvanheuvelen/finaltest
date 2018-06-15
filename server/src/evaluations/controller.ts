import { JsonController, Post, Put, Param, Get, Body, HttpCode, BodyParam } from 'routing-controllers'
import { Evaluation } from './entity';
import { Student } from '../students/entity';
import Teacher from '../teachers/entity';

@JsonController()
export default class EvaluationController {

    @Post('/evaluation')
@HttpCode(201)
async createEvaluation(
  @Body() evaluation: Evaluation,
  @BodyParam('student_id', {required:true}) student_id: number,
  @BodyParam('teacher_id', {required:true}) teacher_id: number
) {
  const teacher = await Teacher.findOne(teacher_id)
  if (teacher instanceof Teacher) evaluation.teacher = teacher
  const student = await Student.findOne(student_id)
  if (student instanceof Student) evaluation.student = student
  const entity = await evaluation.save()
  return { entity }
}

@Put('/evaluation/:id')
async updateEvaluation(
  @Param('id') id: number,
  @Body() update: Partial<Evaluation>
) {
  const evaluation = await Evaluation.findOne(id)
  if (evaluation) 
  return Evaluation.merge(evaluation, update).save()
}

@Get('/evaluation/:id([0-9]+)')
  getEvaluation(
    @Param('id') id: number
  ) {
    return Evaluation.findOne(id)
  }

}