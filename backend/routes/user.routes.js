import {Router} from 'express';
import { adminLogin, loginUser, regiterUser } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(regiterUser);
router.route("/login").post(loginUser);
router.route("/admin").post(adminLogin);


export default router;