import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import Faitier from './pages/Faitier';
import Benfeciaires from './pages/Beneficiaires';
import Intrants from './pages/Intrants';
import Fournisseur from './pages/Fournisseurs';
import Bonlivraison from './pages/Bonlivraisons';
import Bons from './pages/Bons';
import FormBeneficiaire from './ui/Forms/FormBenfeciaire';
import FormIntrants from './ui/Forms/FormIntrans';
import { FormFournisseurs } from './ui/Forms/FormFournisseur';
import FormBons from './ui/Forms/FormBon';
import FormBonLivraisons from './ui/Forms/FormBonLivraison';
import Update from './pages/Faitier/Updtatefaitier';
import { FormFaitieres } from './ui/Forms/FormFaitier/Formfaitier';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import UpdateBenef from './pages/Beneficiaires/UpdateBeneficiaire';
import UpdateIntrant from './pages/Intrants/UpdateIntrant';
import UpdateFournisseur from './pages/Fournisseurs/UpdateFournisseur';
import UpdateBon from './pages/Bons/UpdateBon';
import UpdateBonLivraison from './pages/Bonlivraisons/UpdateBonlivraison';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path='faitier' element={<Faitier />}/>
        <Route path='benef' element={<Benfeciaires />} />
        <Route path='intrans' element={<Intrants />} />
        <Route path='fournisseurs' element={<Fournisseur />} />
        <Route path='livraison' element={<Bonlivraison />} />
        <Route path='bons' element={<Bons />} />
        <Route path='ajouter_faitier'element = {<FormFaitieres />} />
        <Route path='ajouterb' element={<FormBeneficiaire />} />
        <Route path='ajouti' element={<FormIntrants />} />
        <Route path='ajoutf' element={<FormFournisseurs />} />
        <Route path='ajoutbon' element={<FormBons />} />
        <Route path='ajout_livraison' element={<FormBonLivraisons />} />
        <Route path='/Update/:id' element={<Update />} />
        <Route path='/UpdateBenef/:id' element={<UpdateBenef />} />
        <Route path='/UpdateIntrant/:id' element={<UpdateIntrant />} />
        <Route path='/UpdateFournisseur/:id' element={<UpdateFournisseur />} />
        <Route path='/UpdateBon/:id' element={<UpdateBon />} />
        <Route path='/UpdateBonLivraison/:id' element={<UpdateBonLivraison />} />


      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
