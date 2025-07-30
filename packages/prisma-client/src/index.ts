import { PrismaClient } from './generated/index.js';
import { Message } from './generated/index.js';

export type { Message };
export const prisma = new PrismaClient();
