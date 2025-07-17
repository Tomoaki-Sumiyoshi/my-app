export const getStoredUserId = (): string => {
  if (typeof window === 'undefined') return ''; // SSR対策
  return localStorage.getItem('userId') ?? '';
};
