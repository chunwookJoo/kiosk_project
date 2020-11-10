from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('here/', views.heretogo),
    path('menu/', views.menu),
    path('test/<int:order_id>/', views.test),
    path('nlp/', views.nlp, {'text': '내용 없음'}),
    path('nlp/<text>/', views.nlp),
]
