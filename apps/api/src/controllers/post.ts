import { Request, Response } from 'express';
import { prisma } from 'prisma-client';
import { getSafeMessageBody, messageBodySchema } from 'zod-schema-request';
import { makeSendApiResponse } from 'zod-schema-response';

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

  const response = makeSendApiResponse(message);
  if (response.success) return res.status(200).json(response);

  return res.status(response.error.status).json(response);
};
