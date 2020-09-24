from rest_framework import serializers
from .models import Jugador, Children


class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = '__all__'
