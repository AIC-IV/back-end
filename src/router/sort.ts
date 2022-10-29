import { Router } from 'express';

import RandomWords from '../controller/RandomWords';

const router = Router();

router.get('/:category', RandomWords.sort);

export default router;
