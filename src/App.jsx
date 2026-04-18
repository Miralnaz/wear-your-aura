import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Firebase integration
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";

// --- Gilded Modern Theme Setup ---
const colors = {
  bg: '#050505', // Deep Black for aura Pedestal effect
  gold: '#D4AF37', // Sample image pedestal gold
  text: '#F5F5F5', // Soft White text
  card: '#0A0A0A', // Card Background
};

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({
    // Initial Fallback Settings
    whatsapp: "923132607073", // Admin controlled
    whatsapp2: "923352564902", // Primary admin
    // Luxury Aura Wallpaper from sample pedestal
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000" 
  });

  // Load Everything live from Firebase on page mount
  useEffect(() => {
    const fetchData = async () => {
      // 1. Load Live Global Settings (WhatsApp/Wallpaper)
      const setRef = doc(db, "settings", "global");
      const setSnap = await getDoc(setRef);
      if(setSnap.exists()) {
        setSettings(setSnap.data());
      }

      // 2. Load Live Customer Reviews (Ordered by latest date)
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef, orderBy("date", "desc"));
      const revSnap = await getDocs(q);
      setReviews(revSnap.docs.map(d => d.data()));
    };
    fetchData();
  }, []); // Run once on mount

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', fontFamily: "'Cinzel', serif" }}>
      
      {/* --- HERO SECTION WITH PEDESTAL AURA --- */}
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url("${settings.heroWallpaper}")`, 
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center', padding: '60px', border: `1px solid ${colors.gold}33`, // Soft gold aura border
          background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(15px)', // Glassmorphism
          borderRadius: '2px'
        }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', color: colors.gold, margin: 0, letterSpacing: '20px', textShadow: `2px 2px 20px ${colors.bg}` }}>HN FRAGRANCES</h1>
          <div style={{ width: '80px', height: '1px', background: colors.gold, margin: '20px auto' }}></div>
          {/* REQUIREMENT ADDED: BRAND AGE 2024 */}
          <p style={{ letterSpacing: '8px', fontSize: '1.2rem', color: '#fff' }}>ESTABLISHED SINCE 2024</p>
          
          <div style={{ marginTop: '50px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" style={waBtn}>CONTACT LINE 1</a>
            <a href={`https://wa.me/${settings.whatsapp2}`} target="_blank" rel="noreferrer" style={waBtn}>CONTACT LINE 2</a>
          </div>
        </div>
      </div>

      {/* --- LIVE CUSTOMER EXPERIENCES (REQUIREMENT ADDED) --- */}
      <section style={{ padding: '100px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: colors.gold, marginBottom: '60px', letterSpacing: '8px' }}>CLIENT VOICES</h2>
        
        {/* Firebase Live Review List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {reviews.length > 0 ? reviews.map((r, i) => (
            <div key={i} style={{ padding: '40px', background: colors.card, border: `1px solid ${colors.card}33`, borderRadius: '4px' }}>
              <p style={{ color: colors.gold, fontWeight: 'bold', fontSize: '1.1rem' }}>{r.name}</p>
              <p style={{ fontStyle: 'italic', color: '#bbb', lineHeight: '1.8' }}>"{r.text}"</p>
            </div>
          )) : <p style={{ color: '#444', textAlign: 'center' }}>Loading authentic experiences...</p>}
        </div>
      </section>

      {/* --- INSTAGRAM LINK (REQUIREMENT ADDED) & FOOTER --- */}
      <footer style={{ padding: '80px 20px', textAlign: 'center', background: '#000', borderTop: '1px solid #111' }}>
        <p style={{ letterSpacing: '5px', color: colors.gold, fontWeight: 'bold' }}>HN FRAGRANCES</p>
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>Karachi • Pakistan | Since 2024</p>
        <div style={{ marginTop: '30px' }}>
          <a href="https://www.instagram.com/hn.fragrances" target="_blank" rel="noreferrer" style={{ color: colors.gold, textDecoration: 'none', border: `1px solid ${colors.gold}`, padding: '12px 30px', fontWeight: 'bold' }}>VIEW INSTAGRAM FEED</a>
        </div>
      </footer>
    </div>
  );
}

// Final WaBtn Styling
const waBtn = { padding: '15px 40px', backgroundColor: colors.gold, color: '#000', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '2px' };

export default HomePage;
