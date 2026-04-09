from django.contrib import admin
from .models import Acudiente, Estudiante, RelacionEA


class RelacionEAInline(admin.TabularInline):
    model   = RelacionEA
    extra   = 1
    fk_name = "id_estudiante"


@admin.register(Estudiante)
class EstudianteAdmin(admin.ModelAdmin):
    inlines       = [RelacionEAInline]
    list_display  = ["numero_identidad", "nombre", "fecha_nacimiento", "rh"]
    search_fields = ["nombre", "numero_identidad"]
    ordering      = ["nombre"]


@admin.register(Acudiente)
class AcudienteAdmin(admin.ModelAdmin):
    list_display  = ["cedula", "nombre", "telefono", "correo"]
    search_fields = ["nombre", "cedula"]
    ordering      = ["nombre"]


@admin.register(RelacionEA)
class RelacionEAAdmin(admin.ModelAdmin):
    list_display = ["id_estudiante", "id_acudiente", "parentesco", "acudiente_principal"]
    list_filter  = ["acudiente_principal", "parentesco"]
