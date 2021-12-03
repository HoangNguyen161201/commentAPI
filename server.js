import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import productRouter from './routers/productRouter.js'
import commentRouter from './routers/commentRouter.js'
import checkError from './middlewares/error.js'
import commentModel from './models/commentModel.js'
dotenv.config()

// create socket server
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        // 
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
      }
})

// connect mongoode
mongoose.connect('mongodb+srv://admin3:kingspear1999@cluster0.trnqb.mongodb.net/commentDB?retryWrites=true&w=majority').then(result=> {
    console.log(' quanggoang connect sucess hhh')
}).catch(error => {
    console.log('connect false')
})

// connect to io

let users = []

io.on('connection', socket=> {
    console.log(socket.id + 'connect success')
    io.on('disconnect', ()=> {
        console.log(socket.id + "disconnected ")
    })

    socket.on('createComment', async data=> {
            if(data.reply){
                const comment = await commentModel.findById(data.comment_id)
                const replyData = [...comment.reply, data]
                comment.reply = replyData
                await comment.save()
                console.log(comment)
                io.to(data.product_id).emit('sendReply', comment)

            }else {
                const newComment = new commentModel(data)
                await newComment.save()
        
                io.to(data.product_id).emit('sendNewComment', newComment)

            }
       
    })

    socket.on('joinRoom', id=> {
        const user = {
            userId: socket.id,
            room: id
        }
        const check = users.every(user => user.userId !== socket.id)

        if(check){
            users.push(user)
            socket.join(user.room)
        } else {
            users.map(user=> {
                if(user.userId === socket.id){
                    if(user.room !== id){
                        socket.leave(user.room)
                        socket.join(id)
                        user.room = id
                    }
                }
            })
        }

    })
})

app.get('/', (req, res)=> {
    res.send('hello everyone')
})
app.use('/api', productRouter)
app.use('/api', commentRouter )
app.use(checkError)

// listen server
server.listen(process.env.PORT || 4000, ()=> {
    console.log('http://localhost:4000')
})