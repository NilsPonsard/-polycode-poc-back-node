import { execute } from './execute';
import { IRunner, Output } from './iRunner';
import { AvailableLanguages } from './languages/generic';

export class DockerRunner implements IRunner {
  async run(language: string, code: string): Promise<Output> {
    return execute(language, code);
  }
  async getAvailableLanguages(): Promise<AvailableLanguages> {
    return {
      languages: ['typescript', 'javascript', 'java', 'rust', 'python'],
    };
  }
}
