const express = require('express');
const router = express.Router();

// Import models
// NOTE: Assuming model file names are 'Product.js' and 'CartItem.js' (Capitalized)
const Product = require('../models/Product');
const CartItem = require('../models/CartItem');

// --- PRODUCT API ---

// GET /api/products: Get all products
// We'll also seed mock data here if DB is empty
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      // Seed mock data
      const mockProducts = [
        { name: 'Vibe T-Shirt', price: 24.99 },
        { name: 'Vibe Hoodie', price: 49.99 },
        { name: 'Vibe Cap', price: 19.99 },
        { name: 'Vibe Stickers', price: 4.99 },
        { name: 'Vibe Water Bottle', price: 14.99 },
      ];
      products = await Product.insertMany(mockProducts);
    }
    res.json(products);
  } catch (err) {
    // 500 status on database/server error
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error fetching products: ' + err.message });
  }
});

// --- CART APIS ---

// GET /api/cart: Get cart + total
router.get('/cart', async (req, res) => {
  try {
    // Populate the 'product' field to get price/name
    const cartItems = await CartItem.find().populate('product');
    
    // Calculate total from populated data
    const total = cartItems.reduce((acc, item) => {
      // Check if product data is available before calculating
      if (item.product) {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
    
    res.json({ 
      cartItems: cartItems.filter(item => item.product), // Filter out items with missing product data
      total: parseFloat(total.toFixed(2)) 
    });
  } catch (err) {
    console.error('Error fetching cart:', err.message);
    res.status(500).json({ message: 'Server error fetching cart: ' + err.message });
  }
});

// POST /api/cart: Add {productId, qty}
router.post('/cart', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || typeof qty !== 'number' || qty < 1) {
      return res.status(400).json({ message: 'Invalid product ID or quantity.' });
  }

  try {
    // Ensure the product exists before adding to cart (Good practice)
    const productExists = await Product.findById(productId);
    if (!productExists) {
        return res.status(404).json({ message: 'Product not found.' });
    }
      
    // Check if item is already in cart
    let existingItem = await CartItem.findOne({ product: productId });

    if (existingItem) {
      // Update quantity
      existingItem.quantity = existingItem.quantity + qty;
      await existingItem.save();
      res.json(existingItem);
    } else {
      // Create new cart item
      const newItem = new CartItem({
        product: productId,
        quantity: qty
      });
      await newItem.save();
      res.json(newItem);
    }
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ message: 'Server error adding item to cart: ' + err.message });
  }
});

// DELETE /api/cart/:id: Remove item
router.delete('/cart/:id', async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed successfully' });
  } catch (err) {
    console.error('Error deleting from cart:', err.message);
    res.status(500).json({ message: 'Server error removing item: ' + err.message });
  }
});

// --- CHECKOUT API ---

// POST /api/checkout: {cartItems} → mock receipt
router.post('/checkout', async (req, res) => {
  try {
    // Calculate final total based on current cart
    const cartItems = await CartItem.find().populate('product');
    
    if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty. Nothing to checkout.' });
    }
    
    const total = cartItems.reduce((acc, item) => {
      if (item.product) {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);

    // Clear the cart
    await CartItem.deleteMany({});

    // Return mock receipt
    res.json({
      message: 'Checkout Successful!',
      orderId: new Date().getTime(),
      timestamp: new Date().toISOString(),
      total: parseFloat(total.toFixed(2)),
      items: cartItems.filter(item => item.product) // Filter for valid products
    });

  } catch (err) {
    console.error('Error during checkout:', err.message);
    res.status(500).json({ message: 'Server error during checkout: ' + err.message });
  }
});

module.exports = router;