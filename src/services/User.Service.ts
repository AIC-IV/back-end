import bcrypt from 'bcrypt';

import prisma from '../database';
import { User } from '../schema/User';

export default {

  async getById(id: number) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  },

  async getByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  },

  async getByUsername(username: string) {
    const users = await prisma.users.findMany({
      where: {
        username: {
          contains: username,
        },
      },
    });

    return users;
  },

  async getAll() {
    const users = await prisma.users.findMany({
      include: {
        Reports: true,
      },
    });

    return users;
  },

  async deleteUser(id: number) {
    const deletedUser = await prisma.users.delete({
      where: { id },
    });

    return deletedUser;
  },

  async updateUser(id: number, newDataUser: Partial<User>) {
    const userUpdate = await prisma.users.update({
      where: { id },
      data: newDataUser,
    });

    return userUpdate;
  },

  async create({ username, email, password }: User) {
    const existedUser = await this.getByEmail(email);
    if (existedUser) throw Error('Email already exists');

    const salt = await bcrypt.genSalt(+(process.env.SALT_ROUNDS || 10));
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return user;
  },

  async addPoints(id: number, points: number) {
    const user = await prisma.users.update({
      where: { id },
      data: {
        totalPoints: {
          increment: points,
        },
      },
    });

    return user;
  },

  async removePoints(id: number, points: number) {
    const user = await prisma.users.update({
      where: { id },
      data: {
        totalPoints: {
          decrement: points,
        },
      },
    });

    return user;
  },
};
