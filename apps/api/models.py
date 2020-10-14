from django.db import models
from django.utils import timezone


def corrector_hora():
    return str(timezone.now() + timezone.timedelta(hours=-5)).split(".")[0]


class Jugador(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha = models.CharField(max_length=200, default=corrector_hora)
    n_juego = models.IntegerField()
    intento = models.IntegerField()
    error = models.CharField(max_length=200, default="No")
    n_error = models.IntegerField()
    sentimiento = models.CharField(max_length=200)
    movimiento = models.IntegerField()
    tiempo_entre_movimiento = models.IntegerField()
    posicion = models.CharField(max_length=200)
    tiempo_total = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre


class Children(models.Model):
    id = models.IntegerField(primary_key=True)
    vinculador = models.CharField(max_length=200)
    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=200)
    sexo = models.CharField(max_length=200)
    fecha_nacimiento = models.CharField(max_length=200)
    edad = models.IntegerField()
    colegio = models.CharField(max_length=200, blank=True, null=True)
    estrato = models.IntegerField(blank=True, null=True)
    nombre_acudiente = models.CharField(max_length=200)
    telefono = models.CharField(max_length=200, blank=True, null=True)
    correo = models.EmailField(blank=True, null=True)


def __str__(self):
    return self.sexo
