import { getStoredUserId, storeUserId } from '@app/libs/localStrage';
import { useEffect, useRef, useState } from 'react';

export const useUserId = () => {
  const [userId, setUserId] = useState<string>(getStoredUserId);
  const userIdRef = useRef<string>(userId);

  useEffect(() => {
    if (userId && userId !== userIdRef.current) {
      storeUserId(userId);
      userIdRef.current = userId;
    }
  }, [userId]);

  return [userId, setUserId] as const;
};
