import prisma from '../config/prisma';
import { CreateOrderInput, UpdateOrderStatusInput } from '../types/order.types';
import { getIO } from '../socket';

export async function createOrder(data: CreateOrderInput) {
  if (data.items.length === 0) {
    throw new Error('El pedido debe tener al menos un item');
  }

  return prisma.$transaction(async (tx) => {
    let total = 0;
    const itemsToCreate = [];

    for (const item of data.items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });

      if (!product || !product.active) {
        throw new Error(`Producto no encontrado o no disponible: ${item.productId}`);
      }

      let price = 0;

      if (item.variantId) {
        const variant = await tx.productVariant.findUnique({ where: { id: item.variantId } });

        if (!variant || variant.productId !== item.productId) {
          throw new Error(`Variante no válida para el producto ${item.productId}`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name} (${variant.name})`);
        }

        price = Number(variant.price);

        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        });
      } else {
        throw new Error(`Debe especificar una variante para el producto ${product.name}`);
      }

      total += price * item.quantity;

      itemsToCreate.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price,
      });
    }

    const order = await tx.order.create({
      data: {
        userId: data.userId,
        total,
        items: {
          create: itemsToCreate,
        },
      },
      include: {
        items: { include: { product: true, variant: true } },
      },
    });

    return order;
  });
}

export async function notifyStaffNewOrder(order: any) {
  getIO().to('staff').emit('order:created', order);
}

export async function getOrdersByUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true, variant: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      items: { include: { product: true, variant: true } },
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateOrderStatus(id: string, data: UpdateOrderStatusInput) {
  const order = await prisma.order.findUnique({ where: { id } });

  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: data.status },
  });

  getIO().to(`user:${updated.userId}`).emit('order:statusUpdated', updated);

  return updated;
}