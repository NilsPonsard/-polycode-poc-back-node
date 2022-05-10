import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { GetCollectionQuery } from './dto/get-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collection')
@ApiTags('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // @Post()
  // create(@Body() createCollectionDto: CreateCollectionDto) {
  //   return this.collectionService.create(createCollectionDto);
  // }

  @Get()
  @ApiQuery({ name: 'offset', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  findAll(@Query() options: GetCollectionQuery) {
    return this.collectionService.findAll(options.offset, options.limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
  //   return this.collectionService.update(+id, updateCollectionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.collectionService.remove(+id);
  // }
}
