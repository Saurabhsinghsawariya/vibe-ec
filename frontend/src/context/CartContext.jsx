import axios from 'axios';
import { createContext, useCallback, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data);
      setError(null); // Clear error on successful fetch
    } catch (_) {
      setError('Failed to fetch cart.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId, qty = 1) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/cart', { productId, qty });
      fetchCart(); // Refresh cart (will set loading to false)
    } catch (_) {
      setError('Failed to add item.');
      setLoading(false); // Manually stop loading on error
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/cart/${itemId}`);
      fetchCart(); // Refresh cart (will set loading to false)
    } catch (_) {
      setError('Failed to remove item.');
      setLoading(false); // Manually stop loading on error
    }
  };

  const checkout = async (userDetails) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/checkout', { userDetails });
      fetchCart(); // Clears cart (will set loading to false)
      return res.data; // Return the receipt
    } catch (_) {
      setError('Checkout failed. Please try again.');
      setLoading(false); // Manually stop loading on error
    }
  };

  // Calculate total number of items for the header badge
  const itemCount = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cart,
    loading,
    error,
    itemCount,
    fetchCart,
    addToCart,
    removeFromCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
