from django.db import models

# Create your models here
CHOICES_BENEFICIARES =(
    ('organisations_producteurs','ORGANISATIONS DE PRODUCTEURS'),
    ('agregateur','AGREGATEUR'),
    ('institut_financiere','INSTITUT FINANCIERE'),
    ('Fournisseur_intrants','FOURNISSEUR INTRANTS'),
    ('producteur_individuel','PRODUCTEUR INDIVIDUEL'),
    ('autre','AUTRE'),
)
CHOICES_INTRANTS = (
    ('pompage','KIT DE POMPAGE'),
    ('semence','SEMENCE'),
    ('engrais_chimique','ENGRAIS CHIMIQUE'),
    ('engrais_organique','ENGRAIS ORGANIQUE')
)
CHOICES_GENRES = (
    ('homme','HOMME'),
    ('femme','FEMME'),
)

CHOICES_AGES = (
    ('jeune','[15-29]'),
    ('adulte','+30'),
)
class Faitieres(models.Model):
    nom_faitiere = models.CharField(max_length=100,unique=True)

    
class Beneficiaires(models.Model):
    type = models.CharField(max_length=100,choices=CHOICES_BENEFICIARES,blank=True)
    nom_faitiere = models.ForeignKey('Faitieres',on_delete=models.CASCADE,related_name='benefeciaire')
    prenom_nom = models.CharField(max_length=100,blank=True)
    commune = models.CharField(max_length=100,blank=True)
    adresse = models.CharField(max_length=100,blank=True)
    cni = models.CharField(max_length=50,blank=True)
    telephone = models.CharField(max_length=12,blank=True)
    genre = models.CharField(max_length=100,choices=CHOICES_GENRES,blank=True)
    age = models.CharField(max_length=100,blank=True,choices=CHOICES_AGES)
    localisation_parcelle = models.CharField(max_length=100,blank=True)
    superficie = models.DecimalField(max_digits=10,decimal_places=2,blank=True,null=True)
    

class Intrants(models.Model):
    libelle = models.CharField(max_length=100,unique=True)
    type = models.CharField(max_length=100,choices=CHOICES_INTRANTS)


class Fournisseurs(models.Model):
    libelle_entreprise = models.CharField(max_length=100,unique=True)


class Bons(models.Model):
    beneficiaire = models.ForeignKey('Beneficiaires',on_delete=models.CASCADE, related_name='bons')
    intrant = models.ForeignKey('Intrants',on_delete=models.CASCADE,related_name='Bons')
    fournisseur = models.ForeignKey('Fournisseurs',on_delete=models.CASCADE,related_name='bons')
    code = models.CharField(max_length=100,unique=True)
    date = models.DateField(null=True)
    quantite_livree = models.IntegerField()
    prix_unitaire = models.IntegerField()
    montant_subvention=models.IntegerField()
    caracteristique = models.TextField()
    regler = models.BooleanField(default=False)


class Bon_livraisons(models.Model):
    bon = models.ForeignKey('Bons',on_delete=models.CASCADE,related_name='bon_livraisons')
    beneficiaire = models.ForeignKey('Beneficiaires',on_delete=models.CASCADE,related_name='bon_livraisons')
    intrant = models.ForeignKey('Intrants',on_delete=models.CASCADE,related_name='bon_livraisons')
    fournisseur = models.ForeignKey('Fournisseurs',on_delete=models.CASCADE,related_name='bon_livraisons')
    reference_bl = models.CharField(max_length=100,blank=True)
    reference_facture = models.CharField(max_length=100,blank=True)
    date_livraison = models.DateField(null=True)
    date_installation = models.DateField(null=True)
    observation = models.TextField(null=True)
    facture = models.TextField(null=True)
    Bon_livraisons = models.TextField(null=True)