import { Request, Response } from 'express';
import db from '../../db';
import {
  PostMessageBody,
  PostMessageResponseSchema,
} from '@packages/types/messages';
import { sendJson } from '../../utils/sendJson';

export const postMessage = async (
  req: Request<{}, {}, PostMessageBody>,
  res: Response
) => {
  const { userId, message } = req.body;

  let index = 1;
  const columns: string[] = ['message'];
  const values: string[] = [message];
  const placeholder: string[] = [`$${index++}`];

  if (userId) {
    columns.push('user_id');
    values.push(userId);
    placeholder.push(`$${index++}`);
  }

  const query = `
    INSERT INTO messages (${columns.join(', ')})
    VALUES (${placeholder.join(', ')})
    RETURNING *;
  `;

  const result = await db.query(query, values);
  return sendJson(res, PostMessageResponseSchema, result.rows[0]);
};
