from django.shortcuts import render
from .models import Faitieres,Beneficiaires,Intrants,Fournisseurs,Bons,Bon_livraisons
from .serializer import FaitieresSerializer,BeneficiairesSerializer,IntrantsSerializer,FournisseursSerializer,BonsSerializer,Bon_livraisonsSerializer,Registerserializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import authentication
from rest_framework.permissions import IsAuthenticated
from requests import Response
from django.contrib.auth.models import User

# Create your views here.

# Create your views here.
class RegisterViewset(ModelViewSet):
     permission_classes = [IsAuthenticated]
     authentication_classes = [authentication.SessionAuthentication]
     serializer_class = Registerserializer
     def get_queryset(self):
          return User.objects.all()

class FaitieresViewset(ModelViewSet):
     #permission_classes = [IsAuthenticated]
     #authentication_classes = [authentication.SessionAuthentication]

     serializer_class =  FaitieresSerializer

     def get_queryset(self):
          return Faitieres.objects.all()


class BeneficiairesViewset(ModelViewSet):
     serializer_class = BeneficiairesSerializer
     def get_queryset(self):
          return Beneficiaires.objects.all()
     

class IntrantsViewset(ModelViewSet):
     serializer_class = IntrantsSerializer
     #permission_classes = [IsAuthenticated]
     #authentication_classes = [authentication.SessionAuthentication]
     def get_queryset(self):
          return Intrants.objects.all()
     

class FournisseursSViewset(ModelViewSet):
     serializer_class = FournisseursSerializer
     #permission_classes = [IsAuthenticated]
     #authentication_classes = [authentication.SessionAuthentication]
     def get_queryset(self):
          return Fournisseurs.objects.all()
     

class BonsViewset(ModelViewSet):
     serializer_class = BonsSerializer
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [authentication.SessionAuthentication]
     def get_queryset(self):
        return Bons.objects.all()
     

class Bon_livraisonsViewset(ModelViewSet):
     serializer_class = Bon_livraisonsSerializer
    # permission_classes = [IsAuthenticated]
     #authentication_classes = [authentication.SessionAuthentication]
     def get_queryset(self):
          return Bon_livraisons.objects.all()



     