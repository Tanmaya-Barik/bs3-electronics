import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <form onSubmit={submitHandler} className="d-flex w-100" style={{ maxWidth: '520px' }}>
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for Laptops, Mobiles, Audio, Brands and more"
        className="form-control bs3-search-input shadow-none"
        value={keyword}
      />
      <button type="submit" className="btn bs3-search-btn d-flex align-items-center gap-1">
        <FaSearch />
        <span className="d-none d-md-inline">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
