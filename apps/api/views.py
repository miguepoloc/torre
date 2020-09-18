from django.shortcuts import render
from rest_framework import views, viewsets, mixins
from rest_framework.response import Response
from .serializers import JugadorSerializer
from .models import Jugador

class JugadorViewSet(viewsets.ModelViewSet):

    queryset = Jugador.objects.all()
    serializer_class = JugadorSerializer


class JugadorList(mixins.ListModelMixin, viewsets.GenericViewSet):

    serializer_class = JugadorSerializer
    queryset = Jugador.objects.all()
