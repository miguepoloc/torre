from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'jugador', views.JugadorViewSet, "jugador")
router.register(r'jugadorx', views.JugadorList, "jugador2")

urlpatterns = [
    path('', include(router.urls)),
]
