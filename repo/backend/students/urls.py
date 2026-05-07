from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegistroEstudianteView, AcudienteViewSet, EstudianteViewSet, RelacionEAViewSet

router = DefaultRouter()
router.register("estudiantes", EstudianteViewSet, basename="estudiante")
router.register("acudientes",  AcudienteViewSet,  basename="acudiente")
router.register("relaciones",  RelacionEAViewSet, basename="relacion-ea")

urlpatterns = [
    path("registro-completo/", RegistroEstudianteView.as_view(), name="registro-completo"),
    path("", include(router.urls)),
]


