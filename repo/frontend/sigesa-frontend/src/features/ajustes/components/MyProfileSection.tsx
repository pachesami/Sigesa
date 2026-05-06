import { useEffect, useState } from 'react';
import { Button, Group, TextInput, Badge, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { usersService } from '../../../services/usersService';
import type { Usuario } from '../../../types/auth';
import { obtenerMensajeError } from '../../../utils/apiErrors';

export default function MyProfileSection() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const cargarPerfil = async () => {
    try {
      const data = await usersService.obtenerPerfil();
      setUsuario(data);
      form.setValues({
        username: data.username,
        password: '',
      });
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo cargar el perfil.'));
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      setCargando(true);
      await usersService.actualizarPerfil({
        username: values.username,
        password: values.password || undefined,
      });
      await cargarPerfil();
    } catch (err) {
      setError(obtenerMensajeError(err, 'No se pudo actualizar el perfil.'));
    } finally {
      setCargando(false);
    }
  };

  const roles = usuario?.roles?.map((rol) => rol.rol.nombre) ?? [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Mi Perfil</h2>

      {error && <Alert color="red">{error}</Alert>}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="flex-end" grow>
          <TextInput label="Usuario" required {...form.getInputProps('username')} />
          <TextInput label="Contrasena" type="password" placeholder="Nueva contrasena" {...form.getInputProps('password')} />
          <Button type="submit" loading={cargando} className="bg-green-600 hover:bg-green-700">
            Guardar
          </Button>
        </Group>
      </form>

      <div className="flex flex-wrap gap-3">
        <Badge color={usuario?.estado === 'activo' ? 'green' : 'gray'}>
          Estado: {usuario?.estado ?? '-'}
        </Badge>
        {usuario?.is_staff && <Badge color="blue">Staff</Badge>}
        {roles.map((rol) => (
          <Badge key={rol} color="gray">
            {rol}
          </Badge>
        ))}
      </div>
    </div>
  );
}
