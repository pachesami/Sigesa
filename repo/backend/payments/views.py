from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import ConceptoPago, CuentaCobro, MetodoPago, Pago
from .serializers import (
    ConceptoPagoSerializer, CuentaCobroDetailSerializer,
    CuentaCobroSerializer, MetodoPagoSerializer,
    PagoDetailSerializer, PagoSerializer,
)


class ConceptoPagoViewSet(viewsets.ModelViewSet):
    queryset         = ConceptoPago.objects.all()
    serializer_class = ConceptoPagoSerializer
    search_fields    = ["nombre"]
    ordering         = ["nombre"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class MetodoPagoViewSet(viewsets.ModelViewSet):
    queryset         = MetodoPago.objects.all()
    serializer_class = MetodoPagoSerializer
    search_fields    = ["nombre"]
    ordering         = ["nombre"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class CuentaCobroViewSet(viewsets.ModelViewSet):
    queryset = CuentaCobro.objects.select_related(
        "id_matricula__id_estudiante",
        "id_concepto_pago",
    ).prefetch_related("pagos").all()
    filterset_fields = ["id_matricula", "estado", "mes", "year", "id_concepto_pago"]
    search_fields    = ["id_matricula__id_estudiante__nombre", "id_concepto_pago__nombre"]
    ordering_fields  = ["year", "mes", "valor_deuda", "estado"]
    ordering         = ["-year", "-mes"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CuentaCobroDetailSerializer
        return CuentaCobroSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]

    @action(detail=True, methods=["post"], url_path="pagar", permission_classes=[IsAdminUser])
    def registrar_pago(self, request, pk=None):
        """
        POST /api/v1/payments/cuentas/{id}/pagar/
        Registra un pago sobre esta cuenta de cobro.
        """
        cuenta = self.get_object()
        serializer = PagoSerializer(data={**request.data, "id_cuenta_cobro": cuenta.pk})
        serializer.is_valid(raise_exception=True)
        pago = serializer.save()

        # Actualizar estado de la cuenta si el saldo quedó en 0
        if cuenta.saldo_pendiente <= 0:
            cuenta.estado = "pagada"
            cuenta.save(update_fields=["estado"])

        return Response(PagoSerializer(pago).data, status=status.HTTP_201_CREATED)


class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.select_related(
        "id_cuenta_cobro__id_matricula__id_estudiante",
        "id_cuenta_cobro__id_concepto_pago",
        "id_metodo_pago",
    ).all()
    filterset_fields = ["id_cuenta_cobro", "id_metodo_pago", "fecha_pago"]
    search_fields    = ["id_cuenta_cobro__id_matricula__id_estudiante__nombre"]
    ordering_fields  = ["fecha_pago", "monto_pago"]
    ordering         = ["-fecha_pago"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PagoDetailSerializer
        return PagoSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]
