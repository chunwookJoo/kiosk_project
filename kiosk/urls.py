from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('nlp/', views.nlp, {'text': '음성 없음'}),
    path('nlp/<text>/', views.nlp),
    path('voice/', views.voice),
    path('motion/', views.motion),
]
