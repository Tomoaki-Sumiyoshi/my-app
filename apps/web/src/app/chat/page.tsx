'use client';

import { ChatInput } from '../../components/ChatInput';
import { MessageList } from '../../components/MessageList';
import { MessageScrollArea } from '../../components/MessageScrollArea';
import { ScrollToBottomButton } from '../../components/ScrollToBottomButton';
import { useMessages } from '../../hooks/useMessages';
import { useScroll } from '../../hooks/useScroll';
import { useSocket } from '../../hooks/useSocket';

export default function ChatPage() {
  useSocket();
  const { data } = useMessages();
  const messages = data ?? [];
  const onScroll = useScroll();

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MessageScrollArea onScroll={onScroll}>
        <MessageList messages={messages} />
      </MessageScrollArea>
      <ScrollToBottomButton onClick={scrollToBottom} />
      <ChatInput />
    </div>
  );
}
