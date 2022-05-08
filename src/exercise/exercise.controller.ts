import {
  Controller,
  Get,
  HttpException,
  // Post,
  // Body,
  // Patch,
  Param,
  Query,
  // Delete,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetExerciseQuery } from './dto/get-exercise.dto';
import { ExerciseService } from './exercise.service';
// import { CreateExerciceDto } from './dto/create-exercice.dto';
// import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Controller('exercise')
@ApiTags('exercise')
export class ExerciseController {
  constructor(private readonly exerciceService: ExerciseService) {}

  // @Post()
  // create(@Body() createExerciceDto: CreateExerciceDto) {
  //   return this.exerciceService.create(createExerciceDto);
  // }

  @Get()
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  findAll(@Query() options: GetExerciseQuery) {
    return this.exerciceService.findAll(options.offset, options.limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.exerciceService.findOne(id);
    if (!res) throw new HttpException('Exercice not found', 404);
    return res;
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExerciceDto: UpdateExerciceDto,
  // ) {
  //   return this.exerciceService.update(+id, updateExerciceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.exerciceService.remove(+id);
  // }
}
