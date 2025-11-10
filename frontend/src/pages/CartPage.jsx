import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, fetchCart } = useCart();

  // Fetch cart on page load
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <section className="cart-page-container">
      <h2>🛒 Your Cart</h2>
      <Cart />
      {cart.cartItems.length > 0 && (
        <div className="proceed-to-checkout">
          <Link to="/checkout" className="checkout-link-button">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </section>
  );
}