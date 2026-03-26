from django.contrib import admin
from .models import Nota


@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display  = ["id_nota", "id_matricula", "id_materia", "id_periodo", "nota"]
    list_filter   = ["id_periodo", "id_materia"]
    search_fields = ["id_matricula__id_estudiante__nombre", "id_materia__nombre"]
    ordering      = ["id_periodo", "id_materia"]
