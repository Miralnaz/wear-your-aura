import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Users, ShoppingCart, Trash2, CheckCircle, Instagram, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Dummy Data for Orders
  const [orders, setOrders] = useState([
    { id: 1, customer: "Sara Khan", product: "Echo Scents", status: "Pending", payment: "COD" },
    { id: 2, customer: "Ali Ahmed", product: "Luxury Gold", status: "Shipped", payment: "Online" },
    { id: 3, customer: "Miral Naz", product: "Aura Special", status: "Pending", payment: "COD" }
  ]);

  // Security Check: Agar login nahi kiya to wapis bhej do
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("hn_admin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    toast.success("Order deleted successfully");
  };

  const logout = () => {
    sessionStorage.removeItem("hn_admin");
    navigate("/admin-login");
    toast.info("Logged out safely");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase">HN Command Center</h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest">Managing "Wear Your Aura" 🕊️</p>
          </div>
          <div className="flex gap-3">
            <a href="https://instagram.com/hn.fragrances" target="_blank" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-800 transition">
              <Instagram size={18} /> Instagram
            </a>
            <button onClick={logout} className="flex items-center gap-2 bg-red-950/30 text-red-500 border border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-900/20 transition">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><ShoppingCart size={24} /></div>
              <div><p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Total Orders</p><p className="text-2xl font-semibold">12</p></div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><Package size={24} /></div>
              <div><p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Active Stock</p><p className="text-2xl font-semibold">45</p></div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><Users size={24} /></div>
              <div><p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Customers</p><p className="text-2xl font-semibold">94</p></div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-medium uppercase tracking-widest text-zinc-300">Recent Customer Inquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-900/50 text-zinc-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition">
                    <td className="p-4 font-medium">{order.customer}</td>
                    <td className="p-4 text-zinc-400">{order.product}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tighter ${order.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => deleteOrder(order.id)} className="text-zinc-600 hover:text-red-500 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}