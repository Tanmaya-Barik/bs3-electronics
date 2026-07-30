import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="text-decoration-none text-dark d-block"
    >
      <div className="bs3-card text-center p-3 h-100 d-flex flex-column align-items-center justify-content-center">
        <div className="mb-2 overflow-hidden rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
          <img
            src={category.image}
            alt={category.name}
            className="img-fluid"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h6 className="fw-bold mb-1 mt-1">{category.name}</h6>
        <span className="small text-primary fw-semibold">Explore Now →</span>
      </div>
    </Link>
  );
};

export default CategoryCard;
