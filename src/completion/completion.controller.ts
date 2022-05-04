import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuardValidMail } from 'src/auth/authMail.guard';
import { CompletionService } from './completion.service';
import { Request } from 'express';

@Controller('completion')
@ApiTags('completion')
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Get(':collectionId')
  @UseGuards(AuthGuardValidMail)
  @ApiBearerAuth('authorization')
  async getCompletion(
    @Param('collectionId') collectionId: string,
    @Req() request: Request,
  ) {
    return this.completionService.getCollectionCompleted(
      collectionId,
      request.user,
    );
  }

  @Post(':collectionId/:exerciceId')
  @UseGuards(AuthGuardValidMail)
  @ApiBearerAuth('authorization')
  async setCompletion(
    @Param('collectionId') collectionId: string,
    @Param('exerciceId') exerciceId: string,
    @Req() request: Request,
  ) {
    return this.completionService.setExerciseCompleted(
      collectionId,
      exerciceId,
      request.user,
    );
  }
}
