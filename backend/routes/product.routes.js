import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
} from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { adminAuth } from '../middleware/adminAuth.middleware.js';

const router = Router();

// 🆕 Add Product (Admin only)
router.post(
  '/add',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  adminAuth,
  createProduct
);

// 📦 Get All Products
router.get('/all', getAllProducts);

// 🔍 Get Single Product
router.post('/single', getSingleProduct);

// ❌ Delete Product (Admin only)
router.delete('/delete/:id', adminAuth, deleteProduct);

export default router;
