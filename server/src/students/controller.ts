import { JsonController, Post, Put, Param, Get, Body, HttpCode, NotFoundError, Delete } from 'routing-controllers'
import { Student } from './entity';

@JsonController()
export default class StudentController {

    @Post('/students')
@HttpCode(201)
createStudent(
  @Body() student: Student
) {
  return student.save()
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
    return Student.delete(id)
  }
}