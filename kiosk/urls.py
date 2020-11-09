from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('here/', views.heretogo),
    path('menu/', views.menu),
]
