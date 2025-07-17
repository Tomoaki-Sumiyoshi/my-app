'use client';
import { useState, useRef, useEffect } from 'react';
import { ChatBubble, ChatInput, ChatScrollContainer } from './components/Chat';
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
      const res = await getMessageList(ApiUrl);
      if (res.success) {
        setMessages((prev) => [...prev, ...res.data]);
      }
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

    if (!res.success) return;
    if (userId !== res.data.userId) {
      localStorage.setItem('userId', res.data.userId);
      setUserId(res.data.userId);
    }
    setMessages((prev) => [...prev, res.data]);
  };

  const getOlderMessages = async () => {
    console.log('called');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md h-screen flex flex-col bg-white shadow-lg">
        <ChatScrollContainer onReachTop={getOlderMessages}>
          {messages.map((msg) => (
            <ChatBubble
              key={msg.messageId}
              message={msg.message}
              isMe={userId === msg.userId}
            />
          ))}
        </ChatScrollContainer>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
