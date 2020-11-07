from django.shortcuts import render
from rest_framework import views, viewsets, mixins
from rest_framework.response import Response
from .serializers import JugadorSerializer, ChildrenSerializer
from .models import Jugador, Children


class JugadorViewSet(viewsets.ModelViewSet):

    queryset = Jugador.objects.all().order_by('id')
    serializer_class = JugadorSerializer


class DescargaViewSet(viewsets.ModelViewSet):

    queryset = Jugador.objects.all().order_by('nombre', 'id')
    serializer_class = JugadorSerializer


class ChildrenViewSet(viewsets.ModelViewSet):

    queryset = Children.objects.all().order_by('id')
    serializer_class = ChildrenSerializer
