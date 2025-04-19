import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

export const client = new Mistral({ apiKey: apiKey });

export async function sendMessage(message: string) {
  try {
    const text = await client.chat.complete({
      model: 'mistral-large-latest',
      messages: [{ role: 'user', content: message }],
    });

    if (!text || !text.choices?.length) {
      return {
        error: 'Error, No se han obtenido ningún mensaje',
      };
    }

    return {
      response: text?.choices[0].message.content,
    };
  } catch (error: unknown) {
    return {
      error: `Erro al enviar el mensaje: ${error}`,
    };
  }
}
