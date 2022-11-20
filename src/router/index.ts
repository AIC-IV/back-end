import { Router } from 'express';

import user from './user';
import session from './session';
import report from './report';
import match from './match';
import history from './history';
import sort from './sort';
import ranking from './ranking';

const router = Router();

router.get('/', (_req, res) => res.send('Hello World! AIC-Game: Guess Drawing'));

router.use('/user', user);
router.use('/session', session);
router.use('/report', report);
router.use('/match', match);
router.use('/history', history);
router.use('/sort', sort);
router.use('/ranking', ranking);

export default router;
