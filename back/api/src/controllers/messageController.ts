import { Request, Response } from 'express';
import db from '../db/pool';
import {
  GetMessageQuery,
  CreateMessageInput,
  MessageResponseSchema,
  MessageListResponseSchema,
} from '../shemas/messageSchema';

export const getMessage = async (
  req: Request<{}, {}, GetMessageQuery>,
  res: Response
) => {
  const { before_at, after_at, limit } = req.query;

  let index = 1;
  const whereConditions: string[] = [];
  const values: any[] = [];

  if (before_at) {
    whereConditions.push(`created_at < $${index++}`);
    values.push(before_at);
  }

  if (after_at) {
    whereConditions.push(`created_at > $${index++}`);
    values.push(after_at);
  }

  let limitClause = '';
  if (limit) {
    limitClause = `LIMIT $${index++}`;
    values.push(limit);
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND')}` : '';

  const query = `
    SELECT 
      * 
    FROM 
      messages
    ${whereClause}
    ORDER BY created_at ASC
    ${limitClause}
  `;

  const result = await db.query(query, values);
  const parsed = MessageListResponseSchema.safeParse(result.rows);

  if (!parsed.success) {
    return res.status(500).json({ error: 'Invalid response data' });
  }

  res.json(parsed.data);
};

export const createMessage = async (
  req: Request<{}, {}, CreateMessageInput>,
  res: Response
) => {
  const { user_id, message } = req.body;

  let index = 1;
  const columns: string[] = ['message'];
  const values: string[] = [message];
  const placeholder: string[] = [`$${index++}`];

  if (user_id) {
    columns.push('user_id');
    values.push(user_id);
    placeholder.push(`$${index++}`);
  }

  const query = `
    INSERT INTO messages (${columns.join(', ')})
    VALUES (${placeholder.join(', ')})
    RETURNING *;
  `;

  const result = await db.query(query, values);
  const parsed = MessageResponseSchema.safeParse(result.rows[0]);

  if (!parsed.success) {
    return res.status(500).json({ error: 'Invalid response data' });
  }

  res.json(parsed.data);
};
