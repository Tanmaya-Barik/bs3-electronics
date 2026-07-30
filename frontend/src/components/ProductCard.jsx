import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(CartContext);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="bs3-card h-100 d-flex flex-column position-relative">
      {/* WISHLIST BUTTON */}
      <button
        onClick={handleToggleWishlist}
        className="btn btn-sm border-0 position-absolute top-0 end-0 m-2 bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: '32px', height: '32px', zIndex: 5 }}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        {isWishlisted ? <FaHeart className="text-danger" /> : <FaRegHeart className="text-secondary" />}
      </button>

      {/* PRODUCT IMAGE */}
      <Link to={`/products/${product.id}`} className="text-center p-3 text-decoration-none bg-white">
        <div style={{ height: '180px' }} className="d-flex align-items-center justify-content-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: '170px', objectFit: 'contain' }}
          />
        </div>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="p-3 d-flex flex-column flex-grow-1 bg-white border-top">
        <span className="small text-muted fw-semibold">{product.brand || 'BS3'}</span>
        
        <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
          <h6 className="fw-bold mb-2 text-truncate" title={product.name}>
            {product.name}
          </h6>
        </Link>

        {/* RATING BADGE */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="bs3-badge-rating">
            {product.rating} <FaStar style={{ fontSize: '0.65rem' }} />
          </span>
          <span className="small text-muted">({product.reviewsCount ? product.reviewsCount.toLocaleString() : 120})</span>
        </div>

        {/* SPECS SNIPPET */}
        <p className="small text-muted mb-3 flex-grow-1" style={{ fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.specs}
        </p>

        {/* PRICING ROW */}
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <span className="bs3-price-current">
            ₹{product.price ? product.price.toLocaleString('en-IN') : '24,999'}
          </span>
          {product.originalPrice && (
            <span className="bs3-price-original">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discountPercent && (
            <span className="bs3-discount-tag">
              {product.discountPercent}% off
            </span>
          )}
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="btn btn-bs3-yellow w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <FaShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
