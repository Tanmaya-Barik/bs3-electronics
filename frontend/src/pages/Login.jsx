import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserShield, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login('customer@bs3electronics.in', 'customer123');
      navigate(redirect);
    } catch (err) {
      setError('Could not start demo session. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="py-5 d-flex justify-content-center">
      <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: '780px', width: '100%' }}>
        <div className="row g-0">
          {/* LEFT: FLIPKART STYLE BLUE BANNER */}
          <div className="col-md-5 p-4 text-white d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #2874f0, #1b5ccf)' }}>
            <div>
              <h3 className="fw-bold mb-3">Login</h3>
              <p className="small text-light">
                Get access to your Orders, Wishlist and KathaaAI personalized shopping recommendations.
              </p>
            </div>
            <div className="text-center py-3">
              <FaUserShield style={{ fontSize: '4rem', opacity: 0.85 }} />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="col-md-7 p-4 p-md-5 bg-white">
            <h5 className="fw-bold mb-3">Welcome to BS3 Electronics</h5>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 small" role="alert">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <input
                  type="email"
                  className="form-control shadow-none"
                  required
                  placeholder="Enter your college or personal email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Password</label>
                <input
                  type="password"
                  className="form-control shadow-none"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-bs3-orange w-100 py-2 fw-bold mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="btn btn-outline-secondary btn-sm w-100 mb-3 fw-bold"
                disabled={loading}
              >
                ⚡ Use College Demo Account (Instant Entry)
              </button>

            </form>

            <div className="text-center small border-top pt-3">
              <span className="text-muted">New to BS3 Electronics? </span>
              <Link to="/signup" className="text-primary fw-bold text-decoration-none">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
