from django.shortcuts import get_object_or_404, render
from django.utils.encoding import uri_to_iri
from django.template import loader
from asgiref.sync import sync_to_async
from .modules.nlp.nlp import rndModel
from .models import *
from django.http.response import HttpResponse, HttpResponseRedirect, JsonResponse
# Create your views here.


# sync_to_async(rndModel, thread_sensitive=True)
def nlp(request, text):
    nlp_result = rndModel(uri_to_iri(text))
    if nlp_result is None:
        nlp_result = {'result': 0}
    response = JsonResponse(nlp_result)
    return response


def test(request, order_id):
    return render(request, 'html/test.html', {'order_id': order_id})


def index(request):
    return render(request, 'html/Logo.html')


def heretogo(request):
    return render(request, 'html/HereToGo.html')


def select_menu(request):
    return render(request, 'html/Select_Menu.html')


def menu_single(request):
    return render(request, 'html/Menu_Single.html')


def menu_combo(request):
    return render(request, 'html/Menu_Combo.html')


def menu_side(request):
    return render(request, 'html/Menu_Side.html')


def menu_drink(request):
    return render(request, 'html/Menu_Drink.html')


def payment(request):
    return render(request, 'html/Payment.html')
