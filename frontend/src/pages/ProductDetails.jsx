import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { FaStar, FaShoppingCart, FaBolt, FaHeart, FaRegHeart, FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';

const ProductDetails = ({ onOpenKathaaAI }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.image);

        // Fetch related products in same category
        if (res.data.category) {
          const relRes = await api.get(`/products?category=${encodeURIComponent(res.data.category)}&limit=4`);
          const filtered = (relRes.data.products || []).filter(p => p.id !== res.data.id);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return <Loader text="Loading electronics specification..." />;
  }

  if (!product) {
    return (
      <div className="bg-white p-5 rounded-3 shadow-sm text-center border my-5">
        <h4 className="fw-bold mb-2">Product Not Found</h4>
        <p className="text-secondary small mb-4">The item you are looking for may have been discontinued or moved.</p>
        <Link to="/products" className="btn btn-bs3-blue">Back to Store</Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const gallery = [product.image, ...(product.gallery || [])];

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode && pincode.length === 6 && !isNaN(pincode)) {
      setPincodeMsg(`✅ Free Delivery available at ${pincode} by tomorrow!`);
    } else {
      setPincodeMsg('❌ Please enter a valid 6-digit Indian pincode.');
    }
  };

  return (
    <div className="py-4">
      {/* 1. PRODUCT MAIN SECTION */}
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
        <div className="row g-4">
          {/* LEFT: IMAGES & ACTION BUTTONS */}
          <div className="col-lg-5 d-flex flex-column align-items-center">
            {/* LARGE IMAGE BOX */}
            <div
              className="w-100 border rounded-3 p-4 d-flex align-items-center justify-content-center mb-3 position-relative"
              style={{ height: '360px', backgroundColor: '#fff' }}
            >
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid"
                style={{ maxHeight: '330px', objectFit: 'contain' }}
              />
              <button
                onClick={() => toggleWishlist(product)}
                className="btn btn-sm border-0 position-absolute top-0 end-0 m-3 bg-white shadow rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
                title="Add to Wishlist"
              >
                {isWishlisted ? <FaHeart className="text-danger fs-5" /> : <FaRegHeart className="text-secondary fs-5" />}
              </button>
            </div>

            {/* THUMBNAIL GALLERY */}
            {gallery.length > 1 && (
              <div className="d-flex gap-2 mb-4 w-100 overflow-auto justify-content-center">
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-2 p-1 cursor-pointer ${selectedImage === imgUrl ? 'border-primary border-2' : ''}`}
                    style={{ width: '64px', height: '64px', cursor: 'pointer' }}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={imgUrl} alt="thumb" className="img-fluid w-100 h-100" style={{ objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}

            {/* FLIPKART STYLE BIG BUTTONS */}
            <div className="d-flex gap-2 w-100 mt-auto">
              <button
                onClick={handleAddToCart}
                className="btn btn-bs3-yellow flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold fs-6"
              >
                <FaShoppingCart /> ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-bs3-orange flex-grow-1 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold fs-6"
              >
                <FaBolt /> BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT: DETAILS, PRICING, SPECS */}
          <div className="col-lg-7">
            <span className="badge bg-light text-primary border mb-2 px-3 py-1">{product.brand || 'BS3'}</span>
            <h3 className="fw-bold mb-2">{product.name}</h3>

            {/* RATING BADGE */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="bs3-badge-rating px-2 py-1" style={{ fontSize: '0.85rem' }}>
                {product.rating} <FaStar style={{ fontSize: '0.75rem' }} />
              </span>
              <span className="text-muted small fw-semibold">
                {product.reviewsCount ? `${product.reviewsCount.toLocaleString()} Ratings & Reviews` : '1,420 Ratings'}
              </span>
            </div>

            {/* PRICING BLOCK */}
            <div className="d-flex align-items-baseline gap-3 mb-3 p-3 bg-light rounded-3">
              <span className="fs-2 fw-bold text-dark">
                ₹{product.price ? product.price.toLocaleString('en-IN') : '24,999'}
              </span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through fs-5">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-success fw-bold fs-6">
                  {product.discountPercent}% off
                </span>
              )}
            </div>

            {/* OFFERS & WARRANTY BENEFITS */}
            <div className="mb-4">
              <h6 className="fw-bold small text-muted text-uppercase mb-2">Available Offers</h6>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
                <li className="d-flex align-items-center gap-2">
                  <span className="badge bg-success">Bank Offer</span>
                  <span>5% Cashback on Flipkart Axis Bank Card</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="badge bg-success">Special Price</span>
                  <span>Get extra discount inclusive of cashback/coupon</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="badge bg-info text-dark">KathaaAI Help</span>
                  <span>Ask KathaaAI in the bottom right for instant compatibility & warranty checks!</span>
                </li>
              </ul>
            </div>

            {/* PINCODE DELIVERY CHECK */}
            <div className="mb-4 p-3 border rounded-3 bg-white">
              <h6 className="fw-bold small mb-2 d-flex align-items-center gap-2">
                <FaTruck className="text-primary" /> Delivery Options
              </h6>
              <form onSubmit={checkPincode} className="d-flex gap-2" style={{ maxWidth: '320px' }}>
                <input
                  type="text"
                  className="form-control form-control-sm shadow-none"
                  placeholder="Enter 6-digit Pincode"
                  maxLength="6"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button type="submit" className="btn btn-sm btn-outline-primary fw-bold">Check</button>
              </form>
              {pincodeMsg && <small className="d-block mt-2 fw-semibold">{pincodeMsg}</small>}
            </div>

            {/* TRUST BADGES */}
            <div className="row g-2 text-center border-top pt-3 mb-4">
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <FaUndo className="text-primary mb-1 fs-5" />
                  <span className="small fw-semibold">7-Day Replacement</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <FaTruck className="text-primary mb-1 fs-5" />
                  <span className="small fw-semibold">Free Delivery</span>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex flex-column align-items-center">
                  <FaShieldAlt className="text-primary mb-1 fs-5" />
                  <span className="small fw-semibold">1-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* QUANTITY SELECTOR */}
            <div className="d-flex align-items-center gap-3">
              <span className="fw-bold small">Quantity:</span>
              <div className="btn-group btn-group-sm">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  disabled={qty <= 1}
                >
                  -
                </button>
                <span className="btn btn-outline-secondary disabled fw-bold text-dark px-3">{qty}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setQty(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TECHNICAL SPECIFICATIONS & DESCRIPTION TABLE */}
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
        <h5 className="fw-bold border-bottom pb-2 mb-3">Technical Specifications</h5>
        <p className="text-secondary mb-4">{product.description || product.specs}</p>

        <div className="row g-3">
          <div className="col-md-6">
            <table className="table table-sm table-bordered mb-0">
              <tbody>
                <tr>
                  <th className="bg-light w-40">Brand</th>
                  <td>{product.brand || 'BS3'}</td>
                </tr>
                <tr>
                  <th className="bg-light">Category</th>
                  <td>{product.category || 'Electronics'}</td>
                </tr>
                <tr>
                  <th className="bg-light">Model ID</th>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <th className="bg-light">In The Box</th>
                  <td>1 Main Unit, Power Adapter, User Guide, Warranty Card</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <table className="table table-sm table-bordered mb-0">
              <tbody>
                <tr>
                  <th className="bg-light w-40">Key Specs</th>
                  <td>{product.specs}</td>
                </tr>
                <tr>
                  <th className="bg-light">Warranty Summary</th>
                  <td>1 Year Manufacturer Warranty on Main Unit</td>
                </tr>
                <tr>
                  <th className="bg-light">Replacement Policy</th>
                  <td>7 Days Replacement Guarantee</td>
                </tr>
                <tr>
                  <th className="bg-light">AI Support</th>
                  <td>KathaaAI 24/7 Smart Shopping Assistant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. RELATED PRODUCTS GRID */}
      {relatedProducts.length > 0 && (
        <div className="mb-4">
          <h5 className="fw-bold mb-3">Similar Products in {product.category}</h5>
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-4">
            {relatedProducts.map(rel => (
              <div className="col" key={rel.id}>
                <ProductCard product={rel} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
