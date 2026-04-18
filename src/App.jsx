import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";

function App() {
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp: "923132607073",
    whatsapp2: "923352564902",
    // Aapki Smoky Pedestal Image ka Link (Cloudinary/Firebase par upload karke yahan link lagayein)
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setSnap = await getDoc(doc(db, "settings", "global"));
        if(setSnap.exists()) setSettings(setSnap.data());

        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const revSnap = await getDocs(q);
        setReviews(revSnap.docs.map(d => d.data()));
      } catch (err) { console.log(err); }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', fontFamily: "'Cinzel', serif", minHeight: '100vh' }}>
      
      {/* LUXURY SMOKY HERO SECTION */}
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url("${settings.heroWallpaper}")`, 
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ 
          textAlign: 'center', padding: '60px', 
          background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(15px)',
          border: '1px solid rgba(212, 175, 55, 0.4)', boxShadow: '0 0 50px rgba(0,0,0,0.8)'
        }}>
          <h1 style={{ fontSize: '4.5rem', color: '#D4AF37', margin: 0, letterSpacing: '18px', textShadow: '2px 2px 15px #000' }}>HN FRAGRANCES</h1>
          <p style={{ letterSpacing: '10px', fontSize: '1.2rem', color: '#fff', marginTop: '10px' }}>ESTABLISHED SINCE 2024</p>
          <div style={{ width: '100px', height: '1px', background: '#D4AF37', margin: '25px auto' }}></div>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" style={waBtn}>CONTACT LINE 1</a>
            <a href={`https://wa.me/${settings.whatsapp2}`} target="_blank" style={waBtn}>CONTACT LINE 2</a>
          </div>
        </div>
      </div>

      {/* CLIENT REVIEWS SECTION */}
      <section style={{ padding: '100px 20px', background: '#080808' }}>
        <h2 style={{ textAlign: 'center', color: '#D4AF37', letterSpacing: '8px', marginBottom: '50px' }}>CLIENT VOICES</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
          {reviews.length > 0 ? reviews.map((r, i) => (
            <div key={i} style={{ padding: '35px', background: '#111', border: '1px solid #222', borderRadius: '4px' }}>
              <p style={{ color: '#D4AF37', fontWeight: 'bold' }}>{r.name}</p>
              <p style={{ fontStyle: 'italic', color: '#bbb' }}>"{r.text}"</p>
            </div>
          )) : <p style={{ textAlign: 'center', color: '#444' }}>Loading authentic reviews...</p>}
        </div>
      </section>

      {/* FOOTER & INSTAGRAM */}
      <footer style={{ padding: '60px 20px', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <p style={{ color: '#D4AF37', fontWeight: 'bold', letterSpacing: '5px' }}>HN FRAGRANCES</p>
        <p style={{ color: '#444', fontSize: '0.8rem' }}>KARACHI, PAKISTAN | SINCE 2024</p>
        <div style={{ marginTop: '25px' }}>
          <a href="https://instagram.com" target="_blank" style={{ color: '#D4AF37', textDecoration: 'none', border: '1px solid #D4AF37', padding: '10px 25px' }}>VIEW INSTAGRAM FEED</a>
        </div>
      </footer>
    </div>
  );
}

const waBtn = { padding: '15px 35px', backgroundColor: '#D4AF37', color: '#000', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '2px', transition: '0.3s' };

export default App;
