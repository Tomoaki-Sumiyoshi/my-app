'use client';
import { Message } from '@packages/types/messages';
import React from 'react';
import ChatBubble from './ChatBubble';

type ChatBubbleListProps = {
  messages: Message[];
  userId: string;
};

const ChatBubbleList: React.FC<ChatBubbleListProps> = ({
  messages,
  userId,
}) => {
  return (
    <>
      {messages.map((msg) => (
        <ChatBubble
          key={msg.messageId}
          message={msg.message}
          isMe={userId === msg.userId}
        />
      ))}
    </>
  );
};

export default ChatBubbleList;
