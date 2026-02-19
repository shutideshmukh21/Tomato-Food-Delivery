import userModel from "../models/userModel.js";

const addtoCart = async (req, res) => {
  try {
    //  userId must come from auth middleware
    let userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    //heer carDtaa is an obj ..bt using . we can access fixed attrbutes ...bt using [] we can access variable attribute s
    //here itemId is accessed through axios from frontend 

    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    // ❌ was req.body.userId
    let userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User Not Found" });
    }

    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      //return added (to avoid double response)
      return res.json({
        success: true,
        message: "This item is not present in cart",
      });
    } else if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    // ❌ was req.body.userId
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


const getCart = async (req, res) => {
  try {
    // ❌ was req.body.userId
    let userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addtoCart, removeFromCart, getCart };
