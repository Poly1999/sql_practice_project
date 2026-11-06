import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from '../controllers/ordersController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

router.get('/orders', checkAuth, getOrders);
router.post('/orders', checkAuth, createOrder);
router.delete('/orders/:id', checkAuth, deleteOrder);
router.put('/orders/:id', checkAuth, updateOrder);

export default router;
