import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
// Framer motion ko hum optional rakhenge taake build fail na ho
import { motion } from "framer-motion";

function App() {
  const [reviews, setReviews] = useState([]);
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    whatsapp: "03132607073",
    whatsapp2: "03352564902",
    heroWallpaper: "https://i.ibb.co/LzNfPzY/product-backdrop-cinematic-smoke-realistic-design.jpg"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const setSnap = await getDoc(doc(db, "settings", "global"));
        if(setSnap.exists()) {
          setSettings(prev => ({ ...prev, ...setSnap.data() }));
        }
        
        const shootSnap = await getDocs(collection(db, "shoots"));
        setShoots(shootSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const q = query(collection(db, "reviews"), orderBy("date", "desc"));
        const revSnap = await getDocs(q);
        setReviews(revSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-[#C5A059] animate-pulse tracking-[5px] uppercase font-serif">Entering Aura...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen selection:bg-[#C5A059] selection:text-black" style={{ fontFamily: "'Cinzel', serif" }}>
      
      {/* 📱 FLOATING CONTACT PANEL */}
      <div className="fixed right-0 top-1/4 z-50 flex flex-col gap-[2px]">
        <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="bg-[#C5A059] text-black p-3 font-bold text-[10px] uppercase [writing-mode:vertical-lr] border-b border-black hover:bg-white transition-all">Order WhatsApp</a>
        <a href="https://www.instagram.com/hn.fragrances" target="_blank" rel="noreferrer" className="bg-zinc-900 text-[#C5A059] p-3 font-bold text-[10px] uppercase [writing-mode:vertical-lr] hover:bg-[#C5A059] hover:text-black transition-all">Instagram</a>
      </div>

      {/* 🌑 HERO SECTION */}
      <div className="h-screen flex items-center justify-center bg-cover bg-center relative" 
           style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("${settings.heroWallpaper}")` }}>
        <div className="text-center p-10 bg-black/40 backdrop-blur-md border border-[#C5A059]/20 mx-4">
          <h1 className="text-4xl md:text-7xl text-[#C5A059] tracking-[12px] mb-2 uppercase font-bold">HN Fragrances</h1>
          <h2 className="text-xl md:text-2xl tracking-[8px] mb-6 italic text-zinc-300 font-light">Wear Your Aura</h2>
          <p className="max-w-lg mx-auto text-sm md:text-base text-zinc-400 mb-10 leading-relaxed font-sans">
            Luxury fragrances crafted for elegance, confidence, and unforgettable impressions. Since 2024, Karachi Pakistan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-[#C5A059] text-black px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-white transition shadow-lg shadow-[#C5A059]/20">Shop Collection</button>
            <a href={`https://wa.me/${settings.whatsapp}`} className="border border-[#C5A059] text-[#C5A059] px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition">Order via WhatsApp</a>
          </div>
        </div>
      </div>

      {/* 🏛️ ABOUT SECTION */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
          <h3 className="text-[#C5A059] text-3xl mb-8 tracking-[10px] uppercase font-bold">Our Essence</h3>
          <p className="text-zinc-400 leading-loose text-lg md:text-xl font-light">
            HN Fragrances is a premium perfume brand based in Karachi, Pakistan. 
            We offer luxury fragrances for both men and women with long-lasting performance, 
            elegant packaging, and affordable luxury.
          </p>
      </section>

      {/* ✅ FEATURES GRID */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 text-center">
          <Feature text="50+ Premium Scents" />
          <Feature text="Long Lasting" />
          <Feature text="Luxury Packaging" />
          <Feature text="Karachi Delivery" />
          <Feature text="Cash on Delivery" />
          <Feature text="EasyPaisa Ready" />
        </div>
      </section>

      {/* 📸 BRAND GALLERY */}
      <section className="py-24 px-4 bg-black">
        <h2 className="text-center text-[#C5A059] text-3xl tracking-[10px] mb-16 uppercase font-bold">Signature Shoots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {shoots.length > 0 ? shoots.map((s) => (
            <div key={s.id} className="h-96 overflow-hidden border border-zinc-900">
              <img src={s.url} alt="HN Fragrance Shoot" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500" />
            </div>
          )) : (
            <div className="col-span-full py-10 text-center text-zinc-700 italic border border-dashed border-zinc-900 font-sans">
              New collection shoots coming soon...
            </div>
          )}
        </div>
      </section>

      {/* ⭐ CLIENT REVIEWS */}
      <section className="py-24 px-6 bg-zinc-950">
        <h2 className="text-center text-[#C5A059] text-3xl tracking-[10px] mb-16 uppercase font-bold">Customer Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.length > 0 ? reviews.map((r) => (
            <div key={r.id} className="p-10 bg-black border border-zinc-800 hover:border-[#C5A059]/40 transition-colors relative">
              <span className="text-5xl text-[#C5A059]/10 absolute top-4 left-4 font-serif">"</span>
              <p className="text-zinc-400 italic mb-6 relative z-10 leading-relaxed text-sm font-sans">"{r.text}"</p>
              <p className="text-[#C5A059] font-bold tracking-widest text-xs uppercase">— {r.name}</p>
            </div>
          )) : (
            <p className="col-span-full text-center text-zinc-600 font-sans">No reviews yet. Be the first to share your aura!</p>
          )}
        </div>
      </section>

      {/* 🗺️ FOOTER */}
      <footer className="py-16 border-t border-zinc-900 text-center bg-black">
        <h4 className="text-[#C5A059] tracking-[8px] font-bold text-xl uppercase">HN Fragrances</h4>
        <p className="text-zinc-600 text-xs mt-3 italic tracking-[3px]">WEAR YOUR AURA — EST. 2024</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Karachi, Pakistan</p>
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/hn.fragrances" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#C5A059] transition text-xs tracking-widest uppercase">Instagram</a>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#C5A059] transition text-xs tracking-widest uppercase">WhatsApp</a>
          </div>
        </div>
        <p className="text-[9px] text-zinc-800 mt-12 uppercase tracking-[4px]">© 2024 HN Fragrances. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="w-2 h-2 rounded-full bg-[#C5A059] group-hover:scale-150 transition-transform"></div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-bold">{text}</span>
    </div>
  );
}

export default App;
