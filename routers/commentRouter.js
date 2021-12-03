import { Router } from "express";
import commentController from "../controllers/commentController.js";

const commentRouter = Router()


commentRouter.get('/comments/:id', commentController.getComments)
commentRouter.patch('/comments/:id', commentController.updateComment)

export default commentRouter