import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { 
  FaUserCircle, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaBoxOpen, 
  FaCheckCircle, FaTruck, FaArrowRight, FaShoppingCart, FaStar, FaTag, FaSignOutAlt 
} from 'react-icons/fa';
import api from '../services/api';

const DEFAULT_RECOMMENDED_PRODUCTS = [
  {
    id: 'lap-macbook-m3',
    name: 'Apple MacBook Air M3 (16GB/512GB)',
    category: 'Laptops',
    price: 114990,
    originalPrice: 129900,
    discountPercent: 12,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    tag: 'Best Seller ⭐'
  },
  {
    id: 'mob-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB)',
    category: 'Smartphones',
    price: 129999,
    originalPrice: 144999,
    discountPercent: 10,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    tag: 'Flagship Deal 🔥'
  },
  {
    id: 'aud-sony-xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling',
    category: 'Audio',
    price: 26990,
    originalPrice: 31990,
    discountPercent: 15,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    tag: 'Top Rated 🎧'
  },
  {
    id: 'lap-asus-g14',
    name: 'ASUS ROG Zephyrus G14 OLED Gaming',
    category: 'Laptops',
    price: 149990,
    originalPrice: 174990,
    discountPercent: 14,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
    tag: 'College Offer ⚡'
  }
];

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState(DEFAULT_RECOMMENDED_PRODUCTS);

  useEffect(() => {
    // Try fetching products from API, fallback to default recommended products for all shoppers
    api.get('/products')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setRecommendedProducts(res.data.slice(0, 4));
        }
      })
      .catch(() => {
        // Use default products silently
      });
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="py-3 py-md-4 container" style={{ maxWidth: '960px' }}>
      
      {/* 1. USER ACCOUNT BANNER */}
      <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 border-bottom pb-4 mb-4">
          <div className="d-flex align-items-center gap-3">
            <FaUserCircle className="text-primary" style={{ fontSize: '4.5rem' }} />
            <div>
              <h4 className="fw-bold mb-1 text-dark">
                {user ? user.name : 'College Demo Customer'}
              </h4>
              <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                <span className="badge bg-success">Verified BS3 Member</span>
                <span className="badge bg-warning text-dark fw-bold">Demo College Mode</span>
              </div>
              <p className="text-muted small mb-0 d-flex align-items-center gap-1">
                <FaEnvelope className="text-secondary" /> {user ? user.email : 'demo.shopper@college.edu'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-outline-danger fw-bold d-flex align-items-center gap-2 px-4 py-2"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>

        {/* ACCOUNT STATUS METRICS */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted d-block">Account Security</small>
              <span className="fw-bold text-dark d-flex align-items-center gap-1">
                <FaShieldAlt className="text-success" /> Active & Protected
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted d-block">Membership Status</small>
              <span className="fw-bold text-dark d-flex align-items-center gap-1">
                <FaCalendarAlt className="text-primary" /> College Tier ⭐
              </span>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted d-block">Total Orders</small>
              <span className="fw-bold text-dark d-flex align-items-center gap-1">
                <FaBoxOpen className="text-warning" /> 1 Recent Order
              </span>
            </div>
          </div>
        </div>

        {/* 2. LAST ORDERED SECTION (DEFAULT FOR ALL) */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
              <FaBoxOpen className="text-primary" />
              <span>Last Order Status</span>
            </h5>
            <Link to="/orders" className="text-decoration-none fw-bold small d-flex align-items-center gap-1">
              <span>All Orders</span>
              <FaArrowRight />
            </Link>
          </div>

          <div className="card border rounded-3 shadow-sm p-3 p-md-4 bg-light">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between border-bottom pb-3 mb-3 gap-2">
              <div>
                <span className="badge bg-success mb-1 d-inline-flex align-items-center gap-1">
                  <FaCheckCircle /> Confirmed • Ready for Dispatch
                </span>
                <h6 className="fw-bold text-dark m-0">Order #BS3-ORD-8942</h6>
              </div>
              <div className="text-md-end">
                <small className="text-muted d-block">Ordered on 30 July 2026</small>
                <span className="fw-bold text-primary">₹1,14,990</span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="rounded-3 overflow-hidden bg-white border" style={{ width: '70px', height: '70px', flexShrink: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80" 
                  alt="Apple MacBook Air M3" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold text-dark mb-1">Apple MacBook Air M3 (16GB/512GB)</h6>
                <p className="text-muted small mb-1">
                  <FaTruck className="text-secondary me-1" /> Estimated delivery: <strong>Tomorrow by 6:00 PM</strong>
                </p>
                <small className="text-secondary d-block">Delivered to: BS3 College Campus Demo Center</small>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DEFAULT RECOMMENDED PRODUCTS SECTION (BY DEFAULT FOR ALL USERS) */}
        <div className="mt-5 pt-3 border-top">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                <FaTag className="text-warning" />
                <span>Recommended For You (Default Catalog)</span>
              </h5>
              <small className="text-muted">
                Best-selling electronics curated for all college demo & registered shoppers
              </small>
            </div>
            <Link to="/products" className="btn btn-sm btn-outline-primary fw-bold d-none d-md-inline-block">
              View Entire Catalog
            </Link>
          </div>

          <div className="row g-3">
            {recommendedProducts.map((prod) => (
              <div key={prod.id || prod._id} className="col-6 col-md-3">
                <div className="card h-100 border rounded-3 shadow-sm overflow-hidden d-flex flex-column">
                  
                  {/* TAG BADGE */}
                  <div className="position-relative">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="card-img-top object-fit-cover"
                      style={{ height: '140px' }}
                    />
                    <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark fw-bold small">
                      {prod.tag || 'College Deal ⭐'}
                    </span>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="card-title fw-bold small text-dark mb-1 text-truncate" title={prod.name}>
                        {prod.name}
                      </h6>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <span className="badge bg-success small d-inline-flex align-items-center">
                          {prod.rating || 4.8} <FaStar className="ms-1" style={{ fontSize: '0.65rem' }} />
                        </span>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                          ({prod.discountPercent || 15}% OFF)
                        </small>
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-baseline gap-2 mb-2">
                        <span className="fw-bold text-dark" style={{ fontSize: '1rem' }}>
                          ₹{Number(prod.price).toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <small className="text-muted text-decoration-line-through" style={{ fontSize: '0.75rem' }}>
                            ₹{Number(prod.originalPrice).toLocaleString('en-IN')}
                          </small>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(prod)}
                        className="btn btn-sm btn-bs3-yellow w-100 fw-bold d-flex align-items-center justify-content-center gap-1"
                      >
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
