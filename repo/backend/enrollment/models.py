from django.db import models
from django.core.exceptions import ValidationError


class Matricula(models.Model):
    ESTADO_CHOICES = [
        ("activa",     "Activa"),
        ("inactiva",   "Inactiva"),
        ("retirado",   "Retirado"),
        ("graduado",   "Graduado"),
        ("trasladado", "Trasladado"),
    ]

    id_matricula    = models.BigAutoField(primary_key=True)
    id_grado        = models.ForeignKey(
        "academic.Grado", on_delete=models.PROTECT,
        db_column="id_grado", related_name="matriculas"
    )
    id_estudiante   = models.ForeignKey(
        "students.Estudiante", on_delete=models.PROTECT,
        db_column="id_estudiante", related_name="matriculas"
    )
    year            = models.IntegerField()
    fecha_matricula = models.DateField()
    estado          = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="activa")

    class Meta:
        db_table = "matricula"
        verbose_name = "Matrícula"
        verbose_name_plural = "Matrículas"
        ordering = ["-year", "id_estudiante"]
        constraints = [
            models.UniqueConstraint(
                fields=["id_estudiante", "id_grado", "year"],
                name="matricula_unique"
            )
        ]

    def __str__(self):
        return f"{self.id_estudiante.nombre} — {self.id_grado.nombre} ({self.year})"

    def clean(self):
        if self.year and (self.year < 2000 or self.year > 2100):
            raise ValidationError("El año de matrícula no es válido.")
