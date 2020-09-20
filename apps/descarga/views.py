from django.shortcuts import render
from django.http import HttpResponse

def descarga(request):
    return render(request, 'descarga/descarga.html')
