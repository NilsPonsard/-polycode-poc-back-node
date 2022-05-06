import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuardValidMail } from 'src/auth/authMail.guard';
import { DockerRunner } from './dockerRunner';
import { RunCodeDto } from './dto/run-code.dto';
import { execute } from './execute';
import { IRunner, Output } from './iRunner';
import { AvailableLanguages } from './languages/generic';

/**
 * Api to call to execute code
 */
@ApiTags('runner')
@Controller('runner')
export class RunnerController {
  runner!: IRunner;

  constructor() {
    this.runner = new DockerRunner();
  }
  @Post('execute')
  @UseGuards(AuthGuardValidMail)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    type: Output,
  })
  async execute(@Body() runCodeDto: RunCodeDto): Promise<Output> {
    const { language, code } = runCodeDto;
    return this.runner.run(language, code);
  }

  @Get('languages')
  @ApiResponse({
    type: AvailableLanguages,
  })
  async getLanguages(): Promise<AvailableLanguages> {
    return await this.runner.getAvailableLanguages();
  }
}
