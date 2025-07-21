import express from 'express';
import { getMessageList, postMessage } from '../controllers/messageControlleer';
import { validateBody, validateQuery } from '../middlewares/zodMiddleware';
import {
  GetMessageServerQuerySchema,
  PostMessageBodySchema,
} from '@packages/types/messages';

const router = express.Router();
router.get('/', validateQuery(GetMessageServerQuerySchema), getMessageList);
router.post('/', validateBody(PostMessageBodySchema), postMessage);

export default router;
