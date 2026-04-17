import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { db } from './firebase';
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const revSnap = await getDocs(q);
        setReviews(revSnap.docs.map(doc => doc.data()));
      } catch (err) { console.error("Error:", err); }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if(newName.trim() && newText.trim()) {
      const newReview = { name: newName, text: newText, date: new Date() };
      await addDoc(collection(db, "reviews"), newReview);
      setReviews([newReview, ...reviews]);
      setNewName(''); setNewText('');
      alert("Elegant feedback received!");
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#f2f2f2', minHeight: '100vh', fontFamily: "'Cinzel', serif" }}>
      
      {/* --- HERO SECTION WITH YOUR REQUESTED WALLPAPER --- */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000")', 
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', color: '#c5a059', margin: 0, letterSpacing: '12px' }}>HN FRAGRANCES</h1>
          <p style={{ letterSpacing: '5px', fontSize: '1rem', color: '#fff', marginTop: '10px' }}>PREMIUM SCENTS | KARACHI, PAKISTAN</p>
          <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
             <a href="#contact" style={{ padding: '12px 30px', border: '1px solid #c5a059', color: '#c5a059', textDecoration: 'none', fontSize: '0.8rem' }}>CONTACT US</a>
             <a href="https://www.instagram.com/hn.fragrances" target="_blank" rel="noreferrer" style={{ padding: '12px 30px', backgroundColor: '#c5a059', color: '#000', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem' }}>INSTAGRAM</a>
          </div>
        </div>
      </div>

      {/* --- LIVE REVIEWS SECTION --- */}
      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#c5a059', marginBottom: '40px', letterSpacing: '4px' }}>VOICES OF ELEGANCE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {reviews.slice(0, 3).map((r, i) => (
            <div key={i} style={{ padding: '25px', border: '1px solid #1a1a1a', background: '#080808' }}>
              <p style={{ color: '#c5a059', fontSize: '0.8rem' }}>{r.name}</p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#aaa' }}>"{r.text}"</p>
            </div>
          ))}
        </div>
        
        {/* Review Form */}
        <div style={{ marginTop: '50px', background: '#111', padding: '40px', border: '1px solid #c5a05922' }}>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Your Name" style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid #333', color: '#fff', marginBottom: '10px' }} />
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Write your review..." style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid #333', color: '#fff', height: '100px' }}></textarea>
          <button onClick={handleReviewSubmit} style={{ width: '100%', padding: '15px', backgroundColor: '#c5a059', color: '#000', fontWeight: 'bold', border: 'none', marginTop: '10px', cursor: 'pointer' }}>SUBMIT REVIEW</button>
        </div>
      </section>

      {/* --- CONTACT & LOCATION SECTION --- */}
      <section id="contact" style={{ padding: '80px 20px', backgroundColor: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
          <div>
            <h3 style={{ color: '#c5a059', letterSpacing: '3px' }}>VISIT OUR STUDIO</h3>
            <p style={{ color: '#aaa', lineHeight: '1.8' }}>
              HN Fragrances Office,<br />
              Karachi, Sindh, Pakistan.
            </p>
            <div style={{ marginTop: '20px' }}>
              <p style={{ margin: '5px 0' }}>📞 Phone 1: <a href="tel:03132607073" style={{ color: '#c5a059', textDecoration: 'none' }}>0313 2607073</a></p>
              <p style={{ margin: '5px 0' }}>📞 Phone 2: <a href="tel:03132607073" style={{ color: '#c5a059', textDecoration: 'none' }}>0313 2607073</a></p>
              <p style={{ margin: '5px 0' }}>💬 WhatsApp: <a href="https://wa.me/923132607073" style={{ color: '#25D366', textDecoration: 'none' }}>Connect Online</a></p>
            </div>
          </div>
          <div style={{ height: '300px', border: '1px solid #c5a059' }}>
             {/* Map Placeholder - Replace with actual iframe if needed */}
             <iframe 
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462118.02491053584!2d67.15546194999999!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0660293eb7%3A0xad6a525df20ba17!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1713500000000!5m2!1sen!2s" 
              width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(1)' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <footer style={{ padding: '40px', textAlign: 'center', background: '#000', borderTop: '1px solid #111' }}>
        <p style={{ fontSize: '0.8rem', color: '#444' }}>HN FRAGRANCES © 2024-2026 | AUTHENTIC SCENTS ONLY</p>
        <Link to="/admin" style={{ color: '#222', textDecoration: 'none', fontSize: '0.6rem' }}>STAFF LOGIN</Link>
      </footer>
    </div>
  );
}

function AdminLogin({ setAuth }) {
  const [pass, setPass] = useState('');
  const handleLogin = () => {
    if(pass === "M@hi*&*") { setAuth(true); } 
    else { alert("Security Breach: Unauthorized Access Detected"); }
  };
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505' }}>
      <div style={{ padding: '50px', background: '#0a0a0a', border: '1px solid #c5a059', textAlign: 'center' }}>
        <h2 style={{ color: '#c5a059', letterSpacing: '2px' }}>ADMIN ACCESS</h2>
        <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="Enter Key" style={{ padding: '12px', marginBottom: '20px', width: '100%', background: '#000', color: '#fff', border: '1px solid #333' }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', backgroundColor: '#c5a059', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>LOGIN</button>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <AdminLogin setAuth={setIsAuthenticated} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
