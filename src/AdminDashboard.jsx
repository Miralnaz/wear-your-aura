import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";

function AdminDashboard() {
  const [settings, setSettings] = useState({ whatsapp: '', whatsapp2: '', heroWallpaper: '' });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const setSnap = await getDoc(doc(db, "settings", "global"));
      if(setSnap.exists()) setSettings(setSnap.data());
      
      const revSnap = await getDocs(collection(db, "reviews"));
      setReviews(revSnap.docs.map(d => ({...d.data(), id: d.id})));
    };
    fetchData();
  }, []);

  const saveSettings = async () => {
    await updateDoc(doc(db, "settings", "global"), settings);
    alert("Website Updated Successfully!");
  };

  const deleteReview = async (id) => {
    if(window.confirm("Review delete kar dain?")) {
      await deleteDoc(doc(db, "reviews", id));
      window.location.reload();
    }
  };

  return (
    <div style={{ padding: '50px', backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'serif' }}>
      <h1 style={{ color: '#D4AF37', borderBottom: '1px solid #D4AF37' }}>OWNER PANEL</h1>
      
      <div style={{ marginTop: '40px', background: '#0a0a0a', padding: '30px', border: '1px solid #222' }}>
        <h3>CONTACT & DESIGN</h3>
        <label>WhatsApp 1: <input style={inputStyle} value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} /></label>
        <label>WhatsApp 2: <input style={inputStyle} value={settings.whatsapp2} onChange={e => setSettings({...settings, whatsapp2: e.target.value})} /></label>
        <label>Hero Wallpaper URL: <input style={inputStyle} value={settings.heroWallpaper} onChange={e => setSettings({...settings, heroWallpaper: e.target.value})} /></label>
        <button onClick={saveSettings} style={btnStyle}>UPDATE WEBSITE</button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>MANAGE REVIEWS</h3>
        {reviews.map(r => (
          <div key={r.id} style={{ padding: '15px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between' }}>
            <p><strong>{r.name}:</strong> {r.text}</p>
            <button onClick={() => deleteReview(r.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>REMOVE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', background: '#000', color: '#fff', border: '1px solid #333' };
const btnStyle = { padding: '15px 40px', backgroundColor: '#D4AF37', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' };

export default AdminDashboard;
