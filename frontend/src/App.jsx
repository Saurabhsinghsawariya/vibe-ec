import { Route, Routes } from 'react-router-dom';
import './App.css'; // <-- THIS IS THE MOST IMPORTANT LINE. IS IT THERE?

// Import New Components
import Header from './components/Header';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  
  return (
    <>
      <Header />

      {/* This <div> is the one that needs to be centered */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        </Routes>
      </div>

      <footer>
        © {new Date().getFullYear()} <strong>Vibe Commerce</strong> — All Rights Reserved.
      </footer>
    </>
  );
}

export default App;