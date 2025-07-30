const messageLimits = new Map<string, { count: number; last: number }>();
const MAX_MSG_PEG_SEC = 5;

export const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const entry = messageLimits.get(ip) || { count: 0, last: now };
  if (now - entry.last > 1000) {
    entry.count = 1;
    entry.last = now;
  } else {
    entry.count += 1;
  }
  messageLimits.set(ip, entry);
  return entry.count > MAX_MSG_PEG_SEC;
};
