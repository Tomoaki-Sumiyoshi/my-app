import { errorMap } from 'zod-schema-error';

import {
  ReceiveApiResponse,
  receiveApiResponseSchema,
  SendApiResponse,
  sendApiResponseSchema,
} from './api-response';
import { Message } from './serializer';

export const makeSendApiResponse = (
  message: Message | Message[]
): SendApiResponse => {
  const response: ReceiveApiResponse = {
    success: true,
    data: message,
  };
  const result = sendApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};

export const makeReceiveApiResponse = (
  response: unknown
): ReceiveApiResponse => {
  const result = receiveApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};
