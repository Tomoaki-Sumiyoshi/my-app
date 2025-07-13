import { Request, Response } from 'express';
import db from '../../db';
import {
  GetMessageQuery,
  GetMessageResponseSchema,
} from '@packages/types/messages';
import { sendJson } from '../../utils/sendJson';

export const getMessageList = async (
  req: Request<{}, {}, GetMessageQuery>,
  res: Response
) => {
  const { beforeAt, afterAt, limit } = req.query;

  let index = 1;
  const whereConditions: string[] = [];
  const values: any[] = [];

  if (beforeAt) {
    whereConditions.push(`created_at < $${index++}`);
    values.push(beforeAt);
  }

  if (afterAt) {
    whereConditions.push(`created_at > $${index++}`);
    values.push(afterAt);
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
  return sendJson(res, GetMessageResponseSchema, result.rows);
};
