import { Router } from 'express';
import parkRouter from './park';

const router = Router();

router.use('/park', parkRouter);

export default router;
