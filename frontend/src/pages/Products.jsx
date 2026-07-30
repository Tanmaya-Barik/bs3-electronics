import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import api from '../services/api';
import { FaFilter, FaRedo } from 'react-icons/fa';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  // Filter States
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Update state when URL query params change
  useEffect(() => {
    setCategory(searchParams.get('category') || '');
    setKeyword(searchParams.get('keyword') || '');
    setSortBy(searchParams.get('sortBy') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          category,
          keyword,
          sortBy,
          minPrice,
          maxPrice,
          page,
          limit: 12
        }).toString();

        const res = await api.get(`/products?${query}`);
        setProducts(res.data.products || []);
        setTotal(res.data.total || 0);
        setPages(res.data.pages || 1);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, keyword, sortBy, minPrice, maxPrice, page]);

  const handleCategoryChange = (val) => {
    setCategory(val);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (val) params.set('category', val);
    else params.delete('category');
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    const params = new URLSearchParams(searchParams);
    if (val) params.set('sortBy', val);
    else params.delete('sortBy');
    setSearchParams(params);
  };

  const applyPriceFilter = (e) => {
    e.preventDefault();
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setCategory('');
    setKeyword('');
    setSortBy('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage);
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage);
      setSearchParams(params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const allCategories = ['Laptops', 'Smartphones', 'Audio', 'Smartwatches', 'Televisions', 'Accessories'];

  return (
    <div className="py-3">
      {/* BREADCRUMB HEADER */}
      <div className="d-flex align-items-center justify-content-between mb-3 bg-white p-3 rounded-3 shadow-sm border">
        <div>
          <h4 className="fw-bold mb-0">
            {category ? `${category} Store` : keyword ? `Search Results for "${keyword}"` : 'All Electronics'}
          </h4>
          <small className="text-muted">Showing {products.length} of {total} products</small>
        </div>

        {/* SORTING DROPDOWN */}
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="sortSelect" className="small fw-semibold text-muted d-none d-sm-inline">Sort by:</label>
          <select
            id="sortSelect"
            className="form-select form-select-sm shadow-none"
            style={{ width: '180px' }}
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Relevance</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Customer Rating</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {/* SIDEBAR FILTERS */}
        <div className="col-lg-3">
          <div className="bg-white p-3 rounded-3 shadow-sm border sticky-top" style={{ top: '80px', zIndex: 10 }}>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <span className="fw-bold d-flex align-items-center gap-2">
                <FaFilter className="text-primary" /> Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="btn btn-link btn-sm text-decoration-none text-danger p-0 d-flex align-items-center gap-1"
              >
                <FaRedo style={{ fontSize: '0.75rem' }} /> Clear
              </button>
            </div>

            {/* CATEGORIES FILTER */}
            <div className="mb-4">
              <h6 className="fw-bold small mb-2 text-uppercase text-muted">Categories</h6>
              <div className="d-flex flex-column gap-1">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="catRadio"
                    id="catAll"
                    checked={!category}
                    onChange={() => handleCategoryChange('')}
                  />
                  <label className="form-check-label small" htmlFor="catAll">
                    All Categories
                  </label>
                </div>
                {allCategories.map(catName => (
                  <div className="form-check" key={catName}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="catRadio"
                      id={`cat-${catName}`}
                      checked={category === catName}
                      onChange={() => handleCategoryChange(catName)}
                    />
                    <label className="form-check-label small" htmlFor={`cat-${catName}`}>
                      {catName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE RANGE FILTER */}
            <div className="mb-3">
              <h6 className="fw-bold small mb-2 text-uppercase text-muted">Price Range (₹)</h6>
              <form onSubmit={applyPriceFilter} className="d-flex flex-column gap-2">
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control form-control-sm shadow-none"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control form-control-sm shadow-none"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-bs3-blue btn-sm w-100">
                  Apply Price
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="col-lg-9">
          {loading ? (
            <Loader text="Loading Products Catalog..." />
          ) : products.length === 0 ? (
            <div className="bg-white p-5 rounded-3 shadow-sm text-center border">
              <h5 className="fw-bold mb-2">No Electronics Found</h5>
              <p className="text-secondary small mb-3">
                We could not find any products matching your selected filters. Try clearing your search keyword or filters!
              </p>
              <button onClick={handleResetFilters} className="btn btn-bs3-yellow btn-sm">
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3">
                {products.map((product) => (
                  <div className="col" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* PAGINATION CONTROLS */}
              {pages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                        Prev
                      </button>
                    </li>
                    {[...Array(pages)].map((_, idx) => (
                      <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
