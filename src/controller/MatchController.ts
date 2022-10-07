import { Request, Response } from 'express';

import MatchService from '../services/Match.Service';

export async function createMatch(req: Request<{matchName:string}>, res: Response) {
  const { matchName } = req.body;
  try {
    const match = await MatchService.createMatch(matchName);
    return res.json(match).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getMatchById(req: Request<{id:number}>, res: Response) {
  const { id } = req.params;
  try {
    const match = await MatchService.getMatchByID(Number(id));
    return res.json(match);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getMatchByName(req: Request<{name:string}>, res: Response) {
  const { name } = req.params;
  try {
    const match = await MatchService.getMatchByName(name);
    return res.json(match).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
