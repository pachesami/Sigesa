from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Rol, Usuario, UsuarioRol


class UsuarioRolInline(admin.TabularInline):
    model = UsuarioRol
    extra = 1


@admin.register(Usuario)
class UsuarioAdmin(BaseUserAdmin):
    inlines       = [UsuarioRolInline]
    list_display  = ["username", "estado", "is_staff", "fecha_creacion"]
    list_filter   = ["estado", "is_staff"]
    search_fields = ["username"]
    ordering      = ["username"]
    fieldsets = (
        (None,      {"fields": ("username", "password")}),
        ("Estado",  {"fields": ("estado", "is_staff", "is_superuser")}),
        ("Permisos",{"fields": ("groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {"fields": ("username", "password1", "password2", "estado")}),
    )


@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display  = ["id_rol", "nombre"]
    search_fields = ["nombre"]


@admin.register(UsuarioRol)
class UsuarioRolAdmin(admin.ModelAdmin):
    list_display = ["id_usuario", "id_rol"]
    list_filter  = ["id_rol"]
