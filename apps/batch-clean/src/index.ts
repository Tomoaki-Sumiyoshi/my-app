import cron from 'node-cron';

import { prisma } from '@portfolio-chat/prisma-schema';

const isDev = process.env.NODE_ENV !== 'production';
const expression = isDev ? '* * * * *' : '0 0 * * *';

cron.schedule(
  expression,
  () => {
    deleteOldRecords().finally(() => prisma.$disconnect());
  },
  { timezone: 'Asia/Tokyo' }
);

async function deleteOldRecords() {
  const now = new Date();

  // JST (UTC+9) の今日の0時を UTC に変換
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth(); // 0-indexed
  const utcDate = now.getUTCDate();

  // UTC の 15:00 が JST の 0:00 になる（夏時間考慮不要）
  const jstStartOfTodayUTC = new Date(
    Date.UTC(utcYear, utcMonth, utcDate - 1, 15, 0, 0)
  );

  const deleted = await prisma.message.deleteMany({
    where: {
      createdAt: {
        lt: jstStartOfTodayUTC,
      },
    },
  });

  console.log(`${deleted.count}件削除しました`);
}
