import React, { useState } from 'react';

function AdminDashboard() {
  // States taake admin har cheez live change kar sakay
  const [adminProducts, setAdminProducts] = useState([
    { id: 1, name: "SIGNATURE GOLD", price: 4500 },
    { id: 2, name: "ROYAL OUD", price: 6200 }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    whatsapp: "03132607073",
    easypaisa: "03132607073",
    heroImage: "https://images.unsplash.com/photo-1583467875263-d50dec37a88c?w=1200"
  });

  // Function: Product Delete karna
  const deleteProduct = (id) => {
    setAdminProducts(adminProducts.filter(p => p.id !== id));
    alert("Product Deleted!");
  };

  // Function: Naya Product Add karna (Simple logic)
  const addProduct = () => {
    const name = prompt("Enter Perfume Name:");
    const price = prompt("Enter Price:");
    if(name && price) {
      setAdminProducts([...adminProducts, { id: Date.now(), name, price: parseInt(price) }]);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ textAlign: 'center', borderBottom: '2px solid #000', pb: '20px', marginBottom: '40px' }}>OWNER CONTROL PANEL</h1>

        {/* 1. Global Site Settings */}
        <section style={{ marginBottom: '50px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#333' }}>🌐 SITE SETTINGS (Home Page Control)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label>WhatsApp Number:</label>
              <input type="text" value={siteSettings.whatsapp} onChange={(e) => setSiteSettings({...siteSettings, whatsapp: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
            <div>
              <label>EasyPaisa Number:</label>
              <input type="text" value={siteSettings.easypaisa} onChange={(e) => setSiteSettings({...siteSettings, easypaisa: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <label>Hero Wallpaper URL (Image Link):</label>
            <input type="text" value={siteSettings.heroImage} onChange={(e) => setSiteSettings({...siteSettings, heroImage: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
          </div>
          <button style={{ marginTop: '20px', backgroundColor: '#28a745', color: '#fff', padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>SAVE SETTINGS</button>
        </section>

        {/* 2. Inventory Management */}
        <section style={{ marginBottom: '50px', padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#333' }}>📦 MANAGE PRODUCTS (Inventory)</h2>
            <button onClick={addProduct} style={{ backgroundColor: '#000', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ ADD NEW PERFUME</button>
          </div>
          
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
                    <button style={{ marginRight: '10px', color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => deleteProduct(p.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 3. Review Management */}
        <section style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#333' }}>⭐ MANAGE REVIEWS</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Recent reviews from customers:</p>
          <div style={{ marginTop: '15px' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <span>"Great smell!" - <b>Sarah</b></span>
              <button style={{ color: 'red', background: 'none', border: 'none' }}>Hide Review</button>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem' }}>← Back to Live Website</a>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
