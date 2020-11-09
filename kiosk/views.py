from django.shortcuts import get_object_or_404, render
from .modules.nlp.kakaoak import speech_to_text
from .modules.nlp.nlp import rndModel
from .models import order_time
# Create your views here.


def index(request, order_id):
    timestamp = get_object_or_404(order_time, pk=order_id)
    return render(request, 'html/index.html', {'order_time': timestamp})


def test(request):
    stt_result = rndModel(speech_to_text())
    return render(request, 'html/test.html', {'stt_result': stt_result})
