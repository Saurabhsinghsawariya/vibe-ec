const express = require('express');
const router = express.Router();

// Import models
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
    res.status(500).json({ message: err.message });
  }
});

// --- CART APIS ---

// GET /api/cart: Get cart + total
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);
    res.json({ cartItems, total: parseFloat(total.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart: Add {productId, qty}
router.post('/cart', async (req, res) => {
  const { productId, qty } = req.body;
  try {
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
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/cart/:id: Remove item
router.delete('/cart/:id', async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- CHECKOUT API ---

// POST /api/checkout: {cartItems} → mock receipt
router.post('/checkout', async (req, res) => {
  try {
    // In a real app, you'd process payment here
    // For this mock app, we just clear the cart and return a receipt

    const cartItems = await CartItem.find().populate('product');
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);

    // Clear the cart
    await CartItem.deleteMany({});

    // Return mock receipt
    res.json({
      message: 'Checkout Successful!',
      orderId: new Date().getTime(), // Mock order ID
      timestamp: new Date().toISOString(),
      total: parseFloat(total.toFixed(2)),
      items: cartItems
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;