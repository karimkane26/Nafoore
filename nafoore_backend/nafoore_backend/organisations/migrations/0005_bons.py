# Generated by Django 4.2.1 on 2023-06-12 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organisations', '0004_fournisseurs'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=100, unique=True)),
                ('date', models.DateField(null=True)),
                ('quantite_livree', models.IntegerField()),
                ('prix_unitaire', models.IntegerField()),
                ('montant_subvention', models.IntegerField()),
                ('caracteristique', models.TextField()),
                ('regler', models.BooleanField(default=False)),
                ('beneficiaire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bons', to='organisations.beneficiaires')),
                ('fournisseur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bons', to='organisations.fournisseurs')),
                ('intrant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Bons', to='organisations.intrants')),
            ],
        ),
    ]
