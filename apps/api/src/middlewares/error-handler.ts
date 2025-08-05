import { NextFunction, Request, Response } from 'express';

import { errorMap, FailureResponse } from '@portfolio-chat/zod-schema';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = errorMap.UNKNOWN;
  console.log(err);
  const response: FailureResponse = {
    success: false,
    error,
  };

  res.status(error.status).json(response);
};
