from django.shortcuts import get_object_or_404, render
from .modules.nlp.kakaoak import speech_to_text
from .modules.nlp.nlp import rndModel
from .models import order_time
# Create your views here.


def test(request, order_id):
    timestamp = get_object_or_404(order_time, pk=order_id)
    return render(request, 'html/index.html', {'order_time': timestamp})


def index(request):
    return render(request, 'html/Logo.html')


def heretogo(request):
    return render(request, 'html/HereToGo.html')


def menu(request):
    return render(request, 'html/Select_Menu.html')
