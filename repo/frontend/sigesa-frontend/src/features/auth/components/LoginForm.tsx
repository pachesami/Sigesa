import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../../lib/supabase';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setError('Falta configurar Supabase. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu .env.local.');
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (authError) {
      setError('Usuario o contraseña incorrectos.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-auto z-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Inicio de Sesión</h2>
        <div className="mt-1 h-0.5 w-20 bg-[#D4A017]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="flex items-center gap-1.5 text-sm text-gray-600 mb-1.5">
            <User className="w-4 h-4" />
            Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B2D0E] focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm text-gray-600 mb-1.5">
            <Lock className="w-4 h-4" />
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6B2D0E] focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold tracking-widest py-3 rounded-lg uppercase text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Ingresando...' : 'INGRESAR'}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-600">Puedes seguirnos en</p>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#1557C0] flex items-center justify-center transition-colors"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
        </a>
      </div>
    </div>
  );
}


