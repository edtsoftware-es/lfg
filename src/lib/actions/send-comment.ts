'use server';

import { db } from '@/db/drizzle';
import { groupComments } from '@/db/schema';
import { revalidateTag } from 'next/cache';
import { to } from '../await-to';

export type NewMessageFormState = {
  error?: boolean;
  message: string;
  payload?: FormData;
};

export const sendCommentAction = async (data: FormData) => {
  const userName = data.get('userName') as string;
  const groupId = data.get('groupId') as string;
  const message = data.get('message') as string;

  if (!userName || !groupId || !message) {
    return {
      error: 'Debes completar todos los campos',
    };
  }

  const [error, _result] = await to(
    db
      .insert(groupComments)
      .values({ message: message, userName: userName, groupId: +groupId })
      .returning()
  );

  if (error) {
    return {
      error: 'An error occurred while submitting the comment.',
    };
  }

  revalidateTag('groups');
};
