import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createNewItem = (name: string, description?: string) => {
  return prisma.item.create({
    data: {
      name,
      description,
    },
  });
};

export const findItems = () => {
  return prisma.item.findMany();
};

export const findItemById = (id: number) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

export const updateExistingItem = (id: number, data: any) => {
  return prisma.item.update({
    where: { id },
    data,
  });
};

export const removeItem = (id: number) => {
  return prisma.item.delete({
    where: { id },
  });
};
