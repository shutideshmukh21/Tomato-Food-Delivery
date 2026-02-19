import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

const url = "https://tomato-food-delivery-t0ls.onrender.com"
const [token , setToken] = useState("");
const [food_list,setFoodList] = useState([])

  //to add to the cart
  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      // first we spread all the entries in new object
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); // cartItem is objct{ 101 :1}
    } // when item of that id not found then we add it with value 1 // else we add in the prev value
    else {   
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token) {
      await axios.post(url +"/api/cart/add", {itemId}, {headers:{token}})
    }
  };

  //to remove from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url +"/api/cart/remove" , {itemId}, {headers:{token}});
    }
  };

  //load cart items 

  const loadCartData = async (token) =>{
    const response = await axios.get(url +"/api/cart/get",  {headers :{token}});
   setCartItems(response.data.cartData);

  } 

    
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId); //as cartItem stores quanity in its id as item
        //and we are accessing id from food_lidt as product._id ...
        // cartItem{item} to get quantity
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }

    return totalAmount;
  };

  const fetch_foodList = async()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data);
  }

  useEffect(()=>{
   
    async function loadData() {
      await fetch_foodList();
       if (localStorage.getItem("token")){
       setToken(localStorage.getItem("token"));
      
       await loadCartData(localStorage.getItem("token"));
    }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
    
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
