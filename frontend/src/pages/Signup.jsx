import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserPlus, FaExclamationCircle } from 'react-icons/fa';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 d-flex justify-content-center">
      <div className="card border-0 shadow-lg rounded-3 overflow-hidden" style={{ maxWidth: '780px', width: '100%' }}>
        <div className="row g-0">
          {/* LEFT BANNER */}
          <div className="col-md-5 p-4 text-white d-flex flex-column justify-content-between" style={{ background: 'linear-gradient(135deg, #2874f0, #1b5ccf)' }}>
            <div>
              <h3 className="fw-bold mb-3">Looks like you're new here!</h3>
              <p className="small text-light">
                Sign up with your email to get started with India's Premier Online Electronics Store.
              </p>
            </div>
            <div className="text-center py-3">
              <FaUserPlus style={{ fontSize: '4rem', opacity: 0.85 }} />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-7 p-4 p-md-5 bg-white">
            <h5 className="fw-bold mb-3">Create an Account</h5>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 small" role="alert">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Full Name</label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <input
                  type="email"
                  className="form-control shadow-none"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-6 mb-4">
                  <label className="form-label small fw-bold text-muted">Password</label>
                  <input
                    type="password"
                    className="form-control shadow-none"
                    required
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="col-6 mb-4">
                  <label className="form-label small fw-bold text-muted">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control shadow-none"
                    required
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-bs3-orange w-100 py-2 fw-bold mb-3"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Continue'}
              </button>
            </form>

            <div className="text-center small border-top pt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-primary fw-bold text-decoration-none">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
