import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaShoppingCart, FaHeart, FaUser, FaRobot, FaSignOutAlt, FaBoxOpen, 
  FaBars, FaBell, FaHome, FaThLarge, FaUserCircle, FaCog, FaSignInAlt, 
  FaTag, FaCheckCircle, FaShieldAlt 
} from 'react-icons/fa';
import SearchBar from './SearchBar';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = ({ onOpenKathaaAI }) => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount, wishlistItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerNavigate = (path) => {
    const offcanvasEl = document.getElementById('bs3SidebarDrawer');
    if (offcanvasEl) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      } else {
        const closeBtn = offcanvasEl.querySelector('[data-bs-dismiss="offcanvas"]');
        closeBtn?.click();
      }
    }
    navigate(path);
  };

  const handleLogout = () => {
    const offcanvasEl = document.getElementById('bs3SidebarDrawer');
    if (offcanvasEl) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
    logout();
    navigate('/');
  };

  const cartCount = getCartCount();
  const currentPath = location.pathname;

  return (
    <>
      {/* 1. STICKY TOP NAVBAR */}
      <nav className="navbar bs3-navbar sticky-top px-2 px-md-4">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          
          {/* LEFT CORNER: HAMBURGER BURGER LINES BUTTON */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="bs3-hamburger-btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bs3SidebarDrawer"
              aria-controls="bs3SidebarDrawer"
              title="Open Menu"
            >
              <FaBars className="fs-5" />
            </button>

            {/* DESKTOP SEARCH BAR (VISIBLE ON LARGE SCREENS) */}
            <div className="d-none d-lg-block ms-3" style={{ width: '380px' }}>
              <SearchBar />
            </div>
          </div>

          {/* MIDDLE: WEBSITE LOGO */}
          <Link to="/" className="navbar-brand d-flex flex-column text-center mx-auto mx-lg-0 text-decoration-none">
            <span className="bs3-logo-title m-0">BS3 Electronics</span>
            <span className="bs3-logo-sub">Explore <span className="fw-bold text-warning">Plus</span> ⭐</span>
          </Link>

          {/* RIGHT CORNER: NOTIFICATION BELL & DESKTOP LINKS */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            
            {/* NOTIFICATION BELL (VISIBLE ON BOTH MOBILE & DESKTOP) */}
            <div className="dropdown">
              <button
                className="bs3-notification-bell"
                type="button"
                id="notificationBellDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                title="Notifications & Offers"
              >
                <FaBell className="fs-5" />
                <span className="bs3-bell-dot"></span>
              </button>
              <ul 
                className="dropdown-menu dropdown-menu-end shadow border-0 p-2" 
                aria-labelledby="notificationBellDropdown"
                style={{ width: '310px', borderRadius: '12px' }}
              >
                <li className="px-2 py-1 border-bottom">
                  <h6 className="fw-bold m-0 small text-dark d-flex align-items-center gap-1">
                    <FaTag className="text-warning" /> Live College & Store Offers
                  </h6>
                </li>
                <li>
                  <div className="dropdown-item p-2 rounded-2 my-1 bg-light">
                    <small className="fw-bold text-success d-block">🎉 Code COLLEGE10 Active!</small>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Get flat 10% instant college discount on all best-selling electronics.
                    </small>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item p-2 rounded-2 my-1 bg-light">
                    <small className="fw-bold text-primary d-block">🚀 7-Day Hassle-Free Refund</small>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      All items come with our official BS3 1-Year Brand Warranty.
                    </small>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item p-2 rounded-2 my-1 bg-light">
                    <small className="fw-bold text-dark d-block">🤖 KathaaAI 24/7 Shopping Bot</small>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Click KathaaAI anytime to find instant recommendations and policies.
                    </small>
                  </div>
                </li>
              </ul>
            </div>

            {/* DESKTOP-ONLY LINKS */}
            <div className="d-none d-lg-flex align-items-center gap-3 ms-2">
              <Link to="/products" className="nav-link bs3-nav-link">Products</Link>
              <Link to="/categories" className="nav-link bs3-nav-link">Categories</Link>
              
              <Link to="/wishlist" className="nav-link bs3-nav-link position-relative d-flex align-items-center gap-1">
                <FaHeart />
                <span>Wishlist</span>
                {wishlistItems && wishlistItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="nav-link bs3-nav-link position-relative d-flex align-items-center gap-1">
                <FaShoppingCart />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={onOpenKathaaAI}
                className="btn btn-sm btn-outline-light d-flex align-items-center gap-1 rounded-pill px-3"
                title="Ask KathaaAI AI Assistant"
              >
                <FaRobot className="text-warning" />
                <span className="fw-semibold">KathaaAI</span>
              </button>

              {user ? (
                <div className="dropdown">
                  <a
                    className="btn btn-light text-primary fw-bold px-3 py-1 rounded-1 dropdown-toggle d-flex align-items-center gap-1"
                    href="#"
                    id="userDropdownDesktop"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser />
                    <span>{user.name}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdownDesktop">
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/profile">
                        <FaUserCircle /> Account Details
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center gap-2" to="/orders">
                        <FaBoxOpen /> My Orders
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item d-flex align-items-center gap-2 text-danger">
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-light text-primary fw-bold px-3 py-1 rounded-1 shadow-sm">
                  Login
                </Link>
              )}
            </div>

          </div>

        </div>

        {/* MOBILE SEARCH BAR (ROW 2 ON SMALL SCREENS) */}
        <div className="container-fluid d-lg-none mt-2">
          <SearchBar />
        </div>
      </nav>

      {/* 2. OFFCANVAS SIDEBAR DRAWER (BURGER MENU) */}
      <div 
        className="offcanvas offcanvas-start border-0 shadow" 
        tabIndex="-1" 
        id="bs3SidebarDrawer" 
        aria-labelledby="bs3SidebarDrawerLabel"
        style={{ width: '300px', backgroundColor: '#1b212c', color: '#ffffff' }}
      >
        {/* DRAWER HEADER / USER INFO */}
        <div className="offcanvas-header border-bottom border-secondary pb-3" style={{ background: '#2874f0' }}>
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}
            >
              <FaUserCircle />
            </div>
            <div>
              <h6 className="fw-bold m-0 text-white" id="bs3SidebarDrawerLabel">
                {user ? user.name : 'Welcome Demo Guest'}
              </h6>
              <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                {user ? user.email : 'College Demo Account'}
              </small>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"
          ></button>
        </div>

        {/* DRAWER MENU ITEMS */}
        <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
          <div className="list-group list-group-flush">
            
            {/* ACCOUNT DETAILS */}
            <button 
              type="button"
              onClick={() => handleDrawerNavigate('/profile')}
              className="list-group-item list-group-item-action bg-transparent text-white border-secondary py-3 d-flex align-items-center gap-3 border-0 text-start w-100"
            >
              <FaUserCircle className="text-warning fs-5" />
              <span className="fw-semibold">Account Details</span>
            </button>

            {/* ORDERS */}
            <button 
              type="button"
              onClick={() => handleDrawerNavigate('/orders')}
              className="list-group-item list-group-item-action bg-transparent text-white border-secondary py-3 d-flex align-items-center gap-3 border-0 text-start w-100"
            >
              <FaBoxOpen className="text-info fs-5" />
              <span className="fw-semibold">My Orders</span>
            </button>

            {/* SETTINGS */}
            <button 
              type="button"
              onClick={() => handleDrawerNavigate('/profile')}
              className="list-group-item list-group-item-action bg-transparent text-white border-secondary py-3 d-flex align-items-center gap-3 border-0 text-start w-100"
            >
              <FaCog className="text-success fs-5" />
              <div className="d-flex flex-column">
                <span className="fw-semibold">Settings & Preferences</span>
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>Theme, Demo College Mode, Warranty</small>
              </div>
            </button>

            {/* BROWSE PRODUCTS */}
            <button 
              type="button"
              onClick={() => handleDrawerNavigate('/products')}
              className="list-group-item list-group-item-action bg-transparent text-white border-secondary py-3 d-flex align-items-center gap-3 border-0 text-start w-100"
            >
              <FaThLarge className="text-light fs-5" />
              <span className="fw-semibold">Explore Products</span>
            </button>

            {/* ASK KATHAA AI */}
            <button
              onClick={() => {
                const offcanvasEl = document.getElementById('bs3SidebarDrawer');
                if (offcanvasEl) {
                  const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasEl);
                  bsOffcanvas?.hide();
                }
                onOpenKathaaAI();
              }}
              className="list-group-item list-group-item-action bg-transparent text-white border-secondary py-3 d-flex align-items-center gap-3 border-0 text-start w-100"
            >
              <FaRobot className="text-warning fs-5" />
              <div className="d-flex flex-column">
                <span className="fw-semibold">Ask KathaaAI Assistant</span>
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>24/7 AI Electronics Consultant</small>
              </div>
            </button>
          </div>

          {/* LOGIN / LOGOUT BOTTOM BUTTON */}
          <div className="p-3 border-top border-secondary mt-auto">
            {user ? (
              <button 
                type="button"
                onClick={handleLogout} 
                className="btn btn-outline-danger w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2"
              >
                <FaSignOutAlt />
                <span>Logout of Account</span>
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => handleDrawerNavigate('/login')}
                className="btn btn-warning w-100 text-dark fw-bold d-flex align-items-center justify-content-center gap-2 py-2 shadow-sm"
              >
                <FaSignInAlt />
                <span>Login / Create Account</span>
              </button>
            )}
            <div className="text-center mt-2">
              <small className="text-muted" style={{ fontSize: '0.68rem' }}>
                <FaShieldAlt className="text-success me-1" /> BS3 Electronics Secure Demo Portal
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FIXED BOTTOM MOBILE NAVIGATION BAR (MOBILE ONLY) */}
      <div className="bs3-bottom-nav fixed-bottom d-lg-none">
        <div className="container-fluid d-flex justify-content-around align-items-center">
          
          {/* HOME */}
          <Link 
            to="/" 
            className={`bs3-bottom-nav-item ${currentPath === '/' ? 'active' : ''}`}
            title="Home"
          >
            <FaHome className="fs-5" />
            <span>Home</span>
          </Link>

          {/* CATEGORIES / PRODUCTS */}
          <Link 
            to="/categories" 
            className={`bs3-bottom-nav-item ${currentPath === '/categories' ? 'active' : ''}`}
            title="Categories"
          >
            <FaThLarge className="fs-5" />
            <span>Categories</span>
          </Link>

          {/* CENTER HERO: KATHAAAI BOT */}
          <button
            onClick={onOpenKathaaAI}
            className="bs3-bottom-nav-bot border-0"
            title="Ask KathaaAI"
          >
            <FaRobot className="fs-4" />
          </button>

          {/* CART */}
          <Link 
            to="/cart" 
            className={`bs3-bottom-nav-item ${currentPath === '/cart' ? 'active' : ''}`}
            title="Cart"
          >
            <div className="position-relative">
              <FaShoppingCart className="fs-5" />
              {cartCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold"
                  style={{ fontSize: '0.55rem', padding: '2px 5px' }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          {/* ACCOUNT DETAILS */}
          <Link 
            to={user ? "/profile" : "/login"} 
            className={`bs3-bottom-nav-item ${currentPath === '/profile' ? 'active' : ''}`}
            title="Account Details"
          >
            <FaUserCircle className="fs-5" />
            <span>Account</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Navbar;
