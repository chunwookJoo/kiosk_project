from django.urls import path
from . import views

urlpatterns = [
    path('<int:order_id>/', views.index),
    path('test/', views.test),
]
