import { Link, Navigate, useLocation } from 'react-router-dom';

// We reuse the modal's CSS classes, which is why it looks so similar
export default function CheckoutSuccessPage() {
  const { state } = useLocation();
  const { receipt } = state || {};

  // If someone lands on this page without receipt data, send them home
  if (!receipt) {
    return <Navigate to="/" replace />;
  }

  return (
    // We use the modal's class for styling, but it's a full page
    <div className="modal-content" style={{ margin: '2rem auto' }}>
      <div className="modal-icon success-icon">
        <span className="success-checkmark">✔</span>
      </div>

      <h2>{receipt.message}</h2>

      <div className="order-metadata">
        <p><strong>Order ID:</strong> {receipt.orderId}</p>
        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
      </div>

      <h4 className="item-list-title">Items Purchased:</h4>
      <ul className="receipt-item-list">
        {receipt.items.map(item => (
          <li key={item._id} className="receipt-item">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="receipt-total">
        <h3>Total Paid: Dos <span>${receipt.total.toFixed(2)}</span></h3>
      </div>

      {/* This now links back to the homepage */}
      <Link to="/" className="button-link">
        Continue Shopping
      </Link>
    </div>
  );
}