import { Router } from 'express';

import RankingController from '../controller/RankingController';

const router = Router();

router.get('/', (RankingController.getRanking));

export default router;
