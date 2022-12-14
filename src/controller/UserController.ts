import { Request, Response } from 'express';

import { User } from '../schema/User';
import UserService from '../services/User.Service';

export async function whoami(req: Request, res: Response) {
  return res.json(req.user);
}

export async function updateUser(req: Request, res: Response) {
  const dataUpdate = req.body;
  const { id } = req.user as { id: number };

  if ((Object.keys(dataUpdate).length === 0 && dataUpdate.constructor === Object)) return res.send('Without data to update!');

  try {
    await UserService.updateUser(id, dataUpdate);

    return res.json(id);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await UserService.deleteUser(Number(id));

    return res.status(200).json({ message: 'User deleted!' });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getAll(req: Request, res: Response) {
  const users = await UserService.getAll();

  return res.json(users);
}

export async function createUser(req: Request<null, null, User>, res: Response) {
  const { username, email, password } = req.body;
  try {
    const user = await UserService.create({ username, email, password });
    return res.json(user);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
}

export async function findUserName(req: Request, res: Response) {
  const { username } = req.query as { username: string };

  const users = await UserService.getByUsername(username);

  return res.json(users);
}

export async function getUserByID(req: Request<{id: number}>, res: Response) {
  const { id } = req.params;
  try {
    const user = await UserService.getById(Number(id));
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
