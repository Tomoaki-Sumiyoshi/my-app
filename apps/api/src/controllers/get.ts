import { Request, Response } from 'express';
import { prisma } from '@portfolio-chat/prisma-client';
import { errorMap } from 'zod-schema-error';
import { messageQuerySchema } from 'zod-schema-request';
import { makeSendApiResponse } from 'zod-schema-response';

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
        gte: beforeAt,
        lte: afterAt,
      },
    },
    take: limit,
    orderBy: {
      createdAt: 'asc',
    },
  });

  const response = makeSendApiResponse(messageList);
  if (response.success) return res.status(200).json(response);

  return res.status(response.error.status).json(response);
};
