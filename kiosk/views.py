from json import encoder
from django.shortcuts import get_object_or_404, render
from django.utils.encoding import uri_to_iri
from asgiref.sync import sync_to_async
from .modules.nlp.kakaoak import speech_to_text
from .modules.nlp.nlp import rndModel
from .models import *
# Create your views here.

from django.http.response import HttpResponse, JsonResponse

sync_to_async(rndModel, thread_sensitive=True)


def nlp(request, text='내용 없음'):
    result = {'result': f'{rndModel(uri_to_iri(text))}'}
    response = JsonResponse(result)
    return response


def test(request, order_id):
    return render(request, 'html/test.html', {'order_id': order_id})


def index(request):
    return render(request, 'html/Logo.html')


def heretogo(request):
    return render(request, 'html/HereToGo.html')
<<<<<<< HEAD


def menu(request):
    return render(request, 'html/Select_Menu.html')
=======
def select_menu(request):
    return render(request, 'html/Select_Menu.html')
def menu_combo(request):
    return render(request, 'html/Menu_Combo.html')
def menu_single(request):
    return render(request, 'html/Menu_Single.html')
def menu_side(request):
    return render(request, 'html/Menu_Side.html')
def menu_drink(request):
    return render(request, 'html/Menu_Drink.html')
>>>>>>> bb56c077c629393c5e92d9843420c032cb2aa8e8
