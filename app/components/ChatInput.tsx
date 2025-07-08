'use client'
import React, { useState } from 'react';

type Props = {
  onSend: (message: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex p-4 border-t border-gray-300">
      <input
        className="flex-1 border rounded-full px-4 py-2 mr-2 text-sm focus:outline-none"
        placeholder="メッセージを入力"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
        onClick={handleSend}
      >
        送信
      </button>
    </div>
  );
};

export default ChatInput;