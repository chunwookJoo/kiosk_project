from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('here/', views.heretogo),
    path('menu/', views.select_menu),
    path('combo/', views.menu_combo),
    path('single/', views.menu_single),
    path('side/', views.menu_side),
    path('drink/', views.menu_drink),
]
