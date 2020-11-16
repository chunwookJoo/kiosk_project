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
    return render(request, 'voice/test.html', {'order_id': order_id})


def voice(request, order_id):
    return render(request, 'voice/test.html', {'order_id': order_id})


def motion(request, order_id):
    return render(request, 'motion/test.html', {'order_id': order_id})
