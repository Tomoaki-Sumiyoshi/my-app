import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateBody = <T extends ZodSchema<any>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    req.body = result.data;
    next();
  };
};
