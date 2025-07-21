export const storeUserId = (id: string): void => {
  if (typeof window === 'undefined') return; // SSR対策
  localStorage.setItem('userId', id);
};
