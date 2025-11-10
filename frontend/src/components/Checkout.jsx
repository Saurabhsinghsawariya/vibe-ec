import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate(); 
  const { cart, checkout, loading, error } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    const receipt = await checkout({ name, email });
    
    if (receipt) {
      // On success, NAVIGATE to the new page
      navigate('/checkout-success', { state: { receipt } });
      
      setName('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <button 
        type="submit" 
        disabled={cart.cartItems.length === 0 || loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>

      {error && (
        <p className="checkout-error">{error}</p>
      )}
    </form>
  );
}