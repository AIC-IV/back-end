import { Router } from 'express';

import * as HistoryController from '../controller/HistoryController';

const router = Router();

router.post('/', HistoryController.createHistory);

router.get('/id/:id', HistoryController.getHistoryByID);

router.get('/userid/:userId', HistoryController.getHistoryByUserID);

router.get('/matchid/:matchId', HistoryController.getHistoryByMatchID);

router.patch('/:id', HistoryController.updateHistory);

router.delete('/:id', HistoryController.deleteHistory);

export default router;
