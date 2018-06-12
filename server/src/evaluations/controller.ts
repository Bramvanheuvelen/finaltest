import { JsonController, Post, Put, Param, Get, Body, HttpCode, NotFoundError } from 'routing-controllers'
import { Evaluation } from './entity';

@JsonController()
export default class EvaluationController {

    @Post('/evaluation')
@HttpCode(201)
createEvaluation(
  @Body() evaluation: Evaluation
) {
  return evaluation.save()
}

@Put('/evaluation/:id')
async updateEvaluation(
  @Param('id') id: number,
  @Body() update: Partial<Evaluation>
) {
  const evaluation = await Evaluation.findOne(id)
  if (!evaluation) throw new NotFoundError('Cannot find evalutation')

  return Evaluation.merge(evaluation, update).save()
}

    @Get('/evaluation/:id([0-9]+)')
  getEvaluation(
    @Param('id') id: number
  ) {
    return Evaluation.findOne(id)
  }

}