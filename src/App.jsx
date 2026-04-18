import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";

function HomePage() {
  const [shoots, setShoots] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp: "923132607073",
    whatsapp2: "923352564902",
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2"
  });

  useEffect(() => {
    const fetchData = async () => {
      const setRef = doc(db, "settings", "global");
      const setSnap = await getDoc(setRef);
      if(setSnap.exists()) setSettings(setSnap.data());

      const shootSnap = await getDocs(collection(db, "shoots"));
      setShoots(shootSnap.docs.map(d => d.data()));
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', fontFamily: "'Cinzel', serif" }}>
      
      {/* HERO SECTION WITH 2 BUTTONS */}
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("${settings.heroWallpaper}")`, 
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', border: '1px solid rgba(197,160,89,0.3)', padding: '50px', backdropFilter: 'blur(10px)' }}>
          <h1 style={{ color: '#c5a059', fontSize: '4rem', letterSpacing: '12px' }}>HN FRAGRANCES</h1>
          <p style={{ letterSpacing: '5px' }}>EXCLUSIVE PERFUMES</p>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" style={waBtn}>CONTACT LINE 1</a>
            <a href={`https://wa.me/${settings.whatsapp2}`} target="_blank" style={waBtn}>CONTACT LINE 2</a>
          </div>
        </div>
      </div>

      {/* LUXURY SHOOTS GALLERY */}
      <section style={{ padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#c5a059', letterSpacing: '8px' }}>SIGNATURE SHOOTS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {shoots.map((s, i) => (
            <div key={i} style={{ height: '450px', border: '1px solid #222', overflow: 'hidden' }}>
              <img src={s.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Shoot" />
            </div>
          ))}
        </div>
      </section>

      {/* KARACHI SERVICES SECTION */}
      <section style={{ padding: '60px', textAlign: 'center', background: '#0a0a0a' }}>
         <h3 style={{ color: '#c5a059' }}>KARACHI, PAKISTAN</h3>
         <p style={{ color: '#888' }}>Luxury Delivery Services Across the City</p>
      </section>

    </div>
  );
}

const waBtn = { padding: '12px 25px', backgroundColor: '#c5a059', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '2px' };

export default HomePage;
