from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'main/index.html')


def index2(request, idx):
    return render(request, 'main/index2.html', {'nombrex': idx})
