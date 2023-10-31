from rest_framework.serializers import ModelSerializer
from .models import Faitieres,Beneficiaires,Intrants,Fournisseurs,Bons,Bon_livraisons
from django.contrib.auth.models import User
class Registerserializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']
        
class FaitieresSerializer(ModelSerializer):
    class Meta:
        model = Faitieres
        fields = ['id','nom_faitiere']

class BeneficiairesSerializer(ModelSerializer):
    class Meta:
        model = Beneficiaires
        fields = ['id','type','nom_faitiere','prenom_nom','commune','adresse','cni','telephone','genre','age','localisation_parcelle','superficie']
        #fields = '__all__'


class IntrantsSerializer(ModelSerializer):
    class Meta:
        model = Intrants
        fields = ['id','libelle','type']


class FournisseursSerializer(ModelSerializer):
    class Meta:
        model = Fournisseurs
        fields = [ 'id','libelle_entreprise']


class BonsSerializer(ModelSerializer):
    class Meta:
        model = Bons
        fields = [ 'id','beneficiaire','intrant','fournisseur','code','date','quantite_livree','prix_unitaire','montant_subvention','caracteristique','regler']


class Bon_livraisonsSerializer(ModelSerializer):
    class Meta:
        model = Bon_livraisons
        fields = ['id', 'bon','beneficiaire','intrant','fournisseur','reference_bl','reference_facture','date_livraison','date_installation','observation','facture','Bon_livraisons']
    