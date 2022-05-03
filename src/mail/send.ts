import { randomUUID } from 'crypto';
import { Email } from 'src/entities/email.entity';
import { User } from 'src/entities/user.entity';
import * as axios from 'axios';
import { frontendUrl } from 'src/common';

const sendiblueKey = process.env.SENDIBLUE_KEY;
const senderEmail = process.env.SENDER_EMAIL;

export const MailExpiration = 60 * 60 * 15; // 15 minutes
export const MailCoolDown = 60 * 60 * 5; // 5 minutes

export async function sendValidationMail(user: User) {
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

  if (lastEmail && lastEmail.createdAt.getTime() + MailCoolDown > Date.now()) {
    throw new Error('Mail cooldown');
  }

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

  const url = `${frontendUrl}/auth/validate?code=${code}`;

  await axios.default.post(
    'https://api.sendinblue.com/v3/smtp/email',
    {
      sender: {
        name: 'noreply',
        email: senderEmail,
      },
      to: [
        {
          email,
          name: user.username,
        },
      ],
      subject: 'Polycode : validate your account',
      htmlContent: `<p>Hello ${user.username}, to validate your account, please follow this link : <a href="${url}"> ${url}</a> </p>`,
    },
    {
      headers: { 'api-key': sendiblueKey },
    },
  );
}
