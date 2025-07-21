import { Request, Response, NextFunction } from 'express';
import { ErrorResponseSchema } from '@packages/types/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = {
    success: false,
    error: { code: 500, message: 'Internal Server Error' },
  };

  res.status(500).json(ErrorResponseSchema.parse(response));
};
