import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import { FaWhatsapp, FaInstagram, FaCheckCircle, FaTruck, FaWallet, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from "framer-motion";

function App() {
  const [reviews, setReviews] = useState([]);
  const [shoots, setShoots] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp: "03132607073",
    whatsapp2: "03352564902",
    heroWallpaper: "https://i.ibb.co/LzNfPzY/product-backdrop-cinematic-smoke-realistic-design.jpg"
  });

  useEffect(() => {
    const fetchData = async () => {
      // Load Settings
      const setSnap = await getDoc(doc(db, "settings", "global"));
      if(setSnap.exists()) setSettings(setSnap.data());
      
      // Load Brand Shoots
      const shootSnap = await getDocs(collection(db, "shoots"));
      setShoots(shootSnap.docs.map(d => d.data()));

      // Load Reviews
      const q = query(collection(db, "reviews"), orderBy("date", "desc"));
      const revSnap = await getDocs(q);
      setReviews(revSnap.docs.map(d => d.data()));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-gold selection:text-black" style={{ fontFamily: "'Cinzel', serif" }}>
      
      {/* 📱 SIDE CONTACT PANEL (Floating) */}
      <div className="fixed right-0 top-1/4 z-50 flex flex-col gap-[2px]">
        <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="bg-gold text-black p-3 font-bold text-[10px] uppercase vertical-text border-b border-black hover:bg-white transition-all">Order WhatsApp</a>
        <a href="https://www.instagram.com/hn.fragrances" target="_blank" className="bg-zinc-900 text-gold p-3 font-bold text-[10px] uppercase vertical-text hover:bg-gold hover:text-black transition-all">Instagram</a>
      </div>

      {/* 🌑 HERO SECTION (Wear Your Aura) */}
      <div className="h-screen flex items-center justify-center bg-cover bg-center relative" 
           style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url("${settings.heroWallpaper}")` }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="text-center p-10 bg-black/30 backdrop-blur-lg border border-gold/20 mx-4">
          <h1 className="text-4xl md:text-7xl text-gold tracking-[12px] mb-2 uppercase font-bold">HN Fragrances</h1>
          <h2 className="text-xl md:text-2xl tracking-[8px] mb-6 italic text-zinc-300">Wear Your Aura</h2>
          <p className="max-w-lg mx-auto text-sm md:text-base text-zinc-400 mb-10 leading-relaxed">
            Luxury fragrances crafted for elegance, confidence, and unforgettable impressions. Since 2024, Karachi Pakistan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gold text-black px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-white transition shadow-lg shadow-gold/20">Shop Collection</button>
            <a href={`https://wa.me/${settings.whatsapp}`} className="border border-gold text-gold px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition">Order via WhatsApp</a>
          </div>
        </motion.div>
      </div>

      {/* 🏛️ ABOUT SECTION */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h3 className="text-gold text-3xl mb-8 tracking-[10px] uppercase">Our Essence</h3>
          <p className="text-zinc-400 leading-loose text-lg md:text-xl font-light">
            HN Fragrances is a premium perfume brand based in Karachi, Pakistan. 
            We offer luxury fragrances for both men and women with long-lasting performance, 
            elegant packaging, and affordable luxury.
          </p>
        </motion.div>
      </section>

      {/* ✅ WHY CHOOSE US (Features Grid) */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 text-center">
          <Feature icon={<FaCheckCircle/>} text="50+ Premium Scents" />
          <Feature icon={<FaCheckCircle/>} text="Long Lasting" />
          <Feature icon={<FaCheckCircle/>} text="Luxury Packaging" />
          <Feature icon={<FaTruck/>} text="Karachi Delivery" />
          <Feature icon={<FaCheckCircle/>} text="Cash on Delivery" />
          <Feature icon={<FaWallet/>} text="EasyPaisa Ready" />
        </div>
      </section>

      {/* 📸 BRAND SHOOTS (Gallery) */}
      <section className="py-24 px-4 bg-black">
        <h2 className="text-center text-gold text-3xl tracking-[10px] mb-16 uppercase">Signature Shoots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {shoots.length > 0 ? shoots.map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="h-96 overflow-hidden border border-zinc-900">
              <img src={s.url} alt="Brand Shoot" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </motion.div>
          )) : <p className="col-span-full text-center text-zinc-700 italic">Capturing elegance soon...</p>}
        </div>
      </section>

      {/* ⭐ REVIEWS SECTION */}
      <section className="py-24 px-6 bg-zinc-950">
        <h2 className="text-center text-gold text-3xl tracking-[10px] mb-16 uppercase">Customer Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="p-10 bg-black border border-zinc-800 hover:border-gold/40 transition-colors relative">
              <span className="text-5xl text-gold/10 absolute top-4 left-4">"</span>
              <p className="text-zinc-400 italic mb-6 relative z-10 leading-relaxed text-sm">"{r.text}"</p>
              <p className="text-gold font-bold tracking-widest text-xs uppercase">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🗺️ FOOTER */}
      <footer className="py-16 border-t border-zinc-900 text-center bg-black">
        <h4 className="text-gold tracking-[8px] font-bold text-xl">HN FRAGRANCES</h4>
        <p className="text-zinc-600 text-xs mt-3 italic tracking-[3px]">WEAR YOUR AURA — EST. 2024</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500 text-xs tracking-widest">
            <FaMapMarkerAlt className="text-gold" /> KARACHI, PAKISTAN
          </div>
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/hn.fragrances" className="text-zinc-400 hover:text-gold transition text-sm">INSTAGRAM</a>
            <a href={`https://wa.me/${settings.whatsapp}`} className="text-zinc-400 hover:text-gold transition text-sm">WHATSAPP</a>
          </div>
        </div>
        <p className="text-[10px] text-zinc-800 mt-12 uppercase tracking-[4px]">© All Rights Reserved</p>
      </footer>
    </div>
  );
}

// Sub-component for Why Choose Us
function Feature({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-gold text-xl">{icon}</div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-bold">{text}</span>
    </div>
  );
}

export default App;
