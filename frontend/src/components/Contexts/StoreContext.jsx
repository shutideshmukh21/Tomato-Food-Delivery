import { createContext, useEffect } from "react";
import { food_list } from "../../assets/assets";
import { useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  //to add to the cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      // first we spread all the entries in new object
      setCartItems((prev) => ({ ...prev, [itemId]: 1 })); // cartItem is objct{ 101 :1}
    } // when item of that id not found then we add it with value 1 // else we add in the prev value
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  //to remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

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

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
    
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
