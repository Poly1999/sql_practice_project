import 'dotenv/config';
import type { Response } from 'express';
import { pool } from '../db.js';
import type { AuthRequest } from '../middlewares/checkAuth.js';

export const getOrders = async (req: AuthRequest, res: Response) => {
  const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [
    req.userId,
  ]);
  res.status(200).json(result.rows);
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { item } = req.body;

  const result = await pool.query(
    'INSERT INTO orders (item, user_id) VALUES ($1, $2) RETURNING *',
    [item, req.userId],
  );
  res.status(201).json(result.rows[0]);
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const result = await pool.query(
    'DELETE FROM orders WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, req.userId],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({ message: 'Order deleted' });
};
export const updateOrder = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { item } = req.body;

  const result = await pool.query(
    'UPDATE orders SET item = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [item, id, req.userId],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(result.rows[0]);
};
