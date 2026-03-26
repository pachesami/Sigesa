from rest_framework import serializers
from .models import Acudiente, Estudiante, RelacionEA


class AcudienteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Acudiente
        fields = [
            "cedula", "nombre", "direccion", "telefono",
            "direccion_trabajo", "telefono_trabajo", "correo", "id_usuario",
        ]


class RelacionEASerializer(serializers.ModelSerializer):
    acudiente_nombre  = serializers.CharField(source="id_acudiente.nombre",  read_only=True)
    estudiante_nombre = serializers.CharField(source="id_estudiante.nombre", read_only=True)

    class Meta:
        model  = RelacionEA
        fields = [
            "id_relacion",
            "id_estudiante", "estudiante_nombre",
            "id_acudiente",  "acudiente_nombre",
            "parentesco", "acudiente_principal",
        ]


class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Estudiante
        fields = [
            "numero_identidad", "nombre", "fecha_nacimiento",
            "rh", "direccion", "observaciones",
        ]


class EstudianteDetailSerializer(serializers.ModelSerializer):
    acudientes = RelacionEASerializer(many=True, read_only=True)

    class Meta:
        model  = Estudiante
        fields = [
            "numero_identidad", "nombre", "fecha_nacimiento",
            "rh", "direccion", "observaciones", "acudientes",
        ]
