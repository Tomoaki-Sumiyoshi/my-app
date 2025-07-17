import { Response } from 'express';
import { ZodSchema } from 'zod';
import { SuccessResponseSchema, ErrorResponse } from '@packages/types/response';

export const sendJson = (
  res: Response,
  schema: ZodSchema,
  data: unknown,
  status: number = 200
) => {
  const parsed = SuccessResponseSchema(schema).safeParse({
    success: true,
    data,
  });

  if (!parsed.success) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: 'Invalid response structure',
      },
    };
    return res.status(500).json(errorResponse);
  }
  return res.status(status).json(parsed.data);
};
