from rest_framework import serializers
from .models import Docente, Grado, Materia, Periodo


class DocenteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Docente
        fields = ["cedula", "nombre", "telefono", "correo", "id_usuario"]


class DocenteDetailSerializer(serializers.ModelSerializer):
    usuario_username = serializers.CharField(source="id_usuario.username", read_only=True)

    class Meta:
        model  = Docente
        fields = ["cedula", "nombre", "telefono", "correo", "id_usuario", "usuario_username"]


class GradoSerializer(serializers.ModelSerializer):
    docente_nombre = serializers.CharField(source="id_docente.nombre", read_only=True)

    class Meta:
        model  = Grado
        fields = ["id_grado", "nombre", "id_docente", "docente_nombre"]


class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Materia
        fields = ["id_materia", "nombre"]


class PeriodoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Periodo
        fields = ["id_periodo", "numero_periodo", "year"]

    def validate(self, data):
        qs = Periodo.objects.filter(
            numero_periodo=data["numero_periodo"], year=data["year"]
        )
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Ya existe un período con ese número y año.")
        return data
