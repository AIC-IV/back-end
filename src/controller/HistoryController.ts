import { Request, Response } from 'express';

import HistoryService from '../services/History.Service';
import MatchService from '../services/Match.Service';
import UserService from '../services/User.Service';


async function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result);
  return result;
}
export async function createHistory(req: Request, res: Response) {

  const {results } = req.body;

  const name = await makeid(25);
  
  const fullmatch = await MatchService.createMatch(name);
  console.log(fullmatch);

  results.forEach(async (result: any) => {
    let { userId, points, placement } = result;
    if (await UserService.getById(userId) === null) {
      return res.status(400).json({ message: 'User not found' });
    }

    const match = await MatchService.getMatchByID(fullmatch.id);
    if (match === null) {
      return res.status(400).json({ message: 'Match not found' });
    }

    if (await HistoryService.sameUserInMatch(match.id, userId)) {
      return res.status(400).json({ message: 'User in the same match!' });
    }

  const historyStatus = await MatchService.getMatchByID(match.id);
  if (historyStatus?.status === false) {
    return res.status(400).json({ message: 'Not possible change a closed match' });
  }

  try {
    await HistoryService.createHistory(userId, fullmatch.id, points, placement);
    await UserService.addPoints(userId, points);

  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
  return res.status(200).json({ message: 'History created' });
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
