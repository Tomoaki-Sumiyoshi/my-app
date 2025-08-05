import { Message } from '@portfolio-chat/prisma-schema';

import { useUserStore } from '../../store/userStore';

type Props = { message: Message };

export const MessageBubble = ({ message }: Props) => {
  const { userId } = useUserStore();
  const isMine = userId === message.userId;

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`rounded-x1 p-2 max-w-[60%] ${
          isMine ? 'bg-green-300' : message.isAi ? 'bg-red-300' : 'bg-white'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
