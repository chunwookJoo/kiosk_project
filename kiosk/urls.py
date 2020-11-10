from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('here/', views.heretogo),
<<<<<<< HEAD
    path('menu/', views.menu),
    path('test/<int:order_id>/', views.test),
    path('nlp/', views.nlp, {'text': '내용 없음'}),
    path('nlp/<text>/', views.nlp),
=======
    path('menu/', views.select_menu),
    path('combo/', views.menu_combo),
    path('single/', views.menu_single),
    path('side/', views.menu_side),
    path('drink/', views.menu_drink),
>>>>>>> bb56c077c629393c5e92d9843420c032cb2aa8e8
]
