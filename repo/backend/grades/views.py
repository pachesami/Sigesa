from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .models import Nota
from .serializers import NotaBulkSerializer, NotaDetailSerializer, NotaSerializer


class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.select_related(
        "id_matricula__id_estudiante",
        "id_matricula__id_grado",
        "id_materia",
        "id_periodo",
    ).all()
    filterset_fields = ["id_matricula", "id_materia", "id_periodo",
                        "id_matricula__id_estudiante", "id_matricula__id_grado"]
    search_fields    = ["id_matricula__id_estudiante__nombre", "id_materia__nombre"]
    ordering_fields  = ["nota", "id_periodo__year", "id_periodo__numero_periodo"]
    ordering         = ["id_periodo__year", "id_periodo__numero_periodo"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return NotaDetailSerializer
        return NotaSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]

    @action(detail=False, methods=["post"], url_path="bulk", permission_classes=[IsAdminUser])
    def bulk_create(self, request):
        """
        POST /api/v1/grades/notas/bulk/
        Crea múltiples notas en una sola petición.
        Body: lista de objetos nota.
        """
        serializer = NotaBulkSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": f"{len(serializer.data)} notas creadas correctamente."},
            status=status.HTTP_201_CREATED,
        )
