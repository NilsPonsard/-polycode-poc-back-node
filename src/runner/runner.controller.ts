import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuardValidMail } from 'src/auth/authMail.guard';
import { RunCodeDto } from './dto/run-code.dto';
import { execute } from './execute';
import { Output } from './languages/generic';

/**
 * Api to call to execute code
 */
@ApiTags('runner')
@Controller('runner')
export class RunnerController {
  @Post('execute')
  @UseGuards(AuthGuardValidMail)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    type: Output,
  })
  async execute(@Body() runCodeDto: RunCodeDto): Promise<Output> {
    const { language, code } = runCodeDto;
    return execute(language, code);
  }
}
