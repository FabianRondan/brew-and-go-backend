import { Request, Response } from 'express';
import { getAllTables, createTable } from '../services/table.service';

export async function list(_req: Request, res: Response) {
  try {
    const tables = await getAllTables();
    return res.status(200).json(tables);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar mesas';
    return res.status(500).json({ error: message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { number, capacity } = req.body;

    if (number === undefined || capacity === undefined) {
      return res.status(400).json({ error: 'number y capacity son obligatorios' });
    }

    const table = await createTable({ number, capacity });
    return res.status(201).json(table);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear mesa';
    return res.status(400).json({ error: message });
  }
}