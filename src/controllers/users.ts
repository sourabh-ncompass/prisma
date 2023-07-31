import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = +id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      user,
    });
  } catch (e: any) {
    next(e);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    if (!users.length) {
      return res.json({
        message: "No users found",
      });
    }
    res.json({
      users,
    });
  } catch (e: any) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, email } = req.body;
    const user = await prisma.user.create({ data: { userName, email } });
    res.json({
      message: "user created",
      id: user.id,
    });
  } catch (e: any) {
    console.log(e);
    next(e);
  }
};

const createMultipleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usersData } = req.body;
    const createdUsers = await prisma.user.createMany({
      data: usersData,
    });

    res.json({
      message: "Multiple users created",
      users: createdUsers,
    });
  } catch (e: any) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = +id;
    const { userName, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { userName, email },
    });
    res.json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (e: any) {
    next(e);
  }
};

const updateMultipleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usersData } = req.body;
    const updatedUsers = await Promise.all(
      usersData.map(async (user: any) => {
        const { id, userName, email } = user;
        const updatedUser = await prisma.user.update({
          where: { id: id },
          data: { userName, email },
        });
        return updatedUser;
      })
    );

    res.json({
      message: "Multiple users updated",
      users: updatedUsers,
    });
  } catch (e: any) {
    next(e);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = +id;
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({
      message: "User deleted",
    });
  } catch (e: any) {
    next(e);
  }
};

const deleteMultipleUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userIds } = req.body;

    await prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    res.json({
      message: "Multiple users deleted",
    });
  } catch (e: any) {
    next(e);
  }
};

export {
  getUsers,
  create,
  getUser,
  update,
  remove,
  createMultipleUsers,
  updateMultipleUsers,
  deleteMultipleUsers,
};
