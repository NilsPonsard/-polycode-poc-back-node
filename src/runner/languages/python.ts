import { Output } from './generic';

export async function ExecutePython(code: string): Promise<Output> {
  return { stdout: '', stderr: '' };
}
