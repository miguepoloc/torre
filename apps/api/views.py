from django.shortcuts import render
from rest_framework import views, viewsets, mixins
from rest_framework.response import Response
from .serializers import JugadorSerializer, ChildrenSerializer
from .models import Jugador, Children


class JugadorViewSet(viewsets.ModelViewSet):

    queryset = Jugador.objects.all()
    serializer_class = JugadorSerializer


class ChildrenViewSet(viewsets.ModelViewSet):

    queryset = Children.objects.all()
    serializer_class = ChildrenSerializer
