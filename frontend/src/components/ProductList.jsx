import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
    };
    getProducts();
  }, []);

  // --- THIS IS THE FIX ---
  // You must have this <div> with the className "product-grid"
  // wrapping your product items.
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product._id} className="product-item">
          <div>
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <button onClick={() => addToCart(product._id, 1)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}