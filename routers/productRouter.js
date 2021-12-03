import productController from '../controllers/productController.js'
import {Router} from 'express'

const router = Router()

router.get('/products', productController.getProducts)
router.patch('/products/:id', productController.reviews)

export default router