from django.urls import path
from . import views

urlpatterns = [
    path('test/<int:order_id>/', views.test),
    path('nlp/', views.nlp, {'text': '내용 없음'}),
    path('nlp/<text>/', views.nlp),
    path('', views.index),
    path('here/', views.heretogo),
    path('menu/', views.select_menu),
    path('single/', views.menu_single),
    path('combo/', views.menu_combo),
    path('side/', views.menu_side),
    path('drink/', views.menu_drink),
]
