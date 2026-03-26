from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MeView, RolViewSet, UsuarioViewSet

router = DefaultRouter()
router.register("usuarios", UsuarioViewSet, basename="usuario")
router.register("roles",    RolViewSet,    basename="rol")

urlpatterns = [
    path("", include(router.urls)),
    path("me/", MeView.as_view(), name="me"),
]
