from django.db import models
from django.core.validators import MinValueValidator


class ConceptoPago(models.Model):
    id_concepto_pago = models.BigAutoField(primary_key=True)
    nombre           = models.CharField(max_length=100)

    class Meta:
        db_table = "concepto_pago"
        verbose_name = "Concepto de Pago"
        verbose_name_plural = "Conceptos de Pago"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class MetodoPago(models.Model):
    id_metodo = models.BigAutoField(primary_key=True)
    nombre    = models.CharField(max_length=100)

    class Meta:
        db_table = "metodo_pago"
        verbose_name = "Método de Pago"
        verbose_name_plural = "Métodos de Pago"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class CuentaCobro(models.Model):
    ESTADO_CHOICES = [
        ("pendiente", "Pendiente"),
        ("pagada",    "Pagada"),
        ("vencida",   "Vencida"),
        ("anulada",   "Anulada"),
    ]
    MES_CHOICES = [(i, str(i)) for i in range(1, 13)]

    id_cuenta        = models.BigAutoField(primary_key=True)
    id_matricula     = models.ForeignKey(
        "enrollment.Matricula", on_delete=models.PROTECT,
        db_column="id_matricula", related_name="cuentas_cobro"
    )
    id_concepto_pago = models.ForeignKey(
        ConceptoPago, on_delete=models.PROTECT,
        db_column="id_concepto_pago", related_name="cuentas_cobro"
    )
    mes         = models.IntegerField(choices=MES_CHOICES)
    year        = models.IntegerField()
    valor_deuda = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    estado      = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="pendiente")

    class Meta:
        db_table = "cuenta_cobro"
        verbose_name = "Cuenta de Cobro"
        verbose_name_plural = "Cuentas de Cobro"
        ordering = ["-year", "-mes"]

    def __str__(self):
        return (
            f"{self.id_matricula.id_estudiante.nombre} | "
            f"{self.id_concepto_pago.nombre} | "
            f"{self.mes}/{self.year} — ${self.valor_deuda}"
        )

    @property
    def saldo_pendiente(self):
        total_pagado = sum(p.monto_pago for p in self.pagos.all())
        return self.valor_deuda - total_pagado


class Pago(models.Model):
    id_pago         = models.BigAutoField(primary_key=True)
    id_cuenta_cobro = models.ForeignKey(
        CuentaCobro, on_delete=models.PROTECT,
        db_column="id_cuenta_cobro", related_name="pagos"
    )
    fecha_pago     = models.DateField()
    monto_pago     = models.DecimalField(
        max_digits=10, decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    id_metodo_pago = models.ForeignKey(
        MetodoPago, on_delete=models.PROTECT,
        db_column="id_metodo_pago", related_name="pagos"
    )
    observaciones  = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "pago"
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"
        ordering = ["-fecha_pago"]

    def __str__(self):
        return f"Pago #{self.id_pago} — ${self.monto_pago} ({self.fecha_pago})"
