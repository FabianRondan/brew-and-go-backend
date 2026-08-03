import prisma from '../config/prisma';
import { CreateReservationInput } from '../types/table.types';

const DURACION_RESERVA_MS = 2 * 60 * 60 * 1000; // 2 horas de duración estimada por reserva

export async function createReservation(data: CreateReservationInput) {
  const table = await prisma.table.findUnique({ where: { id: data.tableId } });

  if (!table) {
    throw new Error('Mesa no encontrada');
  }

  if (data.people > table.capacity) {
    throw new Error(`La mesa ${table.number} tiene capacidad para ${table.capacity} personas`);
  }

  const requestedDate = new Date(data.date);
  const rangeStart = new Date(requestedDate.getTime() - DURACION_RESERVA_MS);
  const rangeEnd = new Date(requestedDate.getTime() + DURACION_RESERVA_MS);

  const overlapping = await prisma.reservation.findFirst({
    where: {
      tableId: data.tableId,
      status: { in: ['PENDIENTE', 'CONFIRMADA'] },
      date: { gte: rangeStart, lte: rangeEnd },
    },
  });

  if (overlapping) {
    throw new Error('La mesa ya tiene una reserva cercana a ese horario');
  }

  return prisma.reservation.create({
    data: {
      userId: data.userId,
      tableId: data.tableId,
      date: requestedDate,
      people: data.people,
    },
  });
}

export async function getReservationsByUser(userId: string) {
  return prisma.reservation.findMany({
    where: { userId },
    include: { table: true },
    orderBy: { date: 'asc' },
  });
}

export async function getAllReservations() {
  return prisma.reservation.findMany({
    include: { table: true, user: { select: { id: true, name: true, email: true } } },
    orderBy: { date: 'asc' },
  });
}

export async function updateReservationStatus(id: string, status: string) {
  const reservation = await prisma.reservation.findUnique({ where: { id } });

  if (!reservation) {
    throw new Error('Reserva no encontrada');
  }

  return prisma.reservation.update({ where: { id }, data: { status: status as any } });
}