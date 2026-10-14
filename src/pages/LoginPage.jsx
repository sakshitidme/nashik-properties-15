import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, showToast } = useApp();
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller' | 'agent'
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: name || (email.split('@')[0] || 'User'),
      email,
      role
    });
    showToast(`Successfully logged in as ${role}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="pt-28 pb-24 max-w-md mx-auto px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-extrabold text-white">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-xs text-slate-300">
          Access your saved properties, inquiries, and MahaRERA buyer portal.
        </p>
      </div>

      <div className="glass-panel-gold rounded-3xl p-8 border border-amber-500/30 space-y-6">
        {/* ROLE TABS */}
        <div className="grid grid-cols-3 gap-1 glass-panel p-1 rounded-2xl">
          {['buyer', 'seller', 'agent'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                role === r ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Deshmukh"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5"
          >
            <span>{isRegister ? 'Register Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-amber-400 hover:underline cursor-pointer"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};
