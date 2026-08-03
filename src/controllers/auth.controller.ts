import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos: name, email y password son obligatorios' });
    }

    const result = await registerUser({ name, email, password });

    return res.status(201).json(result);
  } catch (error) {
    console.error('ERROR COMPLETO:', error);
    const message = error instanceof Error ? error.message : 'Error al registrar usuario';
    return res.status(400).json({ error: message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos: email y password son obligatorios' });
    }

    const result = await loginUser({ email, password });

    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
    return res.status(401).json({ error: message });
  }
}