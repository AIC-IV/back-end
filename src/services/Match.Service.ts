import prisma from '../database';
import { Match } from '../schema/Match';

export default {
  async createMatch(name: string) {
    const match = await prisma.match.create({
      data: {
        name,
        status: true,
      },
    });

    return match;
  },

  async getMatchByID(id:number) {
    const match = await prisma.match.findUnique({
      where: {
        id,
      },
    });

    return match;
  },

  async getMatchByName(name: string) {
    const match = await prisma.match.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return match;
  },

};
