import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, getDoc } from "firebase/firestore";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('settings');
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shoots, setShoots] = useState([]);
  const [newShootUrl, setNewShootUrl] = useState('');
  const [settings, setSettings] = useState({
    whatsapp: "03132607073",
    whatsapp2: "03352564902", // Second Number
    easypaisa: "03132607073",
    heroWallpaper: "https://images.unsplash.com/photo-1595428774223-ef52624120d2"
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("date", "desc")));
      setOrders(orderSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      const revSnap = await getDocs(collection(db, "reviews"));
      setReviews(revSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      const shootSnap = await getDocs(collection(db, "shoots"));
      setShoots(shootSnap.docs.map(d => ({ ...d.data(), id: d.id })));
      const setRef = doc(db, "settings", "global");
      const setSnap = await getDoc(setRef);
      if(setSnap.exists()) setSettings(setSnap.data());
    } catch (error) { console.error(error); }
  };

  const updateSiteSettings = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "settings", "global"), settings);
    alert("Both Numbers & Settings Updated!");
  };

  const addShoot = async () => {
    if(newShootUrl.trim()) {
      await addDoc(collection(db, "shoots"), { url: newShootUrl, date: new Date() });
      setNewShootUrl(''); fetchData(); alert("Shoot Added!");
    }
  };

  const handleDelete = async (colName, id) => {
    if(window.confirm("Delete this?")) {
      await deleteDoc(doc(db, colName, id)); fetchData();
    }
  };

  const tabStyle = (tab) => ({
    padding: '12px 20px', cursor: 'pointer',
    backgroundColor: activeTab === tab ? '#c5a059' : '#111',
    color: activeTab === tab ? '#000' : '#fff', border: '1px solid #333', fontWeight: 'bold'
  });

  return (
    <div style={{ padding: '40px', backgroundColor: '#050505', minHeight: '100vh', color: '#fff', fontFamily: 'Cinzel, serif' }}>
      <h1 style={{ color: '#c5a059', borderBottom: '1px solid #c5a059', paddingBottom: '15px' }}>OWNER COMMAND CENTER</h1>
      
      <div style={{ display: 'flex', gap: '10px', margin: '30px 0' }}>
        <button onClick={() => setActiveTab('settings')} style={tabStyle('settings')}>SETTINGS</button>
        <button onClick={() => setActiveTab('gallery')} style={tabStyle('gallery')}>GALLERY</button>
        <button onClick={() => setActiveTab('orders')} style={tabStyle('orders')}>ORDERS</button>
        <button onClick={() => setActiveTab('reviews')} style={tabStyle('reviews')}>REVIEWS</button>
      </div>

      <div style={{ background: '#0a0a0a', padding: '30px', border: '1px solid #222' }}>
        {activeTab === 'settings' && (
          <form onSubmit={updateSiteSettings}>
            <div style={{ display: 'grid', gap: '20px' }}>
              <label>WhatsApp 1 (Primary): <input type="text" value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} style={inputStyle}/></label>
              <label>WhatsApp 2 (Secondary): <input type="text" value={settings.whatsapp2} onChange={e => setSettings({...settings, whatsapp2: e.target.value})} style={inputStyle}/></label>
              <label>EasyPaisa: <input type="text" value={settings.easypaisa} onChange={e => setSettings({...settings, easypaisa: e.target.value})} style={inputStyle}/></label>
              <label>Wallpaper URL: <input type="text" value={settings.heroWallpaper} onChange={e => setSettings({...settings, heroWallpaper: e.target.value})} style={inputStyle}/></label>
              <button type="submit" style={mainBtnStyle}>SAVE ALL CHANGES</button>
            </div>
          </form>
        )}

        {/* Gallery, Orders, Reviews same as before */}
        {activeTab === 'gallery' && (
           <div>
             <input value={newShootUrl} onChange={e => setNewShootUrl(e.target.value)} placeholder="Paste URL..." style={inputStyle} />
             <button onClick={addShoot} style={{...mainBtnStyle, width:'100%', marginTop:'10px'}}>ADD SHOOT</button>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '20px' }}>
               {shoots.map(s => (
                 <div key={s.id} style={{ position: 'relative' }}>
                   <img src={s.url} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                   <button onClick={() => handleDelete('shoots', s.id)} style={{ position: 'absolute', top: 0, right: 0, background: 'red', border: 'none', color: 'white' }}>X</button>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', background: '#000', color: '#fff', border: '1px solid #333' };
const mainBtnStyle = { padding: '15px', backgroundColor: '#c5a059', border: 'none', fontWeight: 'bold', cursor: 'pointer' };

export default AdminDashboard;
