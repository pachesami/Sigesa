from rest_framework import serializers
from django.db import transaction
from enrollment.models import Matricula
from enrollment.serializers import MatriculaSerializer
from academic.models import Grado
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

class AcudienteRegistroSerializer(serializers.Serializer):
    cedula = serializers.CharField()
    nombre = serializers.CharField()
    direccion = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    telefono = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    direccion_trabajo = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    telefono_trabajo = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    correo = serializers.EmailField(required=False, allow_blank=True, allow_null=True)
    parentesco = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    acudiente_principal = serializers.BooleanField(default=False)


class MatriculaRegistroSerializer(serializers.Serializer):
    id_grado = serializers.PrimaryKeyRelatedField(queryset=Grado.objects.all())
    year = serializers.IntegerField()
    fecha_matricula = serializers.DateField()
    estado = serializers.ChoiceField(choices=Matricula.ESTADO_CHOICES, default="activa")

    def validate_year(self, value):
        if value < 2000 or value > 2100:
            raise serializers.ValidationError("El año de matrícula no es válido.")
        return value


class RegistroEstudianteSerializer(serializers.Serializer):
    estudiante = EstudianteSerializer()
    matricula = MatriculaRegistroSerializer()
    acudientes = AcudienteRegistroSerializer(many=True, required=False)

    def validate(self, data):
        estudiante_data = data.get("estudiante") or {}
        numero_identidad = estudiante_data.get("numero_identidad")
        if numero_identidad and Estudiante.objects.filter(pk=numero_identidad).exists():
            raise serializers.ValidationError("El estudiante ya existe.")

        acudientes = data.get("acudientes") or []
        principales = sum(1 for item in acudientes if item.get("acudiente_principal"))
        if principales > 1:
            raise serializers.ValidationError("Solo puede haber un acudiente principal.")

        matricula_data = data.get("matricula") or {}
        id_grado = matricula_data.get("id_grado")
        year = matricula_data.get("year")
        if numero_identidad and id_grado and year:
            existe = Matricula.objects.filter(
                id_estudiante_id=numero_identidad,
                id_grado=id_grado,
                year=year,
            ).exists()
            if existe:
                raise serializers.ValidationError(
                    "El estudiante ya tiene matrícula en ese grado y año."
                )

        return data

    def create(self, validated_data):
        estudiante_data = validated_data.get("estudiante")
        matricula_data = validated_data.get("matricula")
        acudientes_data = validated_data.get("acudientes", [])

        with transaction.atomic():
            estudiante = Estudiante.objects.create(**estudiante_data)
            relaciones = []

            for acudiente_data in acudientes_data:
                parentesco = acudiente_data.pop("parentesco", None)
                acudiente_principal = acudiente_data.pop("acudiente_principal", False)
                cedula = acudiente_data.get("cedula")

                acudiente, created = Acudiente.objects.get_or_create(
                    cedula=cedula,
                    defaults=acudiente_data,
                )
                if not created:
                    # No sobreescribimos datos existentes del acudiente.
                    pass

                relacion, created_rel = RelacionEA.objects.get_or_create(
                    id_estudiante=estudiante,
                    id_acudiente=acudiente,
                    defaults={
                        "parentesco": parentesco,
                        "acudiente_principal": acudiente_principal,
                    },
                )
                if not created_rel:
                    relacion.parentesco = parentesco
                    relacion.acudiente_principal = acudiente_principal
                    relacion.save()

                relaciones.append(relacion)

            matricula = Matricula.objects.create(id_estudiante=estudiante, **matricula_data)

        return {
            "estudiante": EstudianteSerializer(estudiante).data,
            "matricula": MatriculaSerializer(matricula).data,
            "acudientes": RelacionEASerializer(relaciones, many=True).data,
        }





