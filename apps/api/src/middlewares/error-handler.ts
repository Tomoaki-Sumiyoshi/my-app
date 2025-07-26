import { Request, Response, NextFunction } from 'express';
import { errorMap } from 'zod-schema-error';
import { FailureResponse } from 'zod-schema-response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = errorMap.UNKNOWN;
  const response: FailureResponse = {
    success: false,
    error,
  };

  res.status(error.status).json(response);
};
