from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocenteViewSet, GradoViewSet, MateriaViewSet, PeriodoViewSet

router = DefaultRouter()
router.register("docentes", DocenteViewSet, basename="docente")
router.register("grados",   GradoViewSet,   basename="grado")
router.register("materias", MateriaViewSet, basename="materia")
router.register("periodos", PeriodoViewSet, basename="periodo")

urlpatterns = [path("", include(router.urls))]
