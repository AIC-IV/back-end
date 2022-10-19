import { Router } from 'express';

import * as MatchController from '../controller/MatchController';

const router = Router();

router.post('/', (MatchController.createMatch));

router.get('/id/:id', MatchController.getMatchById);

router.get('/name/:name', MatchController.getMatchByName);

router.post('/update/:id', MatchController.updateMatchById);

export default router;
