from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcudienteViewSet, EstudianteViewSet, RelacionEAViewSet

router = DefaultRouter()
router.register("estudiantes", EstudianteViewSet, basename="estudiante")
router.register("acudientes",  AcudienteViewSet,  basename="acudiente")
router.register("relaciones",  RelacionEAViewSet, basename="relacion-ea")

urlpatterns = [path("", include(router.urls))]
