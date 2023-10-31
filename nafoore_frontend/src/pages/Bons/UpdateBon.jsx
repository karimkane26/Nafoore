import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useState,useEffect} from "react";
import * as Yup from "yup"
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
function UpdateBon(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [values,setValues] = useState({id:id,beneficiaire:'',intrant:'',fournisseur:'',code:'',date:'',quantite_livree:'',prix_unitaire:'',montant_subvention:'',caracteristique :'',regler:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/bons/"+id)
            .then(response => setValues({...values,beneficiaire:response.data.beneficiaire,intrant:response.data.intrant,fournisseur:response.data.fournisseur,code:response.data.code,date:response.data.date,quantite_livree:response.data.quantite_livree,prix_unitaire:response.data.prix_unitaire,montant_subvention:response.data.montant_subvention,caracteristique:response.data.caracteristique,regler:response.data.regler})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/bons/'+id+'/', values)
        .then((response) => setValues({...values,beneficiaire:response.data.beneficiaire,intrant:response.data.intrant,fournisseur:response.data.fournisseur,code:response.data.code,date:response.data.date,quantite_livree:response.data.quantite_livree,prix_unitaire:response.data.prix_unitaire,montant_subvention:response.data.montant_subvention,caracteristique:response.data.caracteristique,regler:response.data.regle}))
        .catch((error) => console.log(error))
         navigate("/bons")

    }
    return(
        <Box sx={{ overflowY: "scroll", height: "80vh" }}>
          <h2 style={{ textAlign: "center" }}>Titre</h2>
          <form onSubmit={handleSubmit}>
            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Faitiere</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="nom_faitiere"
                fullWidth
                
                value={values.nom_faitiere}
                onChange={e => setValues({...values,nom_faitiere:e.target.value})}

              >
              </Select>
            </Box>

            <Box sx={{ minWidth: 120 }}> 
              <InputLabel id="demo-simple-select-label">
                Beneficiaire
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="beneficiaire"
                fullWidth
                
                value={values.beneficiaire}
                onChange={e => setValues({...values,beneficiaire:e.target.value})}

              >
                {/* {values.filter((item)=>item.nom_faitiere).map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {
                      name.prenom_nom +
                      "  - - - tel:" +
                      name.telephone +
                      "  - - - CNI:" +
                      name.cni
                    }
                  </MenuItem>
                ))} */}
              </Select>

            </Box>
            

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Intrant</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="intrant"
                fullWidth
                
                value={values.intrant}
                onChange={e => setValues({...values,intrant:e.target.value})}

              >
                {/* {values.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {name.libelle}
                  </MenuItem>
                ))} */}
              </Select>
            </Box>
           

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="fournisseur"
                fullWidth
                
                value={values.fournisseur}
                onChange={e => setValues({...values,fournisseur:e.target.value})}

              >
                {/* {values.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {name.libelle_entreprise}
                  </MenuItem>
                ))} */}
              </Select>
            </Box>
            

            <TextField
              variant="outlined"
              label="Quantité à livrer"
              type="text"
              fullWidth
              sx={{ marginBottom: "2vh" }}
              name="quantite_livree"
              
              onChange={e => setValues({...values,quantite_livree:e.target.value})}
              value={values.quantite_livree}
            />
            

            <TextField
              variant="outlined"
              label="prix unitaire"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="prix_unitaire"
              
              onChange={e => setValues({...values,prix_unitaire:e.target.value})}
              value={values.prix_unitaire}
            />
            

            <TextField
              variant="outlined"
              label="montant subvention"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="montant_subvention"
              
              onChange={e => setValues({...values,montant_subvention:e.target.value})}

              value={values.montant_subvention}
            />
            

            <TextField
              variant="outlined"
              label="caracteristique"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="caracteristique"
              
              onChange={e => setValues({...values,caracteristique:e.target.value})}

              value={values.caracteristique}
            />
            

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ paddingY: "2vh", marginTop: "4vh" }}
            >
              Modifier Bon
            </Button>
          </form>
        </Box>
    )

}
        
     
 
export default UpdateBon;