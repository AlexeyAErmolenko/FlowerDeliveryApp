import { Router } from 'express';

import flowersRouter from './flowers.js';

const router = Router();

router.use('/', flowersRouter);

export default router;
