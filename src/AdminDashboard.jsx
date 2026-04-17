import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState({
    whatsapp: "03132607073",
    easypaisa: "03132607073",
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2",
    brandShoots: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Orders, Reviews aur Products load karne ka logic
    const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("date", "desc")));
    setOrders(orderSnap.docs.map(d => ({ ...d.data(), id: d.id })));
    
    const revSnap = await getDocs(collection(db, "reviews"));
    setReviews(revSnap.docs.map(d => ({ ...d.data(), id: d.id })));
  };

  // --- Dynamic Settings Update ---
  const updateSiteSettings = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "settings", "global"), settings);
    alert("Website Settings Updated Successfully!");
  };

  // --- Delete Functions ---
  const handleDelete = async (col, id) => {
    if(window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, col, id));
      fetchData();
    }
  };

  const tabStyle = (tab) => ({
    padding: '15px 25px',
    cursor: 'pointer',
    backgroundColor: activeTab === tab ? '#c5a059' : '#111',
    color: activeTab === tab ? '#000' : '#fff',
    border: 'none',
    fontWeight: 'bold',
    marginRight: '10px'
  });

  return (
    <div style={{ padding: '40px', backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Cinzel' }}>
      <h1 style={{ color: '#c5a059', borderBottom: '2px solid #c5a059', paddingBottom: '10px' }}>OWNER COMMAND CENTER</h1>
      
      <div style={{ margin: '30px 0' }}>
        <button onClick={() => setActiveTab('settings')} style={tabStyle('settings')}>SITE SETTINGS</button>
        <button onClick={() => setActiveTab('orders')} style={tabStyle('orders')}>ORDERS</button>
        <button onClick={() => setActiveTab('reviews')} style={tabStyle('reviews')}>REVIEWS</button>
        <button onClick={() => setActiveTab('gallery')} style={tabStyle('gallery')}>BRAND SHOOTS</button>
      </div>

      <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #222' }}>
        
        {/* 1. Global Settings Tab */}
        {activeTab === 'settings' && (
          <form onSubmit={updateSiteSettings}>
            <h3>Website Configuration</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              <label>WhatsApp Number: <input type="text" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} style={inputStyle}/></label>
              <label>EasyPaisa Account: <input type="text" value={settings.easypaisa} onChange={e => setSettings({...settings, easypaisa: e.target.value})} style={inputStyle}/></label>
              <label>Hero Wallpaper URL: <input type="text" value={settings.heroWallpaper} onChange={e => setSettings({...settings, heroWallpaper: e.target.value})} style={inputStyle}/></label>
              <button type="submit" style={btnStyle}>SAVE ALL CHANGES</button>
            </div>
          </form>
        )}

        {/* 2. Orders Management */}
        {activeTab === 'orders' && (
          <div>
            <h3>Pending Orders</h3>
            {orders.map(o => (
              <div key={o.id} style={cardStyle}>
                <p><strong>Customer:</strong> {o.name} | <strong>Total:</strong> {o.total}</p>
                <p><strong>Phone:</strong> {o.phone} | <strong>Status:</strong> {o.status || 'Pending'}</p>
                <button onClick={() => handleDelete('orders', o.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Mark Completed & Remove</button>
              </div>
            ))}
          </div>
        )}

        {/* 3. Reviews Management */}
        {activeTab === 'reviews' && (
          <div>
            <h3>Customer Feedback</h3>
            {reviews.map(r => (
              <div key={r.id} style={cardStyle}>
                <p><strong>{r.name}:</strong> {r.text}</p>
                <button onClick={() => handleDelete('reviews', r.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete Review</button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', marginTop: '5px' };
const btnStyle = { padding: '15px', backgroundColor: '#c5a059', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' };
const cardStyle = { padding: '20px', borderBottom: '1px solid #222', marginBottom: '10px' };

export default AdminDashboard;
