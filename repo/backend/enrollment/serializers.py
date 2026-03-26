from rest_framework import serializers
from .models import Matricula


class MatriculaSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Matricula
        fields = [
            "id_matricula", "id_grado", "id_estudiante",
            "year", "fecha_matricula", "estado",
        ]

    def validate(self, data):
        qs = Matricula.objects.filter(
            id_estudiante=data.get("id_estudiante"),
            id_grado=data.get("id_grado"),
            year=data.get("year"),
        )
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(
                "El estudiante ya tiene matrícula en ese grado y año."
            )
        return data


class MatriculaDetailSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(source="id_estudiante.nombre",       read_only=True)
    grado_nombre      = serializers.CharField(source="id_grado.nombre",            read_only=True)
    docente_nombre    = serializers.CharField(source="id_grado.id_docente.nombre", read_only=True)

    class Meta:
        model  = Matricula
        fields = [
            "id_matricula",
            "id_grado",      "grado_nombre", "docente_nombre",
            "id_estudiante", "estudiante_nombre",
            "year", "fecha_matricula", "estado",
        ]
