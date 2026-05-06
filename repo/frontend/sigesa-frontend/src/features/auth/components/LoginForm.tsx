import { useState } from 'react';
import { Button, PasswordInput, Stack, TextInput, Alert } from '@mantine/core';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../hooks/useAuth';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion, obtenerRutaPorUsuario } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login({ username, password });
      iniciarSesion(data);
      const ruta = obtenerRutaPorUsuario(data.usuario);
      navigate(ruta, { replace: true });
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo iniciar sesion.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-auto z-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Inicio de Sesion</h2>
        <div className="mt-1 h-0.5 w-20 bg-[#D4A017]" />
      </div>

      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <TextInput
            label="Usuario"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
            leftSection={<User className="w-4 h-4" />}
          />

          <PasswordInput
            label="Contrasena"
            placeholder="Ingrese su contrasena"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            leftSection={<Lock className="w-4 h-4" />}
          />

          {error && (
            <Alert color="red" variant="light" title="Error">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            loading={loading}
            className="bg-[#2E7D32] hover:bg-[#1B5E20]"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Stack>
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
