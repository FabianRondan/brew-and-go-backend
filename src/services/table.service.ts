import prisma from '../config/prisma';
import { CreateTableInput } from '../types/table.types';

export async function getAllTables() {
  return prisma.table.findMany({ orderBy: { number: 'asc' } });
}

export async function createTable(data: CreateTableInput) {
  const existing = await prisma.table.findUnique({ where: { number: data.number } });

  if (existing) {
    throw new Error(`Ya existe una mesa con el número ${data.number}`);
  }

  return prisma.table.create({ data });
}