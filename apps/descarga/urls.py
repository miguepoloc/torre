from django.urls import path

from . import views

urlpatterns = [
    path('', views.descarga, name='descarga'),
]
