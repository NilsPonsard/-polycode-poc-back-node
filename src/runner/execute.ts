import { HttpException } from '@nestjs/common';

import * as ts from 'typescript';

export async function execute(language: string, code: string) {
  let stdout = '';
  let stderr = '';

  switch (language) {
    case 'typescript':
      // transpile to JS for node

      code = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
        },
      }).outputText;
    case 'javascript':
      break;
    case 'java':
      break;
    case 'rust':
      break;
    default:
      throw new HttpException('Language not supported', 400);
  }
  return { stdout, stderr };
}
