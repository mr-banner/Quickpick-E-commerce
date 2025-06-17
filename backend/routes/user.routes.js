import { Router } from 'express';
import {
  adminLogin,
  loginUser,
  registerUser, // ✅ Fixed typo
} from '../controllers/user.controller.js';

const router = Router();

// 🧑 Register a new user
router.post('/register', registerUser);

// 🔐 User login
router.post('/login', loginUser);

// 🛡️ Admin login
router.post('/admin/login', adminLogin);

export default router;
