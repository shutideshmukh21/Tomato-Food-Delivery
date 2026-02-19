import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register" , registerUser);

userRouter.post("/login",loginUser)

export default userRouter;
// routers are like collection of similaar types of routes using same prefixes 