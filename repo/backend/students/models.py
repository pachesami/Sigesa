from django.db import models


class Estudiante(models.Model):
    numero_identidad = models.CharField(max_length=20, primary_key=True)
    nombre           = models.CharField(max_length=150)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    rh               = models.CharField(max_length=5, null=True, blank=True)
    direccion        = models.CharField(max_length=200, null=True, blank=True)
    observaciones    = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "estudiante"
        verbose_name = "Estudiante"
        verbose_name_plural = "Estudiantes"
        ordering = ["nombre"]

    def __str__(self):
        return f"{self.nombre} ({self.numero_identidad})"


class Acudiente(models.Model):
    cedula            = models.CharField(max_length=20, primary_key=True)
    nombre            = models.CharField(max_length=150)
    direccion         = models.CharField(max_length=200, null=True, blank=True)
    telefono          = models.CharField(max_length=20, null=True, blank=True)
    direccion_trabajo = models.CharField(max_length=200, null=True, blank=True)
    telefono_trabajo  = models.CharField(max_length=20, null=True, blank=True)
    correo            = models.EmailField(max_length=100, null=True, blank=True)
    id_usuario        = models.ForeignKey(
        "users.Usuario", on_delete=models.SET_NULL,
        null=True, blank=True, db_column="id_usuario", related_name="acudiente"
    )

    class Meta:
        db_table = "acudiente"
        verbose_name = "Acudiente"
        verbose_name_plural = "Acudientes"
        ordering = ["nombre"]

    def __str__(self):
        return f"{self.nombre} ({self.cedula})"


class RelacionEA(models.Model):
    id_relacion         = models.BigAutoField(primary_key=True)
    id_estudiante       = models.ForeignKey(
        Estudiante, on_delete=models.CASCADE,
        db_column="id_estudiante", related_name="acudientes"
    )
    id_acudiente        = models.ForeignKey(
        Acudiente, on_delete=models.CASCADE,
        db_column="id_acudiente", related_name="estudiantes"
    )
    parentesco          = models.CharField(max_length=50, null=True, blank=True)
    acudiente_principal = models.BooleanField(default=False)

    class Meta:
        db_table = "relacion_ea"
        verbose_name = "Relación Estudiante-Acudiente"
        verbose_name_plural = "Relaciones Estudiante-Acudiente"
        unique_together = [("id_estudiante", "id_acudiente")]

    def __str__(self):
        return f"{self.id_estudiante} ↔ {self.id_acudiente} ({self.parentesco})"
