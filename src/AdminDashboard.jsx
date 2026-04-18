import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, getDoc, addDoc, deleteDoc } from "firebase/firestore";

function AdminDashboard() {
  const [settings, setSettings] = useState({ whatsapp: '03132607073', whatsapp2: '03352564902', easypaisa: '03132607073', heroWallpaper: '' });
  const [reviews, setReviews] = useState([]);
  const [shoots, setShoots] = useState([]);
  const [newShoot, setNewShoot] = useState(''); // Brand Shoots ke liye state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Load Settings
    const setSnap = await getDoc(doc(db, "settings", "global"));
    if(setSnap.exists()) setSettings(setSnap.data());
    
    // Load Reviews
    const revSnap = await getDocs(collection(db, "reviews"));
    setReviews(revSnap.docs.map(d => ({...d.data(), id: d.id})));

    // Load Shoots
    const shootSnap = await getDocs(collection(db, "shoots"));
    setShoots(shootSnap.docs.map(d => ({...d.data(), id: d.id})));
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "settings", "global"), settings);
    alert("Brand Details Updated!");
  };

  const addShoot = async () => {
    if(newShoot) {
      await addDoc(collection(db, "shoots"), { url: newShoot, date: new Date() });
      setNewShoot('');
      alert("New Shoot Added!");
      fetchData();
    }
  };

  const deleteItem = async (col, id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      await deleteDoc(doc(col, id));
      fetchData();
    }
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white font-sans">
      <h1 className="text-gold text-3xl mb-10 border-b border-zinc-800 pb-4 tracking-tighter">HN COMMAND CENTER</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SHOP CONFIGURATION */}
        <div className="bg-zinc-900 p-8 border border-zinc-800">
          <h3 className="text-gold mb-6 uppercase tracking-widest text-sm font-bold">Shop Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">WhatsApp 1 (Order Line)</label>
              <input className="w-full p-3 bg-black border border-zinc-800 focus:border-gold outline-none" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">EasyPaisa Account</label>
              <input className="w-full p-3 bg-black border border-zinc-800 focus:border-gold outline-none" value={settings.easypaisa} onChange={e => setSettings({...settings, easypaisa: e.target.value})} />
            </div>
            <button onClick={handleUpdate} className="bg-gold text-black px-10 py-3 font-bold uppercase text-xs w-full">Save Brand Info</button>
          </div>
        </div>

        {/* BRAND SHOOTS MANAGEMENT */}
        <div className="bg-zinc-900 p-8 border border-zinc-800">
          <h3 className="text-gold mb-6 uppercase tracking-widest text-sm font-bold">Manage Brand Shoots</h3>
          <div className="flex gap-2 mb-6">
            <input className="flex-1 p-3 bg-black border border-zinc-800 focus:border-gold outline-none" 
                   placeholder="Paste Image URL here" value={newShoot} onChange={e => setNewShoot(e.target.value)} />
            <button onClick={addShoot} className="bg-gold text-black px-4 py-3 font-bold text-xs">ADD</button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
            {shoots.map(s => (
              <div key={s.id} className="relative group">
                <img src={s.url} alt="Shoot" className="w-full h-16 object-cover border border-zinc-700" />
                <button onClick={() => deleteItem('shoots', s.id)} 
                        className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold">DELETE</button>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS MANAGER */}
        <div className="bg-zinc-900 p-8 border border-zinc-800 md:col-span-2">
          <h3 className="text-gold mb-6 uppercase tracking-widest text-sm font-bold">Live Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map(r => (
              <div key={r.id} className="flex justify-between items-center bg-black p-4 border border-zinc-800">
                <div>
                  <p className="text-gold font-bold text-sm">{r.name}</p>
                  <p className="text-zinc-500 text-xs truncate max-w-xs">{r.text}</p>
                </div>
                <button onClick={() => deleteItem('reviews', r.id)} className="text-red-500 text-xs font-bold hover:underline">REMOVE</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
