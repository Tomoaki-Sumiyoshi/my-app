export const shouldTriggerByLength = (
  messageList: string[],
  max: number = 10
): boolean => {
  const length = messageList.length;

  if (length <= 0) return false;
  if (length >= max) return true;

  const chance = length / max;

  return Math.random() < chance;
};
