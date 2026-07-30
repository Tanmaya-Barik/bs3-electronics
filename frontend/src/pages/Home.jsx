import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import api from '../services/api';
import { FaFire, FaStar, FaQuoteLeft, FaBolt, FaArrowRight } from 'react-icons/fa';

const Home = ({ onOpenKathaaAI }) => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catsRes, prodsRes] = await Promise.all([
          api.get('/products/categories'),
          api.get('/products?sortBy=rating-desc&limit=8')
        ]);
        setCategories(catsRes.data || []);
        setFeaturedProducts(prodsRes.data.products || []);
      } catch (err) {
        console.error('Home page load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
    return <Loader text="Loading BS3 Electronics Home..." />;
  }

  return (
    <div>
      {/* 1. LARGE HERO CAROUSEL BANNER */}
      <Hero />

      {/* 2. POPULAR CATEGORIES */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold mb-0">Explore Popular Categories</h4>
          <Link to="/categories" className="text-decoration-none fw-semibold text-primary">
            View All Categories →
          </Link>
        </div>
        <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-6">
          {categories.map((cat, idx) => (
            <div className="col" key={idx}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (BEST SELLERS) */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-2">
            <FaFire className="text-danger fs-4" />
            <h4 className="fw-bold mb-0">Best Selling Electronics</h4>
          </div>
          <Link to="/products" className="text-decoration-none fw-semibold text-primary">
            See All Electronics →
          </Link>
        </div>
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {featuredProducts.slice(0, 4).map((prod) => (
            <div className="col" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPECIAL OFFERS / SUPERSAVER DEALS BANNER */}
      <section className="mb-5">
        <div className="card border-0 shadow-sm rounded-3 text-white overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b5ccf, #512da8)' }}>
          <div className="card-body p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="mb-3 mb-md-0 max-w-lg">
              <span className="badge bg-warning text-dark mb-2 px-3 py-1">LIMITED COLLEGE EDITION DEAL</span>
              <h2 className="fw-bold mb-2">Upgrade Your Tech Setup with KathaaAI ⭐</h2>
              <p className="lead mb-0 text-light" style={{ fontSize: '1rem' }}>
                Not sure which laptop or audio gear fits your engineering budget? Let our Google Gemini powered AI Shopping Assistant recommend the best fit for you in seconds.
              </p>
            </div>
            <div>
              <button onClick={onOpenKathaaAI} className="btn btn-bs3-yellow btn-lg fw-bold d-flex align-items-center gap-2 px-4">
                <FaBolt />
                <span>Ask KathaaAI Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST ELECTRONICS DROPS */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="fw-bold mb-0">Latest Electronics Drops</h4>
          <Link to="/products?sortBy=newest" className="text-decoration-none fw-semibold text-primary">
            New Arrivals →
          </Link>
        </div>
        <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
          {featuredProducts.slice(4, 8).map((prod) => (
            <div className="col" key={prod.id}>
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS / TESTIMONIALS */}
      <section className="mb-5 py-4 px-3 bg-white rounded-3 shadow-sm border">
        <h4 className="fw-bold text-center mb-4">What Our College Shoppers Say</h4>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <FaQuoteLeft className="text-primary mb-2 fs-5" />
                <p className="small text-muted mb-3">
                  "KathaaAI helped me compare the ASUS TUF and MacBook Air M2 for my B.Tech coding projects. The recommendation card with an instant Add to Cart button was so slick!"
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-2">
                <span className="fw-bold small">Aarav Sharma</span>
                <span className="text-warning small">★★★★★</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <FaQuoteLeft className="text-primary mb-2 fs-5" />
                <p className="small text-muted mb-3">
                  "The Flipkart-inspired blue and yellow interface feels so premium! I ordered the Sony WH-1000XM5 headphones and got free express delivery."
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-2">
                <span className="fw-bold small">Priya Verma</span>
                <span className="text-warning small">★★★★★</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-light rounded-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <FaQuoteLeft className="text-primary mb-2 fs-5" />
                <p className="small text-muted mb-3">
                  "Best college final year project demonstration! The chatbot actually queries our products using the Google Gemini API instead of fake dummy logic."
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-2">
                <span className="fw-bold small">Rohan K. (Senior Dev)</span>
                <span className="text-warning small">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
