import {Router} from "express"
import {createProduct, deleteProduct, getAllProducts, getSingleProduct} from "../controllers/product.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { adminAuth } from '../middleware/adminAuth.middleware.js';


const router = Router()

router.route("/addProduct").post(
    upload.fields([
        {
            name:"image1",
            maxCount:1
        },
        {
            name:"image2",
            maxCount:1
        },
        {
            name:"image3",
            maxCount:1
        },
        {
            name:"image4",
            maxCount:1
        }
    ]),
    adminAuth,
    createProduct
)
router.route("/getAllProducts").get(getAllProducts);
router.route("/deleteProduct/:id").delete(adminAuth,deleteProduct);
router.route("/getSingle").post(getSingleProduct);



export default router;