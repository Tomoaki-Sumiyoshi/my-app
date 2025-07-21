import db from '../db';
import { PostMessageResponseSchema } from '@packages/types/messages';

export const insertMessage = async (params: string) => {
  const query = `
    INSERT INTO messages (message, is_ai)
    VALUES ($1, true)
    RETURNING *;
  `;

  const result = await db.query(query, [params]);
  const parsed = PostMessageResponseSchema.safeParse(result.rows[0]);

  return parsed.success ? parsed.data.userId : '';
};
