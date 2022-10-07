import { Router } from 'express';

import * as HistoryController from '../controller/HistoryController';

const router = Router();

router.post('/', HistoryController.createHistory);

router.get('/id/:id', HistoryController.getHistoryByID);

router.get('/userid/:userid', HistoryController.getHistoryByUserID);

router.get('/matchid/:matchid', HistoryController.getHistoryByMatchID);

router.patch('/:id', HistoryController.updateHistory);

router.delete('/:id', HistoryController.deletedUser);

export default router;
