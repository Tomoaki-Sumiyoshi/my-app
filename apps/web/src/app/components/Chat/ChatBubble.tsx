'use client';
import React from 'react';

type ChatBubbleProps = {
  message: string;
  isMe: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isMe }) => {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-white text-sm
          ${
            isMe
              ? 'bg-green-500 rounded-br-none'
              : 'bg-gray-400 rounded-bl-none'
          }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
