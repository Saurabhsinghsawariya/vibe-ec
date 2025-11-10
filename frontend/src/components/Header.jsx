import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          <h1>🛍️ Vibe Commerce</h1>
        </Link>
        <Link to="/cart" className="cart-button-link">
          🛒 Cart ({itemCount})
        </Link>
      </div>
    </header>
  );
}