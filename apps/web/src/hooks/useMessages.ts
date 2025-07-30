import { Message } from '@portfolio-chat/prisma-client';
import {
  makeMessageQueryString,
  makeReceiveMultipleApiResponse,
} from '@portfolio-chat/zod-schema';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

const queryFn = async (
  ctx: QueryFunctionContext<[string], Date>
): Promise<Message[]> => {
  const beforeAt = ctx.pageParam;
  const query = makeMessageQueryString({
    beforeAt,
    limit: 10,
  });
  const url = `api/chat/messages?${query}`;
  const res = await fetch(url);
  const result = makeReceiveMultipleApiResponse(await res.json());

  if (result.success) return result.data;
  return [];
};

export const useMessages = () => {
  return useInfiniteQuery<Message[], Error, Message[], [string], Date>({
    queryKey: ['messages'],
    queryFn,
    getNextPageParam: (lastPage) => lastPage[0]?.createdAt,
    initialPageParam: new Date(),
  });
};
