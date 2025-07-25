'use client';
import React, { useState } from 'react';

type Props = {
  onSend: (text: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(true);
  const enableButtonClass = 'bg-blue-500 cursor-pointer hover:bg-blue-600';
  const disableButtonClass = 'bg-gray-400';

  const handleSend = () => {
    if (input.trim() === '') return;

    onSend(input);
    setInput('');
  };

  return (
    <div className="flex p-4 border-t border-gray-300">
      <input
        className="flex-1 border rounded-full px-4 py-2 mr-2 text-sm focus:outline-none"
        placeholder="メッセージを入力"
        value={input}
        onChange={(e) => {
          const text = e.target.value;
          setInput(text);
          setDisabled(text.trim() === '');
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className={`${
          disabled ? disableButtonClass : enableButtonClass
        } text-white px-4 py-2 rounded-full text-sm`}
        onClick={handleSend}
        disabled={disabled}
      >
        送信
      </button>
    </div>
  );
};

export default ChatInput;
