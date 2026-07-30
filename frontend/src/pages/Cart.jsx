import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaTrashAlt, FaShoppingCart, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const totalAmount = getCartTotal();
  const discountAmount = Math.round(totalAmount * 0.18); // Simulated 18% savings

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/cart');
      return;
    }
    // Simulate order placement for College Evaluation Demo
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/orders');
    }, 2200);
  };

  if (orderSuccess) {
    return (
      <div className="bg-white p-5 rounded-3 shadow text-center border my-5 max-w-lg mx-auto">
        <FaCheckCircle className="text-success display-1 mb-3" />
        <h3 className="fw-bold mb-2">Order Placed Successfully! 🎉</h3>
        <p className="text-secondary small mb-4">
          Thank you for shopping with <strong>BS3 Electronics</strong>. Your college demo order has been confirmed and is being processed!
        </p>
        <span className="spinner-border spinner-border-sm text-primary me-2"></span>
        <span className="small text-muted">Redirecting to My Orders page...</span>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <FaShoppingCart className="text-primary" /> Shopping Cart ({cartItems.length})
      </h3>

      {cartItems.length === 0 ? (
        <div className="bg-white p-5 rounded-3 shadow-sm text-center border my-5">
          <FaShoppingCart className="text-muted fs-1 mb-3" />
          <h5 className="fw-bold mb-2">Your Cart is Empty</h5>
          <p className="text-secondary small mb-4">
            Looks like you have not added any electronics to your cart yet.
          </p>
          <Link to="/products" className="btn btn-bs3-blue">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* CART ITEMS LIST */}
          <div className="col-lg-8">
            <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 border-bottom d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                  {/* LEFT: IMAGE & INFO */}
                  <div className="d-flex align-items-center gap-3 flex-grow-1">
                    <Link to={`/products/${item.id}`} className="bg-light p-2 rounded-2 border text-center" style={{ width: '90px', height: '90px' }}>
                      <img src={item.image} alt={item.name} className="img-fluid w-100 h-100" style={{ objectFit: 'contain' }} />
                    </Link>
                    <div>
                      <span className="badge bg-light text-primary border mb-1">{item.brand || 'BS3'}</span>
                      <Link to={`/products/${item.id}`} className="text-decoration-none text-dark d-block">
                        <h6 className="fw-bold mb-1">{item.name}</h6>
                      </Link>
                      <div className="d-flex align-items-baseline gap-2">
                        <span className="fw-bold text-dark">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.originalPrice && (
                          <span className="small text-muted text-decoration-line-through">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: QUANTITY & REMOVE */}
                  <div className="d-flex align-items-center gap-3">
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-secondary disabled fw-bold text-dark px-3">{item.qty}</span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-end" style={{ minWidth: '90px' }}>
                      <div className="fw-bold text-dark">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-sm btn-outline-danger border-0"
                      title="Remove from Cart"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-3 bg-light d-flex justify-content-between align-items-center">
                <span className="small text-muted">
                  <FaShieldAlt className="text-success me-1" /> Safe and secure checkout. 100% genuine electronics.
                </span>
                <button onClick={clearCart} className="btn btn-link btn-sm text-danger text-decoration-none">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* PRICE BREAKDOWN CARD */}
          <div className="col-lg-4">
            <div className="bg-white p-4 rounded-3 shadow-sm border sticky-top" style={{ top: '80px' }}>
              <h6 className="fw-bold border-bottom pb-3 mb-3 text-uppercase text-muted">Price Details</h6>

              <div className="d-flex justify-content-between mb-2 small">
                <span>Price ({cartItems.reduce((a, b) => a + b.qty, 0)} items)</span>
                <span>₹{(totalAmount + discountAmount).toLocaleString('en-IN')}</span>
              </div>

              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>Discount</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 small">
                <span>Delivery Charges</span>
                <span className="text-success fw-bold">FREE</span>
              </div>

              <div className="border-top pt-3 mb-3 d-flex justify-content-between fw-bold fs-5">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <p className="small text-success fw-semibold mb-4">
                🎉 You will save ₹{discountAmount.toLocaleString('en-IN')} on this order
              </p>

              <button
                onClick={handleCheckout}
                className="btn btn-bs3-orange w-100 py-3 fw-bold fs-6 shadow-sm"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
