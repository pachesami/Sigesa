from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Matricula
from .serializers import MatriculaDetailSerializer, MatriculaSerializer


class MatriculaViewSet(viewsets.ModelViewSet):
    queryset         = Matricula.objects.select_related("id_grado__id_docente", "id_estudiante").all()
    filterset_fields = ["id_grado", "id_estudiante", "year", "estado"]
    search_fields    = ["id_estudiante__nombre", "id_grado__nombre"]
    ordering_fields  = ["year", "fecha_matricula", "estado"]
    ordering         = ["-year"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return MatriculaDetailSerializer
        return MatriculaSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]
