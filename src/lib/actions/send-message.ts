/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { sendMessage } from '@/lib/chat-bot';

export async function sendMessageAction(prevState: any, formData: FormData) {
  const message = formData.get('message') as string;

  if (!message || message.length < 10) {
    return {
      error: true,
      message: 'El mensaje debe contener al menos 10 caracteres',
    };
  }

  const { error, response } = await sendMessage(message);

  if (error) {
    return {
      error: true,
      message: 'Error durante el envío del mensaje',
    };
  }

  return {
    error: false,
    message: response,
  };
}
