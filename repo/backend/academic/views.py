from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Docente, Grado, Materia, Periodo
from .serializers import (
    DocenteSerializer, DocenteDetailSerializer,
    GradoSerializer, MateriaSerializer, PeriodoSerializer,
)


class DocenteViewSet(viewsets.ModelViewSet):
    queryset        = Docente.objects.select_related("id_usuario").all()
    search_fields   = ["nombre", "cedula", "correo"]
    ordering_fields = ["nombre"]
    ordering        = ["nombre"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return DocenteDetailSerializer
        return DocenteSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class GradoViewSet(viewsets.ModelViewSet):
    queryset         = Grado.objects.select_related("id_docente").all()
    serializer_class = GradoSerializer
    search_fields    = ["nombre"]
    filterset_fields = ["id_docente"]
    ordering_fields  = ["nombre"]
    ordering         = ["nombre"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class MateriaViewSet(viewsets.ModelViewSet):
    queryset         = Materia.objects.all()
    serializer_class = MateriaSerializer
    search_fields    = ["nombre"]
    ordering_fields  = ["nombre"]
    ordering         = ["nombre"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class PeriodoViewSet(viewsets.ModelViewSet):
    queryset         = Periodo.objects.all()
    serializer_class = PeriodoSerializer
    filterset_fields = ["year", "numero_periodo"]
    ordering_fields  = ["year", "numero_periodo"]
    ordering         = ["-year", "numero_periodo"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]
