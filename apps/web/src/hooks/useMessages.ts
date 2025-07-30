import {
  makeMessageQueryString,
  makeReceiveMultipleApiResponse,
} from '@portfolio-chat/zod-schema';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMessages = () => {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: async ({ pageParam = new Date() }) => {
      const query = makeMessageQueryString({
        beforeAt: pageParam,
        limit: 10,
      });
      const url = `/api/chat/messages?${query}`;
      const res = await fetch(url);
      const result = makeReceiveMultipleApiResponse(await res.json());

      return result.success ? result.data : [];
    },
    getNextPageParam: (lastPage) => lastPage[0]?.createdAt,
    initialPageParam: new Date(),
  });
};
