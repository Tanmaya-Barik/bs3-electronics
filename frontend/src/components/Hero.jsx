import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaRobot, FaBolt } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 0,
      isDemoCaution: true,
      duration: 15000, // 15 Seconds Pause
      badge: '🚨 PROJECT DEMO DISCLAIMER',
      badgeClass: 'bg-warning text-dark fw-bold px-3 py-2',
      title: 'AI Chatbot Demonstration Project',
      desc: 'This whole website is not legit — this is just for demo to showcase the AI chat bot work ability and e-commerce integration.',
      bg: 'linear-gradient(135deg, #4a0010 0%, #7a0026 50%, #3d000c 100%)',
      btn1Text: '🤖 Test KathaaAI Bot',
      btn1Link: '/products',
      btn1Class: 'btn-warning text-dark fw-bold',
      btn2Text: 'Explore Demo Catalog',
      btn2Link: '/categories'
    },
    {
      id: 1,
      duration: 4500,
      badge: 'BS3 EXCLUSIVE DROP',
      badgeClass: 'bg-warning text-dark px-3 py-1',
      title: 'Next-Gen Gaming & Ultrabooks',
      desc: 'Up to 30% OFF on ASUS TUF Gaming F15 & Apple MacBook Air M2.',
      bg: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)',
      btn1Text: 'Shop Laptops',
      btn1Link: '/products?category=Laptops',
      btn1Class: 'btn-bs3-yellow',
      btn2Text: 'View ASUS TUF',
      btn2Link: '/products/bs3-lap-01',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      duration: 4500,
      badge: 'GALAXY AI & A16 BIONIC',
      badgeClass: 'bg-info text-dark px-3 py-1',
      title: '5G Flagship Smartphone Days',
      desc: 'Experience Galaxy S24 Titanium Gray & iPhone 15 with 1-Year Brand Warranty.',
      bg: 'linear-gradient(135deg, #10002b 0%, #240046 100%)',
      btn1Text: 'Explore Phones',
      btn1Link: '/products?category=Smartphones',
      btn1Class: 'btn-bs3-orange',
      btn2Text: 'Galaxy S24 5G',
      btn2Link: '/products/bs3-pho-01',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      duration: 4500,
      badge: 'PURE SOUND IMMERSION',
      badgeClass: 'bg-success text-white px-3 py-1',
      title: 'Noise Cancelling Audio & TWS',
      desc: 'Sony WH-1000XM5 & Apple AirPods Pro 2nd Gen at Unbeatable Prices.',
      bg: 'linear-gradient(135deg, #1d2d44 0%, #0f4c5c 100%)',
      btn1Text: 'Shop Audio',
      btn1Link: '/products?category=Audio',
      btn1Class: 'btn-bs3-yellow',
      btn2Text: 'Sony XM5 Specs',
      btn2Link: '/products/bs3-aud-01',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Dynamic slide duration (15 seconds for Caution slide, 4.5 seconds for products)
  useEffect(() => {
    if (isPaused) return;
    const currentDuration = slides[currentSlide].duration || 5000;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, currentDuration);
    return () => clearTimeout(timer);
  }, [currentSlide, isPaused, slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <>
      <style>
        {`
          @keyframes pulseCaution {
            0% {
              box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 45px rgba(255, 193, 7, 0.8);
              transform: scale(1.05);
            }
            100% {
              box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
              transform: scale(1);
            }
          }
          @keyframes floatCaution {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      <div
        className="mb-4 shadow-lg rounded-4 overflow-hidden position-relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          background: slide.bg,
          minHeight: '400px',
          transition: 'background 0.8s ease-in-out'
        }}
      >
        <div
          key={slide.id}
          className="d-flex align-items-center"
          style={{
            minHeight: '400px',
            animation: 'fadeInSlide 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="container py-5 d-flex align-items-center justify-content-between flex-column flex-md-row">
            {/* Left Content */}
            <div className="text-white p-4 max-w-lg">
              <span className={`badge mb-3 rounded-pill shadow-sm ${slide.badgeClass}`}>
                {slide.badge}
              </span>
              <h1 className="display-5 fw-bold mb-3" style={{ letterSpacing: '-0.5px' }}>
                {slide.title}
              </h1>
              <p
                className="lead text-light mb-4"
                style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: '0.95' }}
              >
                {slide.desc}
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to={slide.btn1Link} className={`btn ${slide.btn1Class} btn-lg px-4 shadow-sm rounded-pill`}>
                  {slide.btn1Text}
                </Link>
                <Link to={slide.btn2Link} className="btn btn-outline-light btn-lg px-4 rounded-pill">
                  {slide.btn2Text}
                </Link>
              </div>
            </div>

            {/* Right Side: Huge Caution Sign Logo OR Product Image */}
            <div className="p-3 text-center d-flex align-items-center justify-content-center" style={{ minWidth: '260px' }}>
              {slide.isDemoCaution ? (
                <div
                  className="d-flex flex-column align-items-center justify-content-center rounded-circle p-4"
                  style={{
                    width: '220px',
                    height: '220px',
                    background: 'radial-gradient(circle, rgba(255,193,7,0.2) 0%, rgba(0,0,0,0.4) 80%)',
                    border: '3px solid #ffc107',
                    animation: 'pulseCaution 2.5s infinite, floatCaution 4s ease-in-out infinite'
                  }}
                >
                  <FaExclamationTriangle style={{ fontSize: '85px', color: '#ffc107' }} />
                  <span
                    className="text-warning fw-bold mt-2"
                    style={{
                      fontSize: '0.85rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Caution • Demo
                  </span>
                </div>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="img-fluid rounded-4 shadow-lg"
                  style={{
                    maxHeight: '260px',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators (Bottom Center) */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2 z-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="btn p-0 rounded-pill"
              style={{
                width: currentSlide === index ? '36px' : '12px',
                height: '6px',
                background: currentSlide === index ? '#ffc107' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.4s ease',
                border: 'none'
              }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
