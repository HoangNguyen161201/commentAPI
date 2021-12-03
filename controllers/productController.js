import productModel from "../models/productModel.js";
import errorAsync from "../middlewares/errorAsync.js";

const productController = {
    getProducts: errorAsync(async (req, res, next)=> {
        console.log('dfddf')
        const products = await productModel.find()
        res.json({products})
    }),
    
    reviews: errorAsync(async (req, res, next)=> {
        console.log(req.params.id)
        const {rating}= req.body

        if(rating && rating != 0) {
            const product = await productModel.findById(req.params.id)
            if(!product) {
                const error = new Error('product not exit')
                error.statusCode = 500
                return next(error)
            }

            let num = product.numberReview
            let rate = product.rating

            await productModel.findOneAndUpdate({_id: req.params.id}, {
                rating: rate + rating, numberReview: num + 1
            })

            res.json ({
                msg: 'update success'
            })
        }
    })
}

export default productController