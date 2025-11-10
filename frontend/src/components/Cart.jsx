import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, loading, fetchCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart">
      {cart.cartItems.length === 0 ? (
        // Add a class name to the "empty" message
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          {cart.cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <p>{item.product.name} (x{item.quantity})</p>
              <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${cart.total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}