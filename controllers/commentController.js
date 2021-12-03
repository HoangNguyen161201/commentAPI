import commentModel from "../models/commentModel.js"
import errorAsync from '../middlewares/errorAsync.js'
import productModel from "../models/productModel.js"
import apiFeatures from "../utils/apiFeatures.js"

const commentController = {
    getComments: errorAsync(async (req, res, next)=> {
        const commentsApi = new apiFeatures(commentModel.find({product_id: req.params.id}), req.query).sort().pagination()
        const comments = await commentsApi.query
        res.json({comments})
    }),

    updateComment: errorAsync( async (req, res, next)=> {
        const data = {
            ...req.body,
            product_id: req.params.id
        }

        res.json({
            msg: 'thanh cong nha'
        })
    })
}

export default commentController