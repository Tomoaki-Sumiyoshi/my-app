'use client'
import { useState } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'こんにちは！', sender: 'other' },
    { id: 2, text: 'やっほー！', sender: 'me' },
  ]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: 'me' }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md h-screen flex flex-col bg-white shadow-lg">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}