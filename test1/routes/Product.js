import express from 'express';
import { body } from "express-validator";
import multer from "../middlewares/multer-config.js";
import { addOnceProduct, getAll, getProductById, putOnce,Deleteproduct, getProductCategories,getAllProducts, createOrders, getProductByVendor } from '../controllers/Product.js';


const router = express.Router();




router.route('/')
.get(getAllProducts);

router.route('/categories')
.get(getProductCategories);

router.route('/:id')
.get(getProductById)

router.route('/vendorproduct/:vendorId')
.get(getProductByVendor)

.delete(Deleteproduct)
.put(
    // multer("image", 5 * 1024 * 1024),
    // body("name").isLength({ min: 5 }),
    // body("price").isInt(),
    // body("quantity").isInt(),    
    // body("description").isLength({ min: 10 }),
    putOnce)


router.route('/venodrProduct/:vendorId')
.get(getAll)
.post(
    multer("image"),
//    body("name").isLength({ min: 5 }),
//    body("price").isInt(),
//    body("quantity").isInt(),    
//    body("description").isLength({ min: 10 }),
   addOnceProduct)
router.route('/venodrProduct/:vendorId/order')
.post(createOrders)

export default router;

