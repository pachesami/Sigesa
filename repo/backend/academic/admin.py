from django.contrib import admin
from .models import Docente, Grado, Materia, Periodo


@admin.register(Docente)
class DocenteAdmin(admin.ModelAdmin):
    list_display  = ["cedula", "nombre", "correo", "telefono"]
    search_fields = ["cedula", "nombre", "correo"]
    ordering      = ["nombre"]


@admin.register(Grado)
class GradoAdmin(admin.ModelAdmin):
    list_display  = ["id_grado", "nombre", "id_docente"]
    search_fields = ["nombre"]
    list_filter   = ["id_docente"]


@admin.register(Materia)
class MateriaAdmin(admin.ModelAdmin):
    list_display  = ["id_materia", "nombre"]
    search_fields = ["nombre"]


@admin.register(Periodo)
class PeriodoAdmin(admin.ModelAdmin):
    list_display = ["id_periodo", "numero_periodo", "year"]
    list_filter  = ["year"]
    ordering     = ["-year", "numero_periodo"]
