import { HttpException } from '@nestjs/common';

import * as ts from 'typescript';
import { dockerRunCode } from './docker';
import { Output } from './languages/generic';

export async function execute(language: string, code: string) {
  let result: Output;

  switch (language) {
    case 'typescript':
      // transpile to JS for node

      code = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
        },
      }).outputText;
    case 'javascript':
      result = await dockerRunCode('node-runner', code);
      break;
    case 'java':
      result = await dockerRunCode('java-runner', code);
      break;
    case 'rust':
      result = await dockerRunCode('rust-runner', code);
      break;
    case 'python':
      result = await dockerRunCode('python-runner', code);
      break;
    default:
      throw new HttpException('Language not supported', 400);
  }
  return result;
}
