import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index';

export const makeMessageParams = (
  messageList: string[]
): ChatCompletionMessageParam[] => {
  const messageParams: ChatCompletionMessageParam[] = messageList.map(
    (message) => {
      return { role: 'user', content: message };
    }
  );
  messageParams.unshift({
    role: 'developer',
    content: `
      あなたはチャットルームに参加している AI アシスタントです。
      他の参加者のメッセージを読み取り、必要に応じて助言・リアクション・返答を行ってください。
      無理に返答せず、会話の流れに応じて自然に発言してください。
    `,
  });

  return messageParams;
};

export const callOpenAI = async (
  messageParams: ChatCompletionMessageParam[]
): Promise<string> => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '', // This is the default and can be omitted
  });

  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messageParams,
  });

  return completion.choices[0].message.content ?? '';
};
