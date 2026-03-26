from rest_framework import serializers
from .models import ConceptoPago, CuentaCobro, MetodoPago, Pago


class ConceptoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ConceptoPago
        fields = ["id_concepto_pago", "nombre"]


class MetodoPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MetodoPago
        fields = ["id_metodo", "nombre"]


class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Pago
        fields = [
            "id_pago", "id_cuenta_cobro", "fecha_pago",
            "monto_pago", "id_metodo_pago", "observaciones",
        ]

    def validate_monto_pago(self, value):
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a 0.")
        return value


class PagoDetailSerializer(serializers.ModelSerializer):
    metodo_nombre    = serializers.CharField(source="id_metodo_pago.nombre",                        read_only=True)
    estudiante_nombre = serializers.CharField(source="id_cuenta_cobro.id_matricula.id_estudiante.nombre", read_only=True)
    concepto_nombre  = serializers.CharField(source="id_cuenta_cobro.id_concepto_pago.nombre",      read_only=True)

    class Meta:
        model  = Pago
        fields = [
            "id_pago",
            "id_cuenta_cobro", "estudiante_nombre", "concepto_nombre",
            "fecha_pago", "monto_pago",
            "id_metodo_pago", "metodo_nombre",
            "observaciones",
        ]


class CuentaCobroSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CuentaCobro
        fields = [
            "id_cuenta", "id_matricula", "id_concepto_pago",
            "mes", "year", "valor_deuda", "estado",
        ]

    def validate_mes(self, value):
        if not (1 <= value <= 12):
            raise serializers.ValidationError("El mes debe estar entre 1 y 12.")
        return value


class CuentaCobroDetailSerializer(serializers.ModelSerializer):
    pagos             = PagoSerializer(many=True, read_only=True)
    saldo_pendiente   = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    estudiante_nombre = serializers.CharField(source="id_matricula.id_estudiante.nombre", read_only=True)
    concepto_nombre   = serializers.CharField(source="id_concepto_pago.nombre",           read_only=True)

    class Meta:
        model  = CuentaCobro
        fields = [
            "id_cuenta",
            "id_matricula", "estudiante_nombre",
            "id_concepto_pago", "concepto_nombre",
            "mes", "year", "valor_deuda", "estado",
            "saldo_pendiente", "pagos",
        ]
