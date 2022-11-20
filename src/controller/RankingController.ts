import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import RankingService from '../services/Ranking.Service';

export default {
  async getRanking(req: Request, res:Response) {
    try {
      const { operator } = req.query as { operator: Prisma.SortOrder };
      const { page } = req.query as {page: any};
      const users = await RankingService.getRanking(operator, page);

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
