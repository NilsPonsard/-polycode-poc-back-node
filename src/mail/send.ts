import { randomUUID } from 'crypto';
import { Email } from '../entities/email.entity';
import { User } from '../entities/user.entity';
import * as axios from 'axios';
import { FrontendUrl } from '../common';
import { MailCoolDown } from './constants';
import { HttpException } from '@nestjs/common';

const sendinblueKey = process.env.SENDINBLUE_KEY;
const senderEmail = process.env.SENDER_EMAIL;

/**
 * Sends a validation email to the user to reset his password.
 * The mail contains a link to the frontend : <FrontendUrl>/auth/reset/:code
 * The frontend must call back the backend at POST /mail/reset with the code and password in the request body (see MailController.validate)
 *
 * @param user
 */
export async function sendResetPasswordMail(email: string) {
  const lastEmail = await Email.findOne({
    where: {
      user: {
        email: email,
      },
    },
    order: {
      createdAt: 'DESC',
    },
    relations: ['user'],
  });

  if (lastEmail && lastEmail.createdAt.getTime() + MailCoolDown > Date.now())
    throw new Error('Mail cooldown');

  // Delete old codes

  try {
    Email.delete({
      user: {
        email: email,
      },
    });
  } catch (e) {
    console.log(e);
  }

  const code = randomUUID();

  const emailEntity = new Email();
  emailEntity.code = code;
  emailEntity.user = lastEmail.user;

  await emailEntity.save();

  const url = `${FrontendUrl}/auth/reset/${code}`;
  try {
    await sendMail(
      email,
      'Polycode : reset your password',
      /*html*/
      `<p>Hello ${lastEmail.user.username} !</p>
      <p>Please click on the following link to reset your password :
      <a href="${url}">${url}</a>
      </p>`,
    );
  } catch (e) {
    console.log(e);
  }
}

/**
 * Sends a validation email to the user that is not yet validated.
 * The mail contains a link to the frontend : <FrontendUrl>/auth/validate/:code
 * The frontend must call back the backend at POST /mail/validate (see MailController.validate)
 *
 * @param user
 */
export async function sendValidationMail(user: User) {
  if (user.emailVerified)
    throw new HttpException('User already validated', 400);

  const lastEmail = await Email.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
    order: {
      createdAt: 'DESC',
    },
  });

  if (lastEmail && lastEmail.createdAt.getTime() + MailCoolDown > Date.now())
    throw new Error('Mail cooldown');

  // Delete old codes

  try {
    Email.delete({
      user: {
        id: user.id,
      },
    });
  } catch (e) {
    console.log(e);
  }

  const code = randomUUID();
  const email = user.email;

  const emailEntity = new Email();
  emailEntity.code = code;
  emailEntity.user = user;

  await emailEntity.save();

  const url = `${FrontendUrl}/auth/validate/${code}`;
  try {
    await sendMail(
      email,
      'Polycode : validate your account',
      /*html*/
      `<p>Hello ${user.username} and welcome to polycode !</p>
      <p>Please click on the following link to validate your account :
      <a href="${url}">${url}</a>
      </p>`,
    );
  } catch (e) {
    console.log(e);
  }
}

function sendMail(email: string, subject: string, content: string) {
  return axios.default.post(
    'https://api.sendinblue.com/v3/smtp/email',
    {
      sender: {
        name: 'noreply',
        email: senderEmail,
      },
      to: [
        {
          email,
          name: email,
        },
      ],
      subject,
      htmlContent: content,
    },
    {
      headers: { 'api-key': sendinblueKey },
    },
  );
}
