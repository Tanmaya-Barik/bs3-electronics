import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import api from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/products/categories');
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <Loader text="Loading electronics categories..." />;
  }

  return (
    <div className="py-4">
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
        <h3 className="fw-bold mb-2">All Electronics Categories</h3>
        <p className="text-secondary small mb-0">
          Browse India's top electronic brands across Laptops, Smartphones, Audio, Smartwatches, Televisions, and Accessories.
        </p>
      </div>

      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3">
        {categories.map((cat, idx) => (
          <div className="col" key={idx}>
            <Link
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="text-decoration-none text-dark"
            >
              <div className="bs3-card h-100 p-4 d-flex flex-column align-items-center text-center">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center overflow-hidden mb-3 shadow-sm"
                  style={{ width: '120px', height: '120px' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h5 className="fw-bold mb-2">{cat.name}</h5>
                <p className="small text-muted mb-3 flex-grow-1">
                  {cat.description || `Explore latest ${cat.name} with 7-day replacement and 1-year warranty.`}
                </p>
                <span className="btn btn-sm btn-outline-primary fw-bold px-4">
                  Explore {cat.name} →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
