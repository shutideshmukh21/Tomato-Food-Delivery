import express from "express";
import { listOrders, placeOrder,updatestatus,verifyPayment } from "../controllers/orderController.js";
import authMiddleware from "../middleware/Auth.js";
import { userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', authMiddleware, verifyPayment);
orderRouter.post('/userorders', authMiddleware,userOrders);
orderRouter.get('/listorders', listOrders);
orderRouter.post('/updatestatus',updatestatus);

export default orderRouter;
