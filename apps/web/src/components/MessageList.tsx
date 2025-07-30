import { Message } from '@portfolio-chat/prisma-client';
import { MessageBubble } from './MessageBubble';

type Props = {
  messages: Message[];
};

export const MessageList = ({ messages }: Props) => {
  return (
    <>
      {messages.map((msg) => {
        return <MessageBubble key={msg.messageId} message={msg} />;
      })}
    </>
  );
};
