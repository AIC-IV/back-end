import { Request, Response } from 'express';

import HistoryService from '../services/History.Service';
import MatchService from '../services/Match.Service';
import UserService from '../services/User.Service';

export async function createHistory(req: Request, res: Response) {
  const {
    userId, matchId, points, placement,
  } = req.body;

  if (await UserService.getById(userId) === null) {
    return res.status(400).json({ message: 'User not found' });
  }

  const match = await HistoryService.getHistoryById(matchId);

  if (match === null) {
    return res.status(400).json({ message: 'Match not found' });
  }

  const historyStatus = await MatchService.getMatchByID(match.id);
  if (historyStatus?.status === false) {
    return res.status(400).json({ message: 'Not possible change a closed match' });
  }

  try {
    const history = await HistoryService.createHistory(userId, matchId, points, placement);
    await UserService.addPoints(userId, points);
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getHistoryByID(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const history = await HistoryService.getHistoryById(Number(id));
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getHistoryByUserID(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const history = await HistoryService.getHistoryByUserId(Number(userId));
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getHistoryByMatchID(req: Request, res: Response) {
  const { matchId } = req.params;
  try {
    const history = await HistoryService.getHistoryByMatchId(Number(matchId));
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function updateHistory(req: Request, res: Response) {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const history = await HistoryService.updateHistory(Number(id), data);
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function deleteHistory(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const history = await HistoryService.deleteHistory(Number(id));
    await UserService.removePoints(history.userId, history.points);
    return res.json(history).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
