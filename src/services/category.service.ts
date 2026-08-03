import prisma from '../config/prisma';
import { CreateCategoryInput } from '../types/product.types';

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { products: true },
  });
}

export async function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({ data });
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  return prisma.category.delete({ where: { id } });
}