'use client';

import { useState } from 'react';

import { useSendMessage } from '../../hooks/useSendMessage';
import { useConnectionStore } from '../../store/connectionStore';

export const ChatInput = () => {
  const [text, setText] = useState('');
  const sendMessage = useSendMessage();
  const { socketConnected } = useConnectionStore();

  const onSend = async () => {
    if (!text.trim()) return;
    await sendMessage.mutateAsync(text);
    setText('');
  };

  return (
    <div className="flex p-2 bg-white">
      <input
        className="flex-1 border bg-gray-100 rounded-1 px-2 py-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        disabled={!socketConnected || sendMessage.isPending}
      />
      <button
        className="bg-green-500 text-white px-4 py-1 rounded-r disabled:opacity-50"
        onClick={onSend}
        disabled={!socketConnected || sendMessage.isPending || !text.trim()}
      >
        送信
      </button>
    </div>
  );
};
