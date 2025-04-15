'use server';

import { z } from 'zod';
import { validatedAction } from '../middleware';

export type NewMessageFormState = {
  error?: boolean;
  message: string;
  payload?: FormData;
};

const newCommentSchema = z.object({
  userName: z.string().min(3),
  groupId: z.string().min(1),
  message: z.string().min(1),
});

export const sendCommentAction = validatedAction(
  newCommentSchema,
  async (data) => {
    const { message, groupId, userName } = data;
    console.log('holaaa');
    await console.log({ message, groupId, userName });
  }
);
