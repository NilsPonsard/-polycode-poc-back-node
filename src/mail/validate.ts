import { Email } from 'src/entities/email.entity';
import { MailExpiration } from './constants';

/**
 *
 * @param code
 * @returns A promise resolved to true when the code is valid and the user has been validated, false otherwise
 */
export async function validateMail(code: string): Promise<boolean> {
  const email = await Email.findOne({ where: { code }, relations: ['user'] });
  console.log(code, email);

  if (!email) return false;

  Email.delete({ code });

  if (email.createdAt.getTime() > Date.now() + MailExpiration) return false;

  email.user.emailVerified = true;
  await email.user.save();

  return true;
}
