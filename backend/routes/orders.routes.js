import { Router } from 'express';
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateOrder,
  trackOrder,
  verifyRazorpay,
} from '../controllers/orders.controller.js';
import { adminAuth } from '../middleware/adminAuth.middleware.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = Router();

// 🔐 Admin Routes
router.post('/all-orders', adminAuth, allOrders);
router.post('/update-status', adminAuth, updateOrder);

// 💳 Payment Routes
router.post('/place-order', authUser, placeOrder);
router.post('/stripe', authUser, placeOrderStripe);
router.post('/razorpay', authUser, placeOrderRazorpay);
router.post('/verify-razorpay', authUser, verifyRazorpay);

// 👤 User Routes
router.post('/user-orders', authUser, userOrders);
router.get('/track-order/:orderId', authUser, trackOrder);

export default router;
