import { z } from 'zod';

import { Message } from '@portfolio-chat/prisma-schema';

import { failureResponseSchema } from './failure-response.js';
import { StringifyMessage } from './serializer.js';
import {
  sendMultipleSuccessResponseSchema,
  sendSingleSuccessResponseSchema,
  receiveMultipleSuccessResponseSchema,
  receiveSingleSuccessResponseSchema,
} from './success-response.js';

export const sendMultipleApiResponseSchema = z.discriminatedUnion('success', [
  failureResponseSchema,
  sendMultipleSuccessResponseSchema,
]);

export const receiveMultipleApiResponseSchema = z.discriminatedUnion(
  'success',
  [failureResponseSchema, receiveMultipleSuccessResponseSchema]
);

export const sendSingleApiResponseSchema = z.discriminatedUnion('success', [
  failureResponseSchema,
  sendSingleSuccessResponseSchema,
]);

export const receiveSingleApiResponseSchema = z.discriminatedUnion('success', [
  failureResponseSchema,
  receiveSingleSuccessResponseSchema,
]);

export type FailureResponse = z.infer<typeof failureResponseSchema>;

export type ReceiveMultipleApiResponse =
  | FailureResponse
  | { success: true; data: Message[] };

export type SendMultipleApiResponse =
  | FailureResponse
  | { success: true; data: StringifyMessage[] };

export type ReceiveSingleApiResponse =
  | FailureResponse
  | { success: true; data: Message };

export type SendSingleApiResponse =
  | FailureResponse
  | { success: true; data: StringifyMessage };
