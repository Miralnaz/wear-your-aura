import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminGateway from "./AdminGateway";
import AdminDashboard from "./AdminDashboard";
import { Toaster } from "sonner";
import { ShoppingBag, Instagram, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Home Page Component (Luxury View) ---
function HomePage() {
  const products = [
    { id: 1, name: "SIGNATURE GOLD", price: "Rs. 4,500", desc: "Luxury Scent for Men" },
    { id: 2, name: "ROYAL OUD", price: "Rs. 6,200", desc: "Premium Arabic Fragrance" },
    { id: 3, name: "MYSTIC ROSE", price: "Rs. 3,800", desc: "Floral Essence for Women" }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-900">
        <h1 className="text-xl md:text-2xl font-bold tracking-[0.5em]">WEAR YOUR AURA</h1>
        <div className="flex gap-6 items-center">
          <a href="https://wa.me/923132607073" target="_blank" rel="noreferrer">
             <MessageCircle size={20} className="hover:text-green-500 transition" />
          </a>
          <ShoppingBag size={20} />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 text-center px-4">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-6xl md:text-8xl font-extralight tracking-tighter mb-4 italic">HN Scents</motion.h2>
        <p className="text-zinc-500 tracking-[0.4em] uppercase text-[10px]">Define Your Presence</p>
      </header>

      {/* Product List */}
      <main className="max-w-7xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {products.map(p => (
            <div key={p.id} className="group text-center">
              <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 group-hover:border-zinc-500 transition-all duration-500 flex items-center justify-center">
                <span className="text-[10px] text-zinc-700 tracking-widest">PRODUCT IMAGE</span>
              </div>
              <h4 className="mt-6 text-sm tracking-widest">{p.name}</h4>
              <p className="text-zinc-600 text-[10px] my-2">{p.desc}</p>
              <p className="text-white text-sm mb-4">{p.price}</p>
              <button className="w-full border border-zinc-700 py-3 text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">ADD TO CART</button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with Numbers */}
      <footer className="p-20 border-t border-zinc-900 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h5 className="text-[10px] tracking-widest text-zinc-500 mb-4 uppercase">Contact</h5>
            <p className="text-sm">0313-2607073</p>
            <p className="text-sm">0335-2564902</p>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="text-[10px] tracking-widest text-zinc-500 mb-4 uppercase">Follow</h5>
            <a href="https://www.instagram.com/hn.fragrances" target="_blank" rel="noreferrer">
              <Instagram size={24} className="hover:text-pink-500 transition" />
            </a>
          </div>
          <div className="md:text-right">
             <a href="#/admin-login" className="text-[10px] text-zinc-600 hover:text-white transition">ADMIN PORTAL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Main App Component (Routing) ---
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
