import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';
import API from '../services/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('कृपया यूजरनेम आ पासवर्ड दर्ज करू।');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await API.post('/auth/login', { username, password });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'अमान्य यूजरनेम अथवा पासवर्ड।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border-2 border-[#D4AF37] temple-card-shadow overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#6A0909] text-white p-8 text-center border-b-4 border-[#D4AF37] space-y-2">
          <div className="w-14 h-14 bg-[#E65100] rounded-2xl flex items-center justify-center mx-auto border border-[#FFD700] shadow-lg">
            <ShieldCheck className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#FFD700]">
            दुर्गा स्थान एडमिन लॉगिन
          </h1>
          <p className="text-xs text-amber-200 font-serif">
            प्रशासनिक नियंत्रण कक्ष प्रवेश
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#E65100]" />
                यूजरनेम (Username)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="उदा. admin"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] outline-none text-sm font-serif bg-[#FAF5EF]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#E65100]" />
                पासवर्ड (Password)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E65100] outline-none text-sm bg-[#FAF5EF]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#E65100] hover:bg-[#D9531E] text-white font-bold rounded-xl border-2 border-[#D4AF37] shadow-lg text-sm transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              {loading ? 'सत्यापित भ रहल अछि...' : 'लॉगिन करू (Login)'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
