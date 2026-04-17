import React from 'react';

// --- Home Page Component ---
function HomePage() {
  const products = [
    { id: 1, name: "SIGNATURE GOLD", price: "Rs. 4,500", desc: "Luxury Scent for Men" },
    { id: 2, name: "ROYAL OUD", price: "Rs. 6,200", desc: "Premium Arabic Fragrance" },
    { id: 3, name: "MYSTIC ROSE", price: "Rs. 3,800", desc: "Floral Essence for Women" },
    { id: 4, name: "VELVET OCEAN", price: "Rs. 4,000", desc: "Marine Aqua Scent" },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Top Banner */}
      <div className="bg-zinc-900 text-[10px] tracking-[0.3em] py-3 text-center text-zinc-400 uppercase">
        Free Shipping on all orders above Rs. 5000
      </div>

      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center border-b border-zinc-900 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <h1 className="text-xl font-bold tracking-[0.5em]">WEAR YOUR AURA</h1>
        <div className="flex gap-8 text-[11px] tracking-widest text-zinc-400">
           <a href="#/admin-login" className="hover:text-white transition">ADMIN PORTAL</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-32 px-6 text-center">
          <p className="text-zinc-500 tracking-[0.4em] text-[10px] uppercase mb-4">Introduce Yourself</p>
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter mb-10 italic">HN Scents</h2>
          <button className="border border-zinc-800 px-12 py-4 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all">
            EXPLORE COLLECTION
          </button>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto p-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {products.map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-zinc-950 border border-zinc-900 group-hover:border-zinc-700 transition-all flex items-center justify-center">
                 <span className="text-zinc-800 text-[10px] tracking-widest uppercase">Product Image</span>
              </div>
              <div className="mt-8 text-center md:text-left">
                <h4 className="text-xl tracking-wider font-light mb-2">{p.name}</h4>
                <p className="text-zinc-600 text-[11px] mb-4 uppercase tracking-widest">{p.desc}</p>
                <p className="text-white text-lg font-medium mb-6">{p.price}</p>
                <button className="w-full border border-white py-3 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  QUICK ORDER
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 p-20 bg-zinc-950">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
             <h5 className="text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Contact Support</h5>
             <p className="text-sm text-zinc-400">0313-2607073 | 0335-2564902</p>
          </div>
          <div className="text-center">
             <p className="text-[10px] tracking-[0.5em] text-zinc-700 uppercase">© 2026 WEAR YOUR AURA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Main App & Routing ---
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminGateway from "./AdminGateway";
import AdminDashboard from "./AdminDashboard";

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
