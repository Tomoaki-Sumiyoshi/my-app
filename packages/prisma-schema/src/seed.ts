import fs from 'fs';

import { prisma } from './index.js';

type RawMessages = {
  content: string;
};

const main = async () => {
  const raw = fs.readFileSync('./src/messages.json', 'utf-8');
  const massages: RawMessages[] = JSON.parse(raw);

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const insertMessages = massages.map(({ content }, index) => {
    const createdAt = new Date(oneDayAgo.getTime() + index * 1000);

    return {
      content,
      createdAt,
    };
  });

  await prisma.message.deleteMany();
  await prisma.message.createMany({
    data: insertMessages,
  });
};

main().finally(() => prisma.$disconnect());
