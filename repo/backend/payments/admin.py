from django.contrib import admin
from .models import ConceptoPago, CuentaCobro, MetodoPago, Pago


@admin.register(ConceptoPago)
class ConceptoPagoAdmin(admin.ModelAdmin):
    list_display  = ["id_concepto_pago", "nombre"]
    search_fields = ["nombre"]


@admin.register(MetodoPago)
class MetodoPagoAdmin(admin.ModelAdmin):
    list_display  = ["id_metodo", "nombre"]
    search_fields = ["nombre"]


class PagoInline(admin.TabularInline):
    model = Pago
    extra = 0


@admin.register(CuentaCobro)
class CuentaCobroAdmin(admin.ModelAdmin):
    inlines      = [PagoInline]
    list_display  = ["id_cuenta", "id_matricula", "id_concepto_pago", "mes", "year", "valor_deuda", "estado"]
    list_filter   = ["estado", "year", "mes", "id_concepto_pago"]
    search_fields = ["id_matricula__id_estudiante__nombre"]
    ordering      = ["-year", "-mes"]


@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display  = ["id_pago", "id_cuenta_cobro", "fecha_pago", "monto_pago", "id_metodo_pago"]
    list_filter   = ["id_metodo_pago", "fecha_pago"]
    search_fields = ["id_cuenta_cobro__id_matricula__id_estudiante__nombre"]
    ordering      = ["-fecha_pago"]
