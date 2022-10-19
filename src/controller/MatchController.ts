import { Request, Response } from 'express';

import MatchService from '../services/Match.Service';

export async function createMatch(req: Request<{matchName:string}>, res: Response) {
  const { matchName } = req.body;

  if (((await MatchService.getMatchByName(matchName)).length) >= 1) {
    return res.status(400).json({ message: 'Match with this name already exist!' });
  }

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

export async function updateMatchById(req: Request, res: Response) {
  const id = req.params;
  const dataUpdate = req.body;
  try {
    const updatedMatch = await MatchService.updateMatch(Number(id.id), dataUpdate);
    return res.json(updatedMatch).status(200);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
