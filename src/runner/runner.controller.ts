import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuardValidMail } from 'src/auth/authMail.guard';
import { RunCodeDto } from './dto/run-code.dto';
import { execute } from './execute';

/**
 * Api to call to execute code
 */
@ApiTags('runner')
@Controller('runner')
export class RunnerController {
  @Post('execute')
  @UseGuards(AuthGuardValidMail)
  @ApiBearerAuth('authorization')
  async execute(@Body() runCodeDto: RunCodeDto) {
    const { language, code } = runCodeDto;
    return await execute(language, code);
  }
}
