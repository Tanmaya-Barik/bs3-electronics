import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlistItems } = useContext(CartContext);

  return (
    <div className="py-4">
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4 d-flex align-items-center justify-content-between">
        <div>
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaHeart className="text-danger" /> My Wishlist ({wishlistItems.length})
          </h4>
          <p className="text-secondary small mb-0">Save your favorite electronics for later and get price drop alerts.</p>
        </div>
        <Link to="/products" className="btn btn-outline-primary btn-sm fw-bold">
          Continue Shopping
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white p-5 rounded-3 shadow-sm text-center border my-5">
          <FaHeart className="text-muted fs-1 mb-3" />
          <h5 className="fw-bold mb-2">Your Wishlist is Empty</h5>
          <p className="text-secondary small mb-4">
            You haven't saved any electronics to your wishlist yet. Tap the heart icon on any product card to save it here!
          </p>
          <Link to="/products" className="btn btn-bs3-blue">
            Explore Store Catalog
          </Link>
        </div>
      ) : (
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {wishlistItems.map((prod) => (
            <div className="col" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
