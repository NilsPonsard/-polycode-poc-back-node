import { Output } from './generic';

export async function ExecuteRust(code: string): Promise<Output> {
  return { stdout: '', stderr: '' };
}
