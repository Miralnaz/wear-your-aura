import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

function AdminDashboard() {
  const [adminProducts, setAdminProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState({
    whatsapp: "03132607073",
    easypaisa: "03132607073",
    heroImage: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?w=1200"
  });

  // 1. Firebase se Products mangwana
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAdminProducts(items);
      setLoading(false);
    } catch (err) {
      console.error("Firebase Error:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // 2. Product Add karna
  const addProduct = async () => {
    const name = prompt("Enter Perfume Name:");
    const price = prompt("Enter Price:");
    if (name && price) {
      await addDoc(collection(db, "products"), { name, price: parseInt(price) });
      fetchProducts(); // List refresh
    }
  };

  // 3. Product Delete karna
  const deleteProduct = async (id) => {
    if (window.confirm("Pakka delete karna hai?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>OWNER CONTROL PANEL</h1>

        {/* Site Settings Section */}
        <section style={{ marginBottom: '50px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#333' }}>🌐 SITE SETTINGS (Home Page Control)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label>WhatsApp:</label>
              <input type="text" value={siteSettings.whatsapp} onChange={(e) => setSiteSettings({...siteSettings, whatsapp: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
            <div>
              <label>EasyPaisa:</label>
              <input type="text" value={siteSettings.easypaisa} onChange={(e) => setSiteSettings({...siteSettings, easypaisa: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
          </div>
          <button style={{ marginTop: '20px', backgroundColor: '#28a745', color: '#fff', padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>SAVE SETTINGS</button>
        </section>

        {/* Inventory Management Section */}
        <section style={{ marginBottom: '50px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#333' }}>📦 MANAGE PRODUCTS (Live Database)</h2>
            <button onClick={addProduct} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ ADD NEW PERFUME</button>
          </div>
          
          {loading ? <p>Data load ho raha hai...</p> : (
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Product Name</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{p.name}</td>
                    <td style={{ padding: '12px' }}>Rs. {p.price}</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => deleteProduct(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>← Back to Live Website</a>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
