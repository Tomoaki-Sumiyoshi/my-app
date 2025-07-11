import express from 'express';
import { createMessage, getMessage } from '../controllers/messageController';
import { validateBody } from '../middlewares/validateBody';
import {
  getMessageQuerySchema,
  createMessageSchema,
} from '../shemas/messageSchema';
import { validateQuery } from '../middlewares/validateQuery';

const router = express.Router();
router.get('/', validateQuery(getMessageQuerySchema), getMessage);
router.post('/', validateBody(createMessageSchema), createMessage);

export default router;
