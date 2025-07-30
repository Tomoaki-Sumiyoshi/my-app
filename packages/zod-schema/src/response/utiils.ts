import { Message } from '@portfolio-chat/prisma-client';

import { errorMap } from '../error/index.js';
import {
  ReceiveMultipleApiResponse,
  receiveMultipleApiResponseSchema,
  ReceiveSingleApiResponse,
  receiveSingleApiResponseSchema,
  SendMultipleApiResponse,
  sendMultipleApiResponseSchema,
  SendSingleApiResponse,
  sendSingleApiResponseSchema,
} from './api-response.js';

export const makeSendSingleApiResponse = (
  message: Message
): SendSingleApiResponse => {
  const response: ReceiveSingleApiResponse = {
    success: true,
    data: message,
  };
  const result = sendSingleApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};

export const makeReceiveSingleApiResponse = (
  response: unknown
): ReceiveSingleApiResponse => {
  const result = receiveSingleApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};

export const makeSendMultipleApiResponse = (
  message: Message[]
): SendMultipleApiResponse => {
  const response: ReceiveMultipleApiResponse = {
    success: true,
    data: message,
  };
  const result = sendMultipleApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};

export const makeReceiveMultipleApiResponse = (
  response: unknown
): ReceiveMultipleApiResponse => {
  const result = receiveMultipleApiResponseSchema.safeParse(response);

  if (result.success) return result.data;

  return {
    success: false,
    error: errorMap.INVALID_TYPE,
  };
};
