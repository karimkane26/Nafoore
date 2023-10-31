from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework import routers
from organisations.views import  FaitieresViewset,BeneficiairesViewset,IntrantsViewset,FournisseursSViewset,BonsViewset,Bon_livraisonsViewset,RegisterViewset

route = routers.SimpleRouter()

route.register('faitier',FaitieresViewset,basename='faitier ')
route.register('faitier/<int:id>',FaitieresViewset,basename='faitier1 ')


route.register('benef',BeneficiairesViewset,basename='benef')
route.register('intrans',IntrantsViewset,basename='intrants')
route.register('fournisseur',FournisseursSViewset,basename='fournisseur')
route.register('bons',BonsViewset,basename='bons')
route.register('bonl',Bon_livraisonsViewset,basename='bonl')
route.register('',RegisterViewset,basename='')

urlpatterns = [
    path('',include(route.urls)),
    path('login',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('refresh',TokenRefreshView.as_view(),name='token_refresh'),

]
