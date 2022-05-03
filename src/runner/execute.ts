import { HttpException } from '@nestjs/common';

import * as ts from 'typescript';
import { Output } from './languages/generic';
import { ExecuteJava } from './languages/java';
import { ExecuteNode } from './languages/node';
import { ExecutePython } from './languages/python';
import { ExecuteRust } from './languages/Rust';

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
      result = await ExecuteNode(code);
      break;
    case 'java':
      result = await ExecuteJava(code);
      break;
    case 'rust':
      result = await ExecuteRust(code);
      break;
    case 'python':
      result = await ExecutePython(code);
      break;
    default:
      throw new HttpException('Language not supported', 400);
  }
  return result;
}
