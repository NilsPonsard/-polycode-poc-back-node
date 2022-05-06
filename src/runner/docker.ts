import * as Docker from 'dockerode';
import { Stream } from 'stream';
import { Output } from './iRunner';

const docker = new Docker();

export async function dockerRunCode(
  image: string,
  code: string,
): Promise<Output> {
  let stdoutString = '';

  let stderrString = '';

  const stdout = new Stream.Writable({
    write(chunk, encoding, next) {
      stdoutString += chunk.toString();
      next();
    },
  });
  const stderr = new Stream.Writable({
    write(chunk, encoding, callback) {
      stderrString += chunk.toString();
      callback();
    },
  });

  const data = await docker.run(
    image,
    ['/bin/sh', 'start.sh'],
    [stdout, stderr],
    {
      Tty: false,
      Env: [`CODE=${code}`],
    },
    {},
  );

  await data[1].remove();

  return { stdout: stdoutString, stderr: stderrString };
}
