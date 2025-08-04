import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMessages } from '../libs/api-messages';

export const useInfiniteMessages = () => {
  return useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: async ({ pageParam }) => {
      const result = await fetchMessages({
        beforeAt: pageParam,
        limit: 20,
      });
      return result;
    },
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.createdAt,
    initialPageParam: new Date(),
  });
};
