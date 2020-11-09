from django.urls import path
from . import views

urlpatterns = [
    path('test/<int:order_id>/', views.test),
    path('', views.index),
    path('here/', views.heretogo),
    path('menu/', views.menu),
]
