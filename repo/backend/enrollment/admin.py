from django.contrib import admin
from .models import Matricula


@admin.register(Matricula)
class MatriculaAdmin(admin.ModelAdmin):
    list_display  = ["id_matricula", "id_estudiante", "id_grado", "year", "estado", "fecha_matricula"]
    list_filter   = ["estado", "year", "id_grado"]
    search_fields = ["id_estudiante__nombre", "id_grado__nombre"]
    ordering      = ["-year", "id_estudiante"]
