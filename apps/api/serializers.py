from rest_framework import serializers
from .models import Jugador, Children, UltimoDato


class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'


class UltimoDatoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UltimoDato
        fields = '__all__'


class ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = '__all__'
