import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Contexts/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";


const PlaceOrder = () => {
  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    url,
    token,
    setCartItems,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: `${formData.firstName} ${formData.lastName}, ${formData.phone}, ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}`,
    };

    try {
      // Create order
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      const {
        razorpayOrderId,
        mongoOrderId,
        amount,
        key,
      } = response.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Food Delivery App",
        description: "Test Transaction",
        order_id: razorpayOrderId,

        handler: async function (response) {
          try {
            await axios.post(
              url + "/api/order/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: mongoOrderId,
              },
              { headers: { token } }
            );

            toast.success("Payment successful 🎉");
;
            setCartItems({});
            navigate("/", { replace: true });
          } catch (error) {
            console.error(error);
            toast.error("Payment verification failed. Please try again.");
;
          }
        },

        prefill: {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#ff6347",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function () {
        toast.error("Payment verification failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment verification failed. Please try again.");
    }
  };

  useEffect(()=>{if(!token){
    navigate('/');
    toast.error("Login to proceed");
  }

else if(getTotalCartAmount()===0){
  navigate('/');
}},[token])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" required />
          <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" required />
        </div>

        <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email address" required />
        <input name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" required />

        <div className="multi-fields">
          <input name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" required />
          <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input name="zip" value={formData.zip} onChange={onChangeHandler} placeholder="Zip code" required />
          <input name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" required />
        </div>

        <input name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Total</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() + 2}</b>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
