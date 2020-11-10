from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'html/Logo.html')
def heretogo(request):
    return render(request, 'html/HereToGo.html')
def select_menu(request):
    return render(request, 'html/Select_Menu.html')
def menu_combo(request):
    return render(request, 'html/Menu_Combo.html')
def menu_single(request):
    return render(request, 'html/Menu_Single.html')