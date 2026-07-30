import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaTruck, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const Orders = () => {
  const demoOrders = [
    {
      id: 'OD-BS3-889421',
      date: '28 July 2026',
      total: 54990,
      status: 'In Transit',
      statusColor: 'primary',
      items: [
        {
          name: 'ASUS TUF Gaming F15 Intel Core i5 11th Gen',
          price: 54990,
          image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80'
        }
      ]
    },
    {
      id: 'OD-BS3-662901',
      date: '15 July 2026',
      total: 26990,
      status: 'Delivered',
      statusColor: 'success',
      items: [
        {
          name: 'Sony WH-1000XM5 Noise Cancelling Wireless Headphones',
          price: 26990,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80'
        }
      ]
    }
  ];

  return (
    <div className="py-4">
      <div className="bg-white p-4 rounded-3 shadow-sm border mb-4 d-flex align-items-center justify-content-between">
        <div>
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaBoxOpen className="text-primary" /> My Orders ({demoOrders.length})
          </h4>
          <p className="text-secondary small mb-0">
            View your order history, track deliveries, and download tax invoices.
          </p>
        </div>
        <Link to="/products" className="btn btn-outline-primary btn-sm fw-bold">
          Shop More
        </Link>
      </div>

      <div className="d-flex flex-column gap-3">
        {demoOrders.map((ord) => (
          <div key={ord.id} className="bg-white p-4 rounded-3 shadow-sm border">
            <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-3 gap-2">
              <div>
                <span className="fw-bold text-dark me-3">Order ID: {ord.id}</span>
                <small className="text-muted">Placed on {ord.date}</small>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span className={`badge bg-${ord.statusColor} px-3 py-2 d-flex align-items-center gap-1`}>
                  {ord.status === 'Delivered' ? <FaCheckCircle /> : <FaTruck />}
                  <span>{ord.status}</span>
                </span>
                <span className="fw-bold text-dark fs-5">₹{ord.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {ord.items.map((item, idx) => (
              <div key={idx} className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light p-2 rounded border" style={{ width: '60px', height: '60px' }}>
                    <img src={item.image} alt={item.name} className="img-fluid w-100 h-100" style={{ objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <small className="text-muted">7-Day Replacement Policy active</small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary">Download Invoice</button>
                  <button className="btn btn-sm btn-bs3-blue">Track Order</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
