'use client';
import { Message } from '@packages/types/messages';
import React from 'react';

type ChatBubbleProps = {
  message: Message;
  userId: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, userId }) => {
  const isMe = message.userId === userId;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-white text-sm
          ${
            message.isAi
              ? 'bg-red-400 rounded-bl-none'
              : isMe
              ? 'bg-green-500 rounded-br-none'
              : 'bg-gray-400 rounded-bl-none'
          }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default ChatBubble;
