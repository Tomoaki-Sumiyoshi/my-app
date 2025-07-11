import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateQuery = <T extends ZodSchema<any>>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    req.body = result.data;
    next();
  };
};
