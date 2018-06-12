import { JsonController, Post, Put, Param, Get, Body, HttpCode, NotFoundError, Delete, BodyParam } from 'routing-controllers'
import { Student } from './entity';
import { Batch } from '../batches/entity';
import { Evaluation } from '../evaluations/entity';

@JsonController()
export default class StudentController {

    @Post('/students')
@HttpCode(201)
async createStudent(
  @Body() student: Student,
  @BodyParam('batchId', {required: true}) batchId: number
) {
  const batch = await Batch.findOne(batchId)
  if (batch instanceof Batch) student.batch = batch
  const entity = await student.save()
  return { entity }
}

@Put('/students/:id')
async updatePage(
  @Param('id') id: number,
  @Body() update: Partial<Student>
) {
  const student = await Student.findOne(id)
  if (!student) throw new NotFoundError('Cannot find student')

  return Student.merge(student, update).save()
}

@Get('/students/:id([0-9]+)')
  getStudents(
    @Param('id') id: number
  ) {
    return Student.findOne(id)
  }

  @Get('/students')
  async allStudents() {
    const students = await Student.find()
    return { students }
  }

@Delete('/students/:id([0-9]+)')
async deleteStudent(
  @Param('id') id: number
  ) {
    const student = await Student.findOne(id)
    if (student) {
      const evaluations = await Evaluation.find({student: student})
      evaluations.map(evaluation => evaluation.remove())
      await student.remove()
    }
    return 'Succes!'
  }
}