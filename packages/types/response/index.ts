import { z } from 'zod';

export const SuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) => {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
  });
};

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
  }),
});

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => {
  return z.discriminatedUnion('success', [
    SuccessResponseSchema(dataSchema),
    ErrorResponseSchema,
  ]);
};

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
