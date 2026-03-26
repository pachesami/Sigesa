from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotaViewSet

router = DefaultRouter()
router.register("notas", NotaViewSet, basename="nota")

urlpatterns = [path("", include(router.urls))]
