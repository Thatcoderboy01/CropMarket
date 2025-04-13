import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
