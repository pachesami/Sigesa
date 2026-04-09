from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Nota(models.Model):
    id_nota      = models.BigAutoField(primary_key=True)
    id_matricula = models.ForeignKey(
        "enrollment.Matricula", on_delete=models.CASCADE,
        db_column="id_matricula", related_name="notas"
    )
    id_materia   = models.ForeignKey(
        "academic.Materia", on_delete=models.PROTECT,
        db_column="id_materia", related_name="notas"
    )
    id_periodo   = models.ForeignKey(
        "academic.Periodo", on_delete=models.PROTECT,
        db_column="id_periodo", related_name="notas"
    )
    nota         = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True,
        validators=[MinValueValidator(0), MaxValueValidator(10)],
    )
    observacion  = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "nota"
        verbose_name = "Nota"
        verbose_name_plural = "Notas"
        ordering = ["id_matricula", "id_periodo", "id_materia"]
        constraints = [
            models.UniqueConstraint(
                fields=["id_matricula", "id_materia", "id_periodo"],
                name="nota_unique"
            )
        ]

    def __str__(self):
        return (
            f"{self.id_matricula.id_estudiante.nombre} | "
            f"{self.id_materia.nombre} | "
            f"P{self.id_periodo.numero_periodo}/{self.id_periodo.year}: {self.nota}"
        )
