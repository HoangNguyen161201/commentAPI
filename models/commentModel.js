import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    username: String,
    content: String,
    product_id : String,
    rating: {
        type: Number,
        default: 0
    },
    reply: [{
        username: String,
        content: String,
        time: String
    }]
}, {timestamps: true})

export default mongoose.model('comments', commentSchema)