import prisma from '../database';
import { History } from '../schema/History';

/*
- delete history -> remember to delete points of User
*/

export default {
  // - create history -> related to userID and matchID
  async createHistory(userId: number, matchId: number, points: number, placement: number) {
    const history = await prisma.history.create({
      data: {
        matchId,
        userId,
        points,
        placement,
      },
    });
    return history;
  },

  // - get history by ID
  async getHistoryById(id:number) {
    const history = await prisma.history.findUnique({
      where: {
        id,
      },
    });

    return history;
  },
  // - get history by UserID
  async getHistoryByUserId(userId:number) {
    const history = await prisma.history.findMany({
      where: {
        userId,
      },
    });

    return history;
  },
  // - get history matchID
  async getHistoryByMatchId(matchId:number) {
    const history = await prisma.history.findMany({
      where: {
        matchId,
      },
    });
    return history;
  },

  async updateHistory(id: number, newDataHistory: Partial<History>) {
    const historyUpdate = await prisma.history.update({
      where: { id },
      data: newDataHistory,
    });

    return historyUpdate;
  },

  async deleteHistory(id: number) {
    const deletedHistory = await prisma.history.delete({
      where: { id },
    });

    return deletedHistory;
  },

};
