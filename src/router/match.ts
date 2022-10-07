import { Router } from 'express';

import * as MatchController from '../controller/MatchController';

const router = Router();

router.post('/', (MatchController.createMatch));

router.get('/:id', MatchController.getMatchById);

router.get('/:name', MatchController.getMatchByName);

export default router;
