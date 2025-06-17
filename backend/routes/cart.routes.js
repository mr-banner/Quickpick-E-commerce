import { Router } from 'express';
import { addToCart, updateCart, getCart } from '../controllers/cart.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/add-cart', authUser, addToCart);
router.post('/update-cart', authUser, updateCart);
router.post('/get-cart', authUser, getCart);

export default router;
