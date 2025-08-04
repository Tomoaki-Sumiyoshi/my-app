import { PrismaClient } from '@prisma/client';
import { Message } from '@prisma/client';

export type { Message };
export const prisma = new PrismaClient();
