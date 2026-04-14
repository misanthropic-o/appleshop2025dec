import { createContext, useState, useContext, useEffect, useCallback, useRef } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const isInitialized = useRef(false);

  useEffect(() => {

    if (!isInitialized.current) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCartItems(parsed);
          console.log("Loaded cart from localStorage:", parsed);
        } catch (e) {
          console.log("Error parsing cart data:", e);
          localStorage.removeItem("cart");
        }
      }
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {

    if (isInitialized.current) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Saved cart to localStorage:", cartItems);
    }
  }, [cartItems]);

  const addToCart = useCallback((item) => {
    console.log("addToCart called with:", item);
    setCartItems((prev) => {
      const newItem = { ...item, id: Date.now() + Math.random() };
      const newCart = [...prev, newItem];
      console.log("Previous cart items:", prev);
      console.log("New cart items after add:", newCart);
      console.log("Cart items count:", newCart.length);
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    console.log("Removing from cart:", id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    console.log("Clearing cart");
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const priceStr = item.price.replace(/\s/g, "").replace("₽", "").replace("руб.", "").trim();
      const price = parseFloat(priceStr) || 0;
      return total + price;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

