import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  // check if category already exists
  const existingCategory = await prisma.category.findUnique({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: { name },
  });

  return category;
};

//  Get all categories
const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const CategoryService = {
  createCategory,
  getCategories
};
