import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminGateway from "./AdminGateway";
import AdminDashboard from "./AdminDashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Home Page: Yahan se Instagram link aur Admin Portal milega */}
        <Route path="/" element={
          <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', letterSpacing: '0.2em' }}>WEAR YOUR AURA</h1>
            <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"Let the scent speak for itself" 💥</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#/admin-login" style={{ border: '1px solid white', padding: '10px 20px', color: 'white', textDecoration: 'none' }}>ADMIN PORTAL</a>
              <a href="https://www.instagram.com/hn.fragrances" target="_blank" style={{ background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)', padding: '10px 20px', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>INSTAGRAM</a>
            </div>
          </div>
        } />

        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminGateway />} />
        
        {/* Admin Dashboard Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;