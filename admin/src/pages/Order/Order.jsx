import React from 'react'
import './Order.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import { useEffect } from 'react'
import { assets } from "../../assets/assets.js";
const Order = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async ()=>{
   const response = await axios.get(url+"/api/order/listorders");
   if(response.data.success)
   {
    setOrders(response.data.data);
    console.log(response.data.data);
   }
   else {
     toast.error("Error");
   }
  }

  const updateStatusfn =async (e, Id)=>{
  
    let newStatus = e.target.value;
const response = await axios.post(url+"/api/order/updatestatus",{orderId : Id , status: newStatus} );
if(response.data.success){
  toast.success("Status Updated Successfully");
  fetchAllOrders();
}
else{
  toast.error("Error");
}

   
  }

  useEffect(()=>{
  fetchAllOrders();  
  }, [])

  return (
  <div className="order-container">
    <h3>Order Page</h3>
    <div className="order-list">
      {
        orders.map((order,index)=>(
          <div key ={index} className="order-item">
            <img src={assets.parcel_icon} alt = "" />
              <p className="order-item-food">
                {order.items.map((item, index)=>{
                  if(index === order.items.length-1){
                 return item.name + " x "+item.quantity
                  }
                  else{
                         return item.name + " x "+item.quantity+", "
                  }
                })}

              </p>
              <div className="order-item-address">{order.address}</div>
              <p>Items: {order.items.length}</p> 
              <p>${order.amount}</p>
              <p>{order.status}</p>
              <select
                value = {order.status}
                onChange ={(e)=>updateStatusfn(e,order._id)}>
                <option value ="Food processing">Food Processing</option>

                <option value ="Out for Delivery">Out of delivery</option>
                <option value ="Delivered">Delivered</option>

              </select>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default Order
