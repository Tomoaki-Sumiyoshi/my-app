import { Request, Response } from 'express';

import { prisma } from '@portfolio-chat/prisma-schema';
import {
  errorMap,
  makeSendMultipleApiResponse,
  messageQuerySchema,
} from '@portfolio-chat/zod-schema';

export const getMessageList = async (req: Request, res: Response) => {
  const query = messageQuerySchema.safeParse(req.query);
  if (!query.success) {
    const error = errorMap.INVALID_TYPE;
    return res.status(error.status).json({ success: false, error });
  }

  const { beforeAt, afterAt, limit } = query.data;
  const messageList = await prisma.message.findMany({
    where: {
      createdAt: {
        lte: beforeAt,
        gte: afterAt,
      },
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const response = makeSendMultipleApiResponse(messageList);
  if (response.success) return res.status(200).json(response);

  return res.status(response.error.status).json(response);
};
