import prisma from '../config/prisma';
import { CreateProductInput, UpdateProductInput, CreateVariantInput } from '../types/product.types';

export async function getAllProducts() {
  return prisma.product.findMany({
    where: { active: true },
    include: { category: true, variants: true },
    orderBy: { name: 'asc' },
  });
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, variants: true },
  });

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return product;
}

export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({ data });
}

export async function updateProduct(id: string, data: UpdateProductInput) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return prisma.product.update({ where: { id }, data: { active: false } });
}

export async function addVariant(data: CreateVariantInput) {
  const product = await prisma.product.findUnique({ where: { id: data.productId } });

  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return prisma.productVariant.create({ data });
}