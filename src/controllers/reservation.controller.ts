import { Response } from 'express';
import {
  createReservation,
  getReservationsByUser,
  getAllReservations,
  updateReservationStatus,
} from '../services/reservation.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export async function create(req: AuthRequest, res: Response) {
  try {
    const { tableId, date, people } = req.body;

    if (!tableId || !date || !people) {
      return res.status(400).json({ error: 'tableId, date y people son obligatorios' });
    }

    const userId = req.user!.id;
    const reservation = await createReservation({ userId, tableId, date, people });
    return res.status(201).json(reservation);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear la reserva';
    return res.status(400).json({ error: message });
  }
}

export async function myReservations(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const reservations = await getReservationsByUser(userId);
    return res.status(200).json(reservations);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener reservas';
    return res.status(500).json({ error: message });
  }
}

export async function listAll(_req: AuthRequest, res: Response) {
  try {
    const reservations = await getAllReservations();
    return res.status(200).json(reservations);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar reservas';
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

    const reservation = await updateReservationStatus(id as string, status);
    return res.status(200).json(reservation);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar la reserva';
    return res.status(400).json({ error: message });
  }
}