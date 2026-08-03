import { Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addVariant,
} from '../services/product.service';

export async function list(_req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al listar productos';
    return res.status(500).json({ error: message });
  }
}

export async function getOne(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await getProductById(id as string);
    return res.status(200).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al obtener producto';
    return res.status(404).json({ error: message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { name, description, imageUrl, categoryId } = req.body;

    if (!name || !description || !categoryId) {
      return res.status(400).json({ error: 'name, description y categoryId son obligatorios' });
    }

    const product = await createProduct({ name, description, imageUrl, categoryId });
    return res.status(201).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear producto';
    return res.status(400).json({ error: message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await updateProduct(id as string, req.body);
    return res.status(200).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar producto';
    return res.status(400).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteProduct(id as string);
    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar producto';
    return res.status(400).json({ error: message });
  }
}

export async function createVariant(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'name y price son obligatorios' });
    }

    const variant = await addVariant({
      name,
      price,
      stock: stock ?? 0,
      productId: id as string,
    });

    return res.status(201).json(variant);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear variante';
    return res.status(400).json({ error: message });
  }
}