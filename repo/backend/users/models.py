from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class Rol(models.Model):
    id_rol = models.BigAutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        db_table = "rol"
        verbose_name = "Rol"
        verbose_name_plural = "Roles"

    def __str__(self):
        return self.nombre


class UsuarioManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("El username es obligatorio.")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("estado", "activo")
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    ESTADO_CHOICES = [
        ("activo",   "Activo"),
        ("inactivo", "Inactivo"),
    ]

    id_usuario     = models.BigAutoField(primary_key=True)
    username       = models.CharField(max_length=100, unique=True)
    password       = models.CharField(max_length=255)
    estado         = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="activo")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    is_staff       = models.BooleanField(default=False)
    is_superuser   = models.BooleanField(default=False)

    USERNAME_FIELD  = "username"
    REQUIRED_FIELDS = []
    objects = UsuarioManager()

    class Meta:
        db_table = "usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.username

    @property
    def is_active(self):
        return self.estado == "activo"


class UsuarioRol(models.Model):
    id_usuario_rol = models.BigAutoField(primary_key=True)
    id_usuario     = models.ForeignKey(
        Usuario, on_delete=models.CASCADE,
        db_column="id_usuario", related_name="roles"
    )
    id_rol         = models.ForeignKey(
        Rol, on_delete=models.CASCADE,
        db_column="id_rol", related_name="usuarios"
    )

    class Meta:
        db_table = "usuario_rol"
        verbose_name = "Usuario-Rol"
        verbose_name_plural = "Usuarios-Roles"
        unique_together = [("id_usuario", "id_rol")]

    def __str__(self):
        return f"{self.id_usuario} — {self.id_rol}"
