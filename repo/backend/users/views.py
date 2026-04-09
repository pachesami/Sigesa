from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Rol, Usuario, UsuarioRol
from .serializers import (
    LoginSerializer, RolSerializer,
    UsuarioCreateSerializer, UsuarioSerializer, UsuarioUpdateSerializer,
)


class LoginView(APIView):
    """POST /api/v1/auth/login/ — Retorna access + refresh token."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """POST /api/v1/auth/logout/ — Invalida el refresh token."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
            token.blacklist()
            return Response({"detail": "Sesión cerrada."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"detail": "Token inválido."}, status=status.HTTP_400_BAD_REQUEST)


class UsuarioViewSet(viewsets.ModelViewSet):
    """CRUD completo de usuarios (solo admin)."""
    queryset = Usuario.objects.prefetch_related("roles__id_rol").all()
    search_fields   = ["username"]
    ordering_fields = ["username", "fecha_creacion"]
    ordering        = ["username"]

    def get_serializer_class(self):
        if self.action == "create":
            return UsuarioCreateSerializer
        if self.action in ["update", "partial_update"]:
            return UsuarioUpdateSerializer
        return UsuarioSerializer

    def get_permissions(self):
        return [IsAdminUser()]


class MeView(generics.RetrieveUpdateAPIView):
    """GET/PATCH /api/v1/users/me/ — Perfil del usuario autenticado."""
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UsuarioUpdateSerializer
        return UsuarioSerializer


class RolViewSet(viewsets.ModelViewSet):
    """CRUD de roles (solo admin)."""
    queryset          = Rol.objects.all()
    serializer_class  = RolSerializer
    permission_classes = [IsAdminUser]
    search_fields     = ["nombre"]
