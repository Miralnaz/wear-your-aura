import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function HomePage() {
  const [showOrderModal, setShowOrderModal] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  // Review State - Taake reviews live nazar aayein
  const [reviews, setReviews] = useState([
    { name: "Sarah", text: "Amazing fragrance! Highly recommended." },
    { name: "Ahmed", text: "Fast delivery and premium packaging." }
  ]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  const products = [
    { id: 1, name: "SIGNATURE GOLD", price: 4500, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500" },
    { id: 2, name: "ROYAL OUD", price: 6200, img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500" }
  ];

  const handleReviewSubmit = () => {
    if(newName && newText) {
      setReviews([...reviews, { name: newName, text: newText }]);
      setNewName('');
      setNewText('');
      alert("Review posted successfully!");
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', minHeight: '100vh', fontFamily: 'serif' }}>
      
      {/* Floating Sidebar Buttons */}
      <div style={{ position: 'fixed', right: '20px', bottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 1000 }}>
        <a href="https://wa.me/923132607073" target="_blank" style={{ backgroundColor: '#25D366', color: 'white', padding: '15px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>WhatsApp Order</a>
        <a href="https://www.instagram.com/hn.fragrances" target="_blank" style={{ backgroundColor: '#E1306C', color: 'white', padding: '15px', borderRadius: '50px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>Instagram Page</a>
      </div>

      {/* Luxury Hero Section */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1583467875263-d50dec37a88c?w=1200")',
        height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '4.5rem', margin: 0, letterSpacing: '10px' }}>HN SCENTS</h1>
          <p style={{ letterSpacing: '5px', fontSize: '1.2rem', marginTop: '10px' }}>WEAR YOUR AURA</p>
          <a href="#collection" style={{ display: 'inline-block', marginTop: '25px', padding: '12px 30px', border: '1px solid white', color: 'white', textDecoration: 'none' }}>SHOP COLLECTION</a>
        </div>
      </nav>

      {/* Collection */}
      <section id="collection" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2.5rem' }}>OUR SIGNATURE SCENTS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #f0f0f0', padding: '20px', textAlign: 'center', transition: '0.3s' }}>
              <img src={p.img} alt={p.name} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
              <h3 style={{ marginTop: '20px' }}>{p.name}</h3>
              <p style={{ color: '#666' }}>Rs. {p.price}</p>
              <button onClick={() => setShowOrderModal(p)} style={{ backgroundColor: '#000', color: '#fff', padding: '12px 25px', border: 'none', cursor: 'pointer', width: '100%', marginTop: '15px', fontWeight: 'bold' }}>ORDER NOW</button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Modal (With COD & EasyPaisa Logic) */}
      {showOrderModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', maxWidth: '450px', width: '90%' }}>
            <h3 style={{ borderBottom: '1px solid #eee', pb: '10px' }}>Complete Your Order</h3>
            <p>Product: <b>{showOrderModal.name}</b></p>
            <p>Total: <b>Rs. {showOrderModal.price}</b></p>
            
            <label style={{ display: 'block', marginTop: '20px' }}>Choose Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ccc' }}>
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Online">Online Transfer (EasyPaisa)</option>
            </select>

            {paymentMethod === 'Online' && (
              <div style={{ backgroundColor: '#e8f5e9', padding: '15px', border: '1px dashed #2e7d32', margin: '15px 0' }}>
                <p>Please send amount to:</p>
                <p style={{ fontSize: '1.1rem' }}><b>EasyPaisa: 03132607073</b></p>
                <p style={{ fontSize: '0.8rem', color: '#d32f2f' }}>*Screenshot of payment is mandatory for WhatsApp order.</p>
              </div>
            )}

            <button onClick={() => {
              const msg = `ORDER DETAILS:%0AProduct: ${showOrderModal.name}%0APayment: ${paymentMethod}%0AAmount: Rs.${showOrderModal.price}`;
              window.open(`https://wa.me/923132607073?text=${msg}`);
              setShowOrderModal(null);
            }} style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>CONFIRM VIA WHATSAPP</button>
            <button onClick={() => setShowOrderModal(null)} style={{ width: '100%', marginTop: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Live Reviews Display & Form */}
      <section style={{ padding: '80px 20px', backgroundColor: '#fafafa' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>CUSTOMER EXPERIENCES</h3>
          
          {/* List of Reviews */}
          <div style={{ marginBottom: '50px' }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{r.name}</p>
                <p style={{ fontStyle: 'italic', color: '#444' }}>"{r.text}"</p>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h4 style={{ textAlign: 'center' }}>Leave a Review</h4>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" placeholder="Your Name" style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd' }} />
            <textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Write your feedback..." style={{ width: '100%', padding: '12px', height: '100px', border: '1px solid #ddd' }}></textarea>
            <button onClick={handleReviewSubmit} style={{ backgroundColor: '#000', color: '#fff', padding: '12px 40px', border: 'none', width: '100%', marginTop: '10px', cursor: 'pointer' }}>SUBMIT REVIEW</button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #eee', color: '#999', fontSize: '0.8rem' }}>
        <p>WEAR YOUR AURA | HN SCENTS MANAGEMENT</p>
        <Link to="/admin" style={{ color: '#ccc', textDecoration: 'none' }}>Admin Access</Link>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
