from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConceptoPagoViewSet, CuentaCobroViewSet, MetodoPagoViewSet, PagoViewSet

router = DefaultRouter()
router.register("conceptos", ConceptoPagoViewSet, basename="concepto-pago")
router.register("metodos",   MetodoPagoViewSet,   basename="metodo-pago")
router.register("cuentas",   CuentaCobroViewSet,  basename="cuenta-cobro")
router.register("pagos",     PagoViewSet,         basename="pago")

urlpatterns = [path("", include(router.urls))]
