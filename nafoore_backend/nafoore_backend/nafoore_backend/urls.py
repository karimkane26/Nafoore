from django.contrib import admin
from django.urls import path,include
from organisations import views

urlpatterns = [
    path('',include('account.urls')),
    path('admin/', admin.site.urls),
    path('organisations/',include('organisations.urls')),
    path('auth/',include('account.urls')),
]
