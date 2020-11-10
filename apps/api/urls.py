from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'ultimo', views.UltimoViewSet, "ultimo")
router.register(r'jugador', views.JugadorViewSet, "jugador")
router.register(r'children', views.ChildrenViewSet, "children")
router.register(r'descarga', views.DescargaViewSet, "descarga")


urlpatterns = [
    path('', include(router.urls)),
]
