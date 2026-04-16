import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
// 
import { toast } from "sonner";

const Input = (props) => <input {...props} className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all" />;
const Button = (props) => <button {...props} className="w-full p-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 active:scale-95 transition-all uppercase tracking-widest" />;

const ADMIN_PASSWORD = "M@hi*&*";

export default function AdminGateway() {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("hn_admin", "true");
      navigate("/admin");
    } else {
      toast.error("Incorrect password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-light text-white tracking-[0.3em] uppercase">Admin Access</h1>
          <p className="text-gray-500 text-xs mt-3 uppercase tracking-widest">HN Scents Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Button type="submit">Unlock Dashboard</Button>
        </form>
      </motion.div>
    </div>
  );
}