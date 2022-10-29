import { Request, Response } from 'express';

import RandomWordService from '../services/RandomWord.Service';

export default {
  async sort(req: Request<{category: string}>, res: Response) {
    const { category } = req.params;

    try {
      const sortedList = await RandomWordService.getListWords(category);
      return res.status(200).json(sortedList);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
