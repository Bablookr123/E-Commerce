import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {dummyProducts} from "../assets/assets"
export const AppContext = createContext(null);
import toast from 'react-hot-toast'

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // fetch all products data
  const fetchProducts = async () =>{
    setProducts(dummyProducts);
  };
  // add product to cart 
  const addToCart =(itemId) => {
    let cartData = structuredClone(CartItems);
    if(cartData[itemId]){
      cartData[itemId] +=1;
    }else{
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("added to Cart");
  }

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(CartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("cart updated");
  };

  // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in CartItems) {
      totalCount += CartItems[item];
    }
    return totalCount;
  };

  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in CartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (CartItems[items] > 0) {
        totalAmount += CartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

   // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(CartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("remove from cart");
      setCartItems(cartData);
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[]);
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    updateCartItem,
    cartCount,
    totalCartAmount,
    removeFromCart,
    CartItems,
    searchQuery,
    setSearchQuery,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
