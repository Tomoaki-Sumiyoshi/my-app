import express from 'express';
import { getMessageList, postMessage } from '../controllers/messageControlleer';
import { validateBody, validateQuery } from '../middlewares/zodMiddleware';
import {
  GetMessageQuerySchema,
  PostMessageBodySchema,
} from '@packages/types/messages';

const router = express.Router();
router.get('/', validateQuery(GetMessageQuerySchema), getMessageList);
router.post('/', validateBody(PostMessageBodySchema), postMessage);

export default router;
