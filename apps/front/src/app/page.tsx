'use client';
import { useState, useRef, useEffect } from 'react';
import ChatBubble from './components/ChatBubble';
import ChatInput from './components/ChatInput';
import { Message, PostMessageBody } from '@packages/types/messages';
import {
  getMessageList,
  postMessage,
} from '@packages/client/api/messageClient';

export default function Home() {
  const ApiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string>('');

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storageUserId = localStorage.getItem('userId') ?? '';
    setUserId(storageUserId);

    const request = async () => {
      const res = await getMessageList(ApiUrl, {});
      setMessages((prev) => [...prev, ...res]);
    };
    request();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    const body: PostMessageBody = {
      message: text,
      ...(userId && { userId }),
    };
    const res = await postMessage(ApiUrl, body);

    if (!res) return;

    localStorage.setItem('userId', res.userId);
    setUserId(res.userId);
    setMessages((prev) => [...prev, res]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md h-screen flex flex-col bg-white shadow-lg">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.messageId}
              message={msg.message}
              isMe={userId === msg.userId}
            />
          ))}
          <div ref={bottomRef} />
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
