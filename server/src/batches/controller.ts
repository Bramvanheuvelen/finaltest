import { JsonController, Post, Param, Get, Body} from 'routing-controllers'
import { Batch } from './entity';

@JsonController()
export default class BatchController {

    @Post('/batches')
async createBatch(
  @Body() batch: Batch
) {
  const entity = await batch.save()
  return { entity }
}

@Get('/batches/:id([0-9]+)')
getBatch(
  @Param('id') id: number
) {
  return Batch.findOne(id)
}

@Get('/batches')
async allBatches(
) {
  const entity = await Batch.find()
  return { entity }
}

}