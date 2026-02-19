import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ======================
// PLACE ORDER
// ======================
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    // Save order in MongoDB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: false,
      status: "Pending",
    });

    await newOrder.save();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    });

    // IMPORTANT: send BOTH IDs
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      mongoOrderId: newOrder._id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order creation failed" });
  }
};

// ======================
// VERIFY PAYMENT
// ======================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // MongoDB order ID
    } = req.body;

    // Create expected signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    // Signature mismatch
    if (expectedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Mark order as paid
    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Order Placed",
    });
    
    // Clear user cart
    await userModel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Payment verification error" });
  }
};

const userOrders = async (req, res)=>{

  try{
    const orders = await orderModel.find({userId: req.userId});
    res.json({success:true , data:orders});
  }
  catch(error){
    console.log(error);
    res.json({success : false, message : "Error"});
  }
}

// list Orders for admin
const listOrders = async(req, res)=>{
  try{
    const orders= await orderModel.find({});
    res.json({success: true, data: orders})
  }
  catch(error){
    res.json({success: false , })
  }}

  const updatestatus = async(req, res)=>{
    try{await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
  res.json({success: true,messagge: "Status Updated"})}
    catch(error){
  res.json({success: false, message :"Error"});
    }
  }


export { placeOrder, verifyPayment,userOrders,listOrders, updatestatus };
