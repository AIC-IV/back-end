import { Router } from 'express';

import user from './user';
import session from './session';
import report from './report';

const router = Router();

router.get('/', (_req, res) => res.send('Hello World! AIC-Game: Guess Drawing'));

router.use('/user', user);
router.use('/session', session);
router.use('/report', report);

export default router;
