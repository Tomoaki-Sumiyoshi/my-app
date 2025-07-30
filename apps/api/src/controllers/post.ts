import { Request, Response } from 'express';

import { prisma } from '@portfolio-chat/prisma-client';
import {
  getSafeMessageBody,
  makeSendSingleApiResponse,
} from '@portfolio-chat/zod-schema';

export const postMessage = async (req: Request, res: Response) => {
  const body = getSafeMessageBody(req.body);
  if (!body.success) return res.status(body.error.status).json(body);

  const { userId, content } = body.data;
  const message = await prisma.message.create({
    data: {
      userId,
      content,
    },
  });

  const response = makeSendSingleApiResponse(message);
  if (response.success) return res.status(200).json(response);

  return res.status(response.error.status).json(response);
};
