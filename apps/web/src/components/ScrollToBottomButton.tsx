import { useMessageStore } from '../store/messageStore';

type Props = { onClick: () => void };

export const ScrollToBottomButton = ({ onClick }: Props) => {
  const { isAtBottom } = useMessageStore();
  if (isAtBottom) return <></>;
  return (
    <button
      className="fixed bottom-20 right-6 bg-blue-500 text-white rounded-full p-2 shadow-lg animate-bounce"
      onClick={onClick}
    >
      ↓
    </button>
  );
};
