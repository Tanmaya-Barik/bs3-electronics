import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';
import KathaaAIWidget from './components/KathaaAIWidget';
import ProtectedRoute from './components/ProtectedRoute';
import useChat from './hooks/useChat';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function AppContent() {
  const {
    isOpen,
    toggleChat,
    messages,
    loading,
    sendMessage,
    clearChat
  } = useChat();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 1. STICKY FLIPKART NAVBAR */}
      <Navbar onOpenKathaaAI={toggleChat} />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow-1 container my-3">
        <Routes>
          <Route path="/" element={<Home onOpenKathaaAI={toggleChat} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails onOpenKathaaAI={toggleChat} />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"

            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 3. FLIPKART STYLE FOOTER */}
      <Footer onOpenKathaaAI={toggleChat} />

      {/* 4. KATHAAAI FLOATING CHAT WIDGET & CIRCULAR BUTTON ON EVERY PAGE */}
      <FloatingChatButton isOpen={isOpen} onClick={toggleChat} />
      <KathaaAIWidget
        isOpen={isOpen}
        onClose={toggleChat}
        messages={messages}
        loading={loading}
        onSend={sendMessage}
        onClear={clearChat}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
