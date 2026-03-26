from django.db import models


class Docente(models.Model):
    cedula     = models.CharField(max_length=20, primary_key=True)
    nombre     = models.CharField(max_length=150)
    telefono   = models.CharField(max_length=20, blank=True, null=True)
    correo     = models.EmailField(max_length=100, blank=True, null=True)
    id_usuario = models.ForeignKey(
        "users.Usuario", on_delete=models.SET_NULL,
        null=True, blank=True, db_column="id_usuario", related_name="docente"
    )

    class Meta:
        db_table = "docente"
        verbose_name = "Docente"
        verbose_name_plural = "Docentes"
        ordering = ["nombre"]

    def __str__(self):
        return f"{self.nombre} ({self.cedula})"


class Grado(models.Model):
    id_grado   = models.BigAutoField(primary_key=True)
    nombre     = models.CharField(max_length=100)
    id_docente = models.ForeignKey(
        Docente, on_delete=models.SET_NULL,
        null=True, blank=True, db_column="id_docente", related_name="grados"
    )

    class Meta:
        db_table = "grado"
        verbose_name = "Grado"
        verbose_name_plural = "Grados"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Materia(models.Model):
    id_materia = models.BigAutoField(primary_key=True)
    nombre     = models.CharField(max_length=100)

    class Meta:
        db_table = "materia"
        verbose_name = "Materia"
        verbose_name_plural = "Materias"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Periodo(models.Model):
    id_periodo     = models.BigAutoField(primary_key=True)
    numero_periodo = models.IntegerField()
    year           = models.IntegerField()

    class Meta:
        db_table = "periodo"
        verbose_name = "Período"
        verbose_name_plural = "Períodos"
        ordering = ["-year", "numero_periodo"]
        constraints = [
            models.UniqueConstraint(
                fields=["numero_periodo", "year"], name="periodo_unique"
            )
        ]

    def __str__(self):
        return f"Período {self.numero_periodo} — {self.year}"
