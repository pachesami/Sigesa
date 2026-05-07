from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Acudiente, Estudiante, RelacionEA
from .serializers import (
    RegistroEstudianteSerializer,
    AcudienteSerializer, EstudianteDetailSerializer,
    EstudianteSerializer, RelacionEASerializer,
)


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset         = Estudiante.objects.prefetch_related("acudientes__id_acudiente").all()
    search_fields    = ["nombre", "numero_identidad"]
    filterset_fields = ["rh"]
    ordering_fields  = ["nombre", "fecha_nacimiento"]
    ordering         = ["nombre"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return EstudianteDetailSerializer
        return EstudianteSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class AcudienteViewSet(viewsets.ModelViewSet):
    queryset         = Acudiente.objects.select_related("id_usuario").all()
    serializer_class = AcudienteSerializer
    search_fields    = ["nombre", "cedula", "correo"]
    ordering_fields  = ["nombre"]
    ordering         = ["nombre"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class RelacionEAViewSet(viewsets.ModelViewSet):
    queryset         = RelacionEA.objects.select_related("id_estudiante", "id_acudiente").all()
    serializer_class = RelacionEASerializer
    filterset_fields = ["id_estudiante", "id_acudiente", "acudiente_principal"]
    ordering_fields  = ["id_estudiante"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [IsAuthenticated()]
        return [IsAdminUser()]


class RegistroEstudianteView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = RegistroEstudianteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_201_CREATED)



