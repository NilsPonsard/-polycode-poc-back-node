import * as Docker from 'dockerode';
import { Stream } from 'stream';

const docker = new Docker();

export async function dockerRunCode(
  image: string,
  code: string,
): Promise<{ stdout: string; stderr: string }> {
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

  await docker.run(
    image,
    ['/bin/sh', 'start.sh'],
    [stdout, stderr],
    {
      Tty: false,
      Env: [`CODE=${code}`],
    },
    {},
  );

  return { stdout: stdoutString, stderr: stderrString };
}
