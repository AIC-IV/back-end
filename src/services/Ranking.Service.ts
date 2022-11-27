import { Prisma } from '@prisma/client';
import prisma from '../database';

export default {

  async getRanking(operator: Prisma.SortOrder = 'desc', page = 1) {
    const users = await prisma.users.findMany({
      skip: 100 * (page - 1),
      take: 100,
      orderBy: [
        { totalPoints: `${operator}` },
      ],
    });

    return users;
  },

};
