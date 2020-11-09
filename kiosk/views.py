from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'html/Logo.html')
def heretogo(request):
    return render(request, 'html/HereToGo.html')
def menu(request):
    return render(request, 'html/Select_Menu.html')