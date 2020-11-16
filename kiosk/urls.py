from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('test/<int:order_id>/', views.test),
    path('nlp/', views.nlp, {'text': '음성 없음'}),
    path('nlp/<text>/', views.nlp),
    path('voice/<int:order_id>/', views.voice),
    path('motion/<int:order_id>/', views.motion),
]
