import { Response } from 'express';
import { createOrder, getOrdersByUser, getAllOrders, updateOrderStatus } from '../services/order.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function create(req: AuthRequest, res: Response) {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Debe enviar al menos un item en el pedido' });
    }

    const userId = req.user!.id;

    const order = await createOrder({ userId, items });
    return res.status(201).json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear el pedido';
    return res.status(400).json({ error: message });
  }
}

export async function myOrders(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const orders = await getOrdersByUser(userId);
    return res.status(200).json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener pedidos';
    return res.status(500).json({ error: message });
  }
}

export async function listAll(_req: AuthRequest, res: Response) {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar pedidos';
    return res.status(500).json({ error: message });
  }
}

export async function updateStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'El status es obligatorio' });
    }

    const order = await updateOrderStatus(id as string, { status });
    return res.status(200).json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar el pedido';
    return res.status(400).json({ error: message });
  }
}