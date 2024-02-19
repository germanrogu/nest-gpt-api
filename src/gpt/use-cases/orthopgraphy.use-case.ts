import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Recibirás un texto en español con posibles errores ortograficos y gramaticales, las palabras deben existir en el diccionario de
            la real academia española.
            Debes de responder en formato JSON
            tu tarea es corregirlos y retornar informacion de las solicitudes, tambien debes dar un porcentaje de acierto por el usuario,

            Si no hay errores, debes retornar un mensaje de felicitaciones.
            
            Ejemplo de salida:
            {
                userScore: number,
                errors: string[], //['error -> solucion']
                message: string, //Usa emojis para felicitar al usuario
            }
      `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
  });

  return JSON.parse(completion.choices[0].message.content);
};
