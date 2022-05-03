import { Output } from './generic';

export async function ExecuteNode(code: string): Promise<Output> {
  return { stdout: '', stderr: '' };
}
