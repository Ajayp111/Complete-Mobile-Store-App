import { useState, useContext, createContext, useEffect } from "react";

// Creating a context for cart management
const CartContext = createContext();

// Creating a cart provider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // initializing it as an empty array

  // Fetching existing cart items from localStorage on component mount
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  // Providing cart state and setter through context to child components
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
