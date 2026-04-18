import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, getDoc } from "firebase/firestore";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState({
    // Current live settings (WhatsApp/Wallpaper)
    whatsapp: "03132607073",
    whatsapp2: "03352564902", // Primary number
    easypaisa: "03132607073",
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2" // Current backdrop
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      // 1. Load Live Global Settings
      const setRef = doc(db, "settings", "global");
      const setSnap = await getDoc(setRef);
      if(setSnap.exists()) setSettings(setSnap.data());

      // 2. Load Reviews for management
      const reviewsSnap = await getDocs(collection(db, "reviews"));
      setReviews(reviewsSnap.docs.map(d => ({ ...d.data(), id: d.id })));
    } catch (error) { console.error("Admin Load Error:", error); }
  };

  // Function to Update Website Settings from Admin
  const updateSiteSettings = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "settings", "global"), settings);
      alert("Both Numbers & Wallpaper Updated on Live Website!");
    } catch (err) { alert("Settings Update Failed!"); }
  };

  // Function to Delete Reviews (Requirement added)
  const handleDelete = async (colName, id) => {
    if(window.confirm("pakka remove karna hai ye?")) {
      await deleteDoc(doc(db, colName, id));
      fetchData(); // Refresh list after delete
    }
  };

  const tabStyle = (tab) => ({
    padding: '15px 30px', cursor: 'pointer',
    backgroundColor: activeTab === tab ? '#c5a059' : '#111',
    color: activeTab === tab ? '#000' : '#fff', border: '1px solid #333'
  });

  return (
    <div style={{ padding: '40px', backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Cinzel, serif' }}>
      <h1 style={{ color: '#c5a059', borderBottom: '1px solid #c5a059', paddingBottom: '20px' }}>HN SCENTS - OWNER COMMAND CENTER</h1>
      
      <div style={{ display: 'flex', gap: '15px', margin: '30px 0' }}>
        <button onClick={() => setActiveTab('settings')} style={tabStyle('settings')}>WEBSITE SETTINGS</button>
        <button onClick={() => setActiveTab('reviews')} style={tabStyle('reviews')}>LIVE REVIEWS FEED</button>
      </div>

      <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #222', borderRadius: '4px' }}>
        
        {/* Tab 1: Configuration (Wallpaper, Both Numbers) */}
        {activeTab === 'settings' && (
          <form onSubmit={updateSiteSettings}>
            <h3 style={{ color: '#c5a059' }}>Global Configuration</h3>
            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
              <label>Primary WhatsApp Line: <input type="text" value={settings.whatsapp2} onChange={e => setSettings({...settings, whatsapp2: e.target.value})} style={inputStyle}/></label>
              <label>Secondary WhatsApp Line: <input type="text" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} style={inputStyle}/></label>
              <label>EasyPaisa Account: <input type="text" value={settings.easypaisa} onChange={e => setSettings({...settings, easypaisa: e.target.value})} style={inputStyle}/></label>
              <label>Hero Wallpaper (Direct Image Link): <input type="text" value={settings.heroWallpaper} onChange={e => setSettings({...settings, heroWallpaper: e.target.value})} style={inputStyle}/></label>
              <button type="submit" style={mainBtnStyle}>SAVE CHANGES</button>
            </div>
          </form>
        )}

        {/* Tab 2: Reviews management (CRUD) */}
        {activeTab === 'reviews' && (
          <div>
            <h3 style={{ color: '#c5a059' }}>Customer Testimonials Control</h3>
            {reviews.map(r => (
              <div key={r.id} style={{ padding: '20px', background: '#000', borderBottom: '1px solid #222' }}>
                <p><strong>{r.name}:</strong> {r.text}</p>
                <button onClick={() => handleDelete('reviews', r.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Delete Review</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Styling Constants
const inputStyle = { width: '100%', padding: '15px', background: '#000', color: '#fff', border: '1px solid #333' };
const mainBtnStyle = { padding: '18px 40px', backgroundColor: '#c5a059', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' };

export default AdminDashboard;
