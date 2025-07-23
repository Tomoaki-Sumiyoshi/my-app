'use client';
import {
  ChatScrollContainer,
  ChatInput,
  ChatBubbleList,
} from './components/Chat';
import { useMessages } from '@web/app/hooks/useMessages';

export default function Home() {
  const { messages, userId, sendNewMessage, scrollRef } = useMessages();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md md:max-w-2xl h-screen flex flex-col bg-white shadow-lg">
        <ChatScrollContainer scrollRef={scrollRef}>
          <ChatBubbleList messages={messages} userId={userId} />
        </ChatScrollContainer>
        <ChatInput onSend={sendNewMessage} />
      </div>
    </div>
  );
}
