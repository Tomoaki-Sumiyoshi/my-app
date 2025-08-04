import fs from 'fs';

import { prisma } from '@portfolio-chat/prisma-client';
import { MessageBody, messageBodySchema } from '@portfolio-chat/zod-schema';

const main = async () => {
  const raw = fs.readFileSync('./src/messages.json', 'utf-8');
  const massages = messageBodySchema.array().safeParse(JSON.parse(raw));
  if (!massages.success) return;

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const insertMessages: MessageBody[] = massages.data.map(
    ({ content }, index) => {
      const createdAt = new Date(oneDayAgo.getTime() + index * 1000);

      return {
        content,
        createdAt,
      };
    }
  );

  await prisma.message.deleteMany();
  await prisma.message.createMany({
    data: insertMessages,
  });
};

main().finally(() => prisma.$disconnect());
