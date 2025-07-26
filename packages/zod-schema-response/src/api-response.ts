import { z } from 'zod';

import { failureResponseSchema } from './failure-response';
import { Message, StringifyMessage } from './serializer';
import {
  receiveSuccessResponseSchema,
  sendSuccessResponseSchema,
} from './success-response';

export const sendApiResponseSchema = z.discriminatedUnion('success', [
  failureResponseSchema,
  sendSuccessResponseSchema,
]);

export const receiveApiResponseSchema = z.discriminatedUnion('success', [
  failureResponseSchema,
  receiveSuccessResponseSchema,
]);

export type FailureResponse = z.infer<typeof failureResponseSchema>;

export type ReceiveApiResponse =
  | FailureResponse
  | { success: true; isArray: true; data: Message[] }
  | { success: true; isArray: false; data: Message };

export type SendApiResponse =
  | FailureResponse
  | { success: true; isArray: true; data: StringifyMessage[] }
  | { success: true; isArray: false; data: StringifyMessage };
