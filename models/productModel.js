import mongoose from 'mongoose'

const productModel = new mongoose.Schema({
    title: String,
    price: Number,
    images: mongoose.Schema.Types.Mixed,
    description: String,
    numberReview: Number,
    rating: Number
}, {timestamps: true})

export default mongoose.model('products', productModel)