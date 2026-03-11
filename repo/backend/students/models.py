from django.db import models


class Student(models.Model):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    age = models.IntegerField()
    document_number = models.CharField(max_length=20, unique=True)
    rh = models.CharField(max_length=5)
    address = models.CharField(max_length=200)
    grade = models.CharField(max_length=20)
    parent_name = models.CharField(max_length=100)
    parent_phone = models.CharField(max_length=20)
    parent_work_address = models.CharField(max_length=200)
    parent_work_phone = models.CharField(max_length=20)
    guardian_name = models.CharField(max_length=100)
    observations = models.TextField(blank=True, null=True)
    parent_signature = models.ImageField(upload_to="signatures/")
    student_signature = models.ImageField(upload_to="signatures/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"