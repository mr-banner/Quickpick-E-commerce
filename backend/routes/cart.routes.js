import {Router} from "express"
import { addToCart,updateCart,getCart } from "../controllers/cart.controller.js"
import { authUser } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/add-cart").post(authUser,addToCart)
router.route("/update-cart").post(authUser,updateCart);
router.route("/get-cart").post(authUser,getCart)

export default router