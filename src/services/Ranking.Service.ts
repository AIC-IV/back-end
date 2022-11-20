import { Prisma } from '@prisma/client';
import prisma from '../database';

export default {

  async getRanking(operator: Prisma.SortOrder = 'desc', page = 1) {
    const users = await prisma.users.findMany({
      skip: 10 * (page - 1),
      take: 10,
      orderBy: [
        { totalPoints: `${operator}` },
      ],
    });

    return users;
  },

};
