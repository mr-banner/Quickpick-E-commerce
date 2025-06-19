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

router.route("/allOrders").post(adminAuth, allOrders);
router.route("/update-status").post(adminAuth, updateOrder);

//payment methods
router.route("/place-order").post(authUser, placeOrder);
router.route("/stripe").post(authUser, placeOrderStripe);
router.route("/razorpay").post(authUser, placeOrderRazorpay);
router.route("/verifyRazorpay").post(authUser,verifyRazorpay)

//user features
router.route("/userOrders").post(authUser, userOrders);
router.route("/trackOrder/:orderId").get(authUser, trackOrder);

export default router;
