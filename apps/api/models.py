from django.db import models
from django.utils import timezone

def corrector_hora():
    return str(timezone.now() + timezone.timedelta(hours=-5)).split(".")[0]

class Jugador(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    fecha = models.CharField(max_length=200, default=corrector_hora)
    jugada = models.IntegerField()
    tiempo_entre_jugada = models.IntegerField()
    posicion = models.CharField(max_length=200)
    tiempo_total = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre
