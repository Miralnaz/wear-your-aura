import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminGateway from "./AdminGateway";
import AdminDashboard from "./AdminDashboard";

// --- Home Page Component ---
function HomePage() {
  const products = [
    { id: 1, name: "SIGNATURE GOLD", price: "Rs. 4,500", desc: "Luxury Scent for Men" },
    { id: 2, name: "ROYAL OUD", price: "Rs. 6,200", desc: "Premium Arabic Fragrance" },
    { id: 3, name: "MYSTIC ROSE", price: "Rs. 3,800", desc: "Floral Essence for Women" }
  ];

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* WhatsApp Floating Button (Side Button) */}
      <a href="https://wa.me/923132607073" target="_blank" style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#25D366', color: 'white', padding: '15px', borderRadius: '50px', zIndex: 1000, textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        Chat with Us
      </a>

      {/* Navigation */}
      <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', position: 'sticky', top: 0, backgroundColor: 'black', zIndex: 10 }}>
        <h1 style={{ letterSpacing: '0.3em', fontSize: '1.2rem' }}>WEAR YOUR AURA</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="https://www.instagram.com/hn.fragrances" target="_blank" style={{ color: 'white', fontSize: '0.8rem', textDecoration: 'none', border: '1px solid #444', padding: '5px 10px' }}>INSTAGRAM</a>
          <Link to="/admin-login" style={{ color: 'black', backgroundColor: 'white', fontSize: '0.8rem', textDecoration: 'none', padding: '5px 10px', fontWeight: 'bold' }}>ADMIN</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: '100', fontStyle: 'italic' }}>HN Scents</h2>
        <p style={{ letterSpacing: '0.5em', color: '#888', fontSize: '0.7rem', marginTop: '10px' }}>DEFINE YOUR PRESENCE</p>
      </header>

      {/* Products Grid - With Working Quick Order */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #222', padding: '20px', textAlign: 'center' }}>
            <div style={{ height: '250px', backgroundColor: '#111', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>PERFUME IMAGE</div>
            <h4 style={{ letterSpacing: '0.1em' }}>{p.name}</h4>
            <p style={{ fontSize: '0.7rem', color: '#666', margin: '10px 0' }}>{p.desc}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>{p.price}</p>
            {/* Quick Order Button that opens WhatsApp with Message */}
            <a href={`https://wa.me/923132607073?text=Hi! I want to order ${p.name}`} target="_blank" style={{ display: 'block', backgroundColor: 'white', color: 'black', padding: '12px', textDecoration: 'none', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.2em' }}>QUICK ORDER VIA WHATSAPP</a>
          </div>
        ))}
      </main>

      {/* Customer Reviews Section */}
      <section style={{ backgroundColor: '#050505', padding: '60px 20px', marginTop: '40px', borderTop: '1px solid #111' }}>
        <h3 style={{ textAlign: 'center', letterSpacing: '0.4em', fontSize: '0.8rem', color: '#555', marginBottom: '40px' }}>CUSTOMER REVIEWS</h3>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid #222', padding: '20px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>"The best fragrance I have ever used. Highly recommended!"</p>
            <p style={{ fontSize: '0.7rem', color: 'gold', marginTop: '10px' }}>★★★★★ - Sarah K.</p>
          </div>
          <div style={{ border: '1px solid #222', padding: '20px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>"Elegant packaging and the smell lasts all day long."</p>
            <p style={{ fontSize: '0.7rem', color: 'gold', marginTop: '10px' }}>★★★★★ - Ali Ahmed</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #222', color: '#444', fontSize: '0.7rem' }}>
        <p>CONTACT: 0313-2607073 | 0335-2564902</p>
        <p style={{ marginTop: '10px' }}>© 2026 WEAR YOUR AURA | ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

// --- App Root ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminGateway />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
