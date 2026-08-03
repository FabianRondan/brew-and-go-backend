import { Request, Response } from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../services/category.service';

export async function list(_req: Request, res: Response) {
  try {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar categorías';
    return res.status(500).json({ error: message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const category = await createCategory({ name });
    return res.status(201).json(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear categoría';
    return res.status(400).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteCategory(id as string);
    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar categoría';
    return res.status(400).json({ error: message });
  }
}