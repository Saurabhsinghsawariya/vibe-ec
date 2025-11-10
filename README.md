# Vibe Commerce E-commerce Application

A full-stack e-commerce application built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

- Product catalog with responsive grid layout
- Shopping cart functionality
- Checkout process with user details
- Order confirmation with receipt
- RESTful API backend
- MongoDB database integration
- Modern React with hooks and context
- Responsive design with CSS Grid

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- Vite for build tooling
- CSS with responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS support
- Environment variable configuration

## Project Structure

```
vibe-commerce-cart1/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── CartItem.js
│   ├── routes/
│   │   └── api.js
│   ├── package.json
│   ├── server.js
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── CheckoutSuccessPage.jsx
│   │   │   └── ProductsPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env
│   └── .gitignore
├── .gitattributes
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd vibe-commerce-cart1/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/vibe-commerce
   PORT=8000
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload:
   npx nodemon server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd vibe-commerce-cart1/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with your backend URL:
   ```
   VITE_API_URL=https://vibe-eccommerce-backend.onrender.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products

### Cart
- `GET /api/cart` - Get cart items and total
- `POST /api/cart` - Add item to cart (body: { productId, qty })
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout (body: { userDetails })

## Deployment

### Backend Deployment (Render)
1. Push backend code to GitHub
2. Connect to Render and deploy
3. Set environment variables in Render dashboard
4. Update frontend `.env` with deployed backend URL

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Ensure environment variables are set for production

## Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## Development

- Backend runs on `http://localhost:8000`
- Frontend runs on `http://localhost:5173` (Vite default)
- Frontend proxies API calls to backend during development

## License

MIT License
