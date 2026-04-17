import React from 'react';
import { ShoppingBag, Instagram, Phone, MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Home Page Component (Complete Luxury View) ---
function HomePage() {
  const products = [
    { id: 1, name: "SIGNATURE GOLD", price: "Rs. 4,500", desc: "Luxury Scent for Men", img: "p1.jpg" },
    { id: 2, name: "ROYAL OUD", price: "Rs. 6,200", desc: "Premium Arabic Fragrance", img: "p2.jpg" },
    { id: 3, name: "MYSTIC ROSE", price: "Rs. 3,800", desc: "Floral Essence for Women", img: "p3.jpg" },
    { id: 4, name: "VELVET OCEAN", price: "Rs. 4,000", desc: "Marine Aqua Scent", img: "p4.jpg" },
  ];

  const testimonials = [
    { id: 1, name: "Sarah Khan", comment: "The smell is divine! Just what I needed. High recommended.", rating: 5 },
    { id: 2, name: "Ali Ahmed", comment: "Lasts all day. Very impressive packaging too. Will order again.", rating: 4 },
    { id: 3, name: "Hina Tariq", comment: "I love Mystic Rose. It's so delicate. A perfect gift.", rating: 5 },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      {/* Announcement Bar - FREE SHIPPING */}
      <div className="bg-[#111] text-[9px] tracking-[0.4em] py-2.5 text-center border-b border-zinc-900 text-zinc-400">
        FREE SHIPPING ON ALL ORDERS ABOVE RS. 5000 | 100% SATISFACTION GUARANTEED
      </div>

      {/* Navigation */}
      <nav className="p-7 flex justify-between items-center sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-zinc-900">
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.5em] cursor-pointer">
          WEAR YOUR AURA
        </h1>
        <div className="flex gap-6 items-center">
          <ShoppingBag size={20} className="cursor-pointer hover:text-gold transition" />
          <a href="#/admin-login" className="text-xs tracking-widest text-zinc-400 hover:text-white transition">ADMIN</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black"></div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-zinc-500 tracking-[0.5em] uppercase text-[10px] mb-4">Introduce Yourself</p>
          <h2 className="text-7xl md:text-9xl font-extralight tracking-tighter mb-8 italic">HN Scents</h2>
          <button className="border border-zinc-800 px-12 py-4 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
            EXPLORE THE RANGE
          </button>
        </motion.div>
      </header>

      {/* Products Collection Grid */}
      <main className="max-w-7xl mx-auto p-8 md:p-20">
        <h3 className="text-sm tracking-[0.5em] text-zinc-500 uppercase mb-16 text-center border-b border-zinc-900 pb-10">Limited Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {products.map(p => (
            <motion.div whileHover={{ scale: 1.02 }} key={p.id} className="group">
              <div className="aspect-[3/4] bg-zinc-950 overflow-hidden border border-zinc-800 group-hover:border-gold transition-all duration-700 relative flex items-center justify-center">
                <span className="text-[9px] tracking-[0.4em] text-zinc-800 uppercase">Perfume Image</span>
              </div>
              <div className="mt-8">
                <h4 className="text-xl tracking-wider font-light mb-1">{p.name}</h4>
                <p className="text-zinc-600 text-[11px] mb-3 uppercase tracking-tighter">{p.desc}</p>
                <div className="flex justify-between items-center mb-6">
                    <p className="text-white text-lg font-medium">{p.price}</p>
                    <div className="flex text-gold"> <Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/> </div>
                </div>
                <button className="w-full border border-white py-3 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

       {/* Customer Testimonials Section */}
      <section className="bg-zinc-950 py-28 px-10 border-t border-zinc-900">
         <h3 className="text-sm tracking-[0.5em] text-zinc-500 uppercase mb-16 text-center">Loved by Many</h3>
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map(t => (
                <div key={t.id} className="border border-zinc-800 p-8 rounded-md bg-black">
                     <div className="flex text-gold mb-6"> {Array.from({length: t.rating}).map((_, i) => <Star key={i} size={16}/>)} </div>
                     <p className="text-zinc-300 text-sm italic mb-6">"{t.comment}"</p>
                     <p className="text-white text-xs font-bold tracking-wider">{t.name}</p>
                </div>
            ))}
         </div>
      </section>

      {/* Footer / Contact Details */}
      <footer className="pt-28 pb-12 border-t border-zinc-900 px-10 md:px-20 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <h5 className="text-[10px] tracking-[0.4em] mb-8 text-zinc-500 uppercase">Support Contact</h5>
            <div className="space-y-4 text-sm text-zinc-400">
              <a href="tel:03132607073" className="flex items-center gap-3 hover:text-white transition"> <Phone size={14} /> 0313-2607073 </a>
              <a href="tel:03352564902" className="flex items-center gap-3 hover:text-white transition"> <Phone size={14} /> 0335-2564902 </a>
              <a href="https://wa.me/923132607073" target="_blank" className="flex items-center gap-3 hover:text-green-500 transition"> <MessageCircle size={14} /> WhatsApp Us </a>
            </div>
          </div>
          <div>
            <h5 className="text-[10px] tracking-[0.4em] mb-8 text-zinc-500 uppercase">Connect</h5>
            <div className="flex gap-6">
              <a href="https://instagram.com/hn.fragrances" target="_blank" rel="noreferrer">
                <Instagram size={20} className="text-zinc-400 hover:text-gold transition" />
              </a>
            </div>
          </div>
          <div className="text-right col-span-2 hidden md:block">
            <h1 className="text-lg font-bold tracking-[0.4em] mb-4">WEAR YOUR AURA</h1>
            <p className="text-[10px] text-zinc-600 italic">"The art of scent, perfected."</p>
          </div>
        </div>
        <div className="text-center pt-10 border-t border-zinc-900/50">
          <p className="text-[8px] tracking-[0.6em] text-zinc-700 uppercase"> © 2026 WEAR YOUR AURA | Powered by HN Management </p>
        </div>
      </footer>
    </div>
  );
}

// --- Main App Component (Complete) ---
// This part stays similar to your old App.jsx but points path="/" to HomePage
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminGateway from "./AdminGateway";
import AdminDashboard from "./AdminDashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminGateway />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
