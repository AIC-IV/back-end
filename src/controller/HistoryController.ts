import { Request, Response } from 'express';

import HistoryService from '../services/History.Service';
import UserService from '../services/User.Service';


export async function createHistory(req: Request, res: Response) {
  const { userId, matchId, points, placement } = req.body;
  const history = await HistoryService.createHistory(userId, matchId, points, placement);
  await UserService.addPoints(userId, points);
  return res.json(history);
}

export async function getHistoryByID(req: Request, res: Response) {
    const { id } = req.params;
    const history = await HistoryService.getHistoryById(id);
    return res.json(history);
}

export async function getHistoryByUserID(req: Request, res: Response) {
    const { userId } = req.params;
    const history = await HistoryService.getHistoryByUserId(userId);
    return res.json(history);
}

export async function getHistoryByMatchID(req: Request, res: Response) {
    const { matchId } = req.params;
    const history = await HistoryService.getHistoryByMatchId(matchId);
    return res.json(history);
}

export async function updateHistory(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;
    const history = await HistoryService.updateHistory(id,data);
    return res.json(history);
}

export async function deleteHistory(req: Request, res: Response) {
    const { id } = req.params;
    const history = await HistoryService.deleteHistory(id);
    await UserService.removePoints(history.userId, history.points);
    return res.json(history);
}