import { InitializeProvider } from '../../components/provider/InitializeProvider';
import { ChatInput } from '../../components/ui/ChatInput';
import { MessageList } from '../../components/ui/MessageList';
import { MessageScrollContainer } from '../../components/ui/MessageScrollContainer';
import { ScrollToBottomButton } from '../../components/ui/ScrollToBottomButton';

export default function ChatPage() {
  return (
    <InitializeProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <MessageScrollContainer>
          <MessageList />
        </MessageScrollContainer>
        <ScrollToBottomButton />
        <ChatInput />
      </div>
    </InitializeProvider>
  );
}
