import express, { Router } from 'express';

import { getMessageList, postMessage } from '../controllers';

const router: Router = express.Router();
router.get('/', getMessageList);
router.post('/', postMessage);

export default router;
