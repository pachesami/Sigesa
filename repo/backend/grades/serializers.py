from rest_framework import serializers
from .models import Nota


class NotaSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Nota
        fields = [
            "id_nota", "id_matricula", "id_materia",
            "id_periodo", "nota", "observacion",
        ]

    def validate_nota(self, value):
        if value is not None and not (0 <= value <= 10):
            raise serializers.ValidationError("La nota debe estar entre 0 y 10.")
        return value

    def validate(self, data):
        qs = Nota.objects.filter(
            id_matricula=data.get("id_matricula"),
            id_materia=data.get("id_materia"),
            id_periodo=data.get("id_periodo"),
        )
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError(
                "Ya existe una nota para esta materia en este período y matrícula."
            )
        return data


class NotaDetailSerializer(serializers.ModelSerializer):
    estudiante_nombre = serializers.CharField(
        source="id_matricula.id_estudiante.nombre", read_only=True
    )
    materia_nombre = serializers.CharField(
        source="id_materia.nombre", read_only=True
    )
    periodo_numero = serializers.IntegerField(
        source="id_periodo.numero_periodo", read_only=True
    )
    periodo_year   = serializers.IntegerField(
        source="id_periodo.year", read_only=True
    )
    grado_nombre   = serializers.CharField(
        source="id_matricula.id_grado.nombre", read_only=True
    )

    class Meta:
        model  = Nota
        fields = [
            "id_nota",
            "id_matricula", "estudiante_nombre", "grado_nombre",
            "id_materia",   "materia_nombre",
            "id_periodo",   "periodo_numero",    "periodo_year",
            "nota", "observacion",
        ]


class BulkNotaSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        notas = [Nota(**item) for item in validated_data]
        return Nota.objects.bulk_create(notas, ignore_conflicts=True)


class NotaBulkSerializer(serializers.ModelSerializer):
    class Meta:
        model       = Nota
        fields      = ["id_matricula", "id_materia", "id_periodo", "nota", "observacion"]
        list_serializer_class = BulkNotaSerializer
