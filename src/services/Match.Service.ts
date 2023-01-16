import { Match } from '@prisma/client';
import prisma from '../database';

export default {
  async createMatch(name: string){
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

  async updateMatch(id: number, newDataMatch: Partial<Match>) {
    const matchUpdated = await prisma.match.update({
      where: { id },
      data: newDataMatch,
    });
    return matchUpdated;
  },
};
