import React from "react";
import { Formik,Field } from "formik";
import { toast } from "react-toastify";
import { useState,useEffect} from "react";
import * as Yup from "yup"
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DateField } from '@mui/x-date-pickers-pro';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Bonlivraison from ".";

function UpdateBonLivraison(){
    const {id} = useParams();
    const navigate = useNavigate();
    // const [valuel, onChangel] = useState(new Date());
    // const [valuei, onChangei] = useState(new Date());
    const [values,setValues] = useState({id:id,beneficiaire:'',intrant:'',fournisseur:'',reference_bl:'',reference_facture:'',date_livraison:'',date_installation:'',observation:'',facture :'',bon_livraison:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/bonl/"+id)
            .then(response => setValues({...values,beneficiaire:response.data.beneficiaire,intrant:response.data.intrant,fournisseur:response.data.fournisseur,reference_bl:response.data.reference_bl,reference_facture:response.data.reference_facture,observation:response.data.observation,facture:response.data.facture,bon_livraison:response.data.bon_livraison})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/bonl/'+id+'/', values)
        .then((response) => setValues({...values,beneficiaire:response.data.beneficiaire,intrant:response.data.intrant,fournisseur:response.data.fournisseur,reference_bl:response.data.reference_bl,reference_facture:response.data.reference_facture,observation:response.data.observation,facture:response.data.facture,bon_livraison:response.data.bon_livraison}))
        .catch((error) => console.log(error))
        //  navigate("/livraison")

    }
    <Box sx={{ overflowY: "scroll", height: "80vh" }}>
<h2 style={{ textAlign: "center" }}></h2>
<form onSubmit={handleSubmit}>
<Box sx={{ minWidth: 120 }}>
    <InputLabel id="demo-simple-select-label">Bon</InputLabel>
    
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        name="bon"
        fullWidth
        
        value={values.bon}
        onChange={e => setValues({...values,bon:e.target.value})}

      >
        {/* {bons.map((name) => (
          <MenuItem
            key={name}
            value={name.id}
          >
            {name.code}
          </MenuItem>
          )) } */}
      </Select>

  </Box>
     

  <Box sx={{ minWidth: 120 }}>
    <InputLabel id="demo-simple-select-label">Founisseur </InputLabel>
    
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        name="fournisseur"
        fullWidth
        
        value={values.fournisseur}
        onChange={e => setValues({...values,fournisseur:e.target.value})}
      >
        {/* {fournisseurs.map((fournisseur) => (
          <MenuItem
            key={fournisseur}
            value={fournisseur.id}
          >
          </MenuItem>
          )) } */}
      </Select>

  </Box>
   

  <TextField
    variant="outlined"
    label="Reference Facture"
    type="text"
    fullWidth
    sx={{ marginBottom: "2vh" }}
    name="reference_facture"
    
    onChange={e => setValues({...values,reference_facture:e.target.value})}
    value={values.reference_facture}
  />
  

  <TextField
    variant="outlined"
    label="Reference BL"
    fullWidth
    type="text"
    sx={{ marginBottom: "2vh" }}
    name="reference_bl"
    
    onChange={e => setValues({...values,reference_bl:e.target.value})}

    value={values.reference_bl}
  />

{/* <TextField
    variant="outlined"
    label="Date installation"
    fullWidth
    type="text"
    sx={{ marginBottom: "2vh" }}
    name="date_installation"
    
    onChange={e => setValues({...values,date_installation:e.target.value})}

    value={values.date_installation}
  />
  
  <TextField
    variant="outlined"
    label="Date livrqison"
    fullWidth
    type="text"
    sx={{ marginBottom: "2vh" }}
    name="date_livraison"
    
    onChange={e => setValues({...values,date_livraison:e.target.value})}

    value={values.date_livraison}
  /> */}
{/*   
  <DateField label="Uncontrolled field" />
<DateField
  label="Date installation"
  value={values.date_installation}
  onChange={(values) => setValues(newValue)}
/>

<DateField label="Uncontrolled field" />
<DateField
  label="Date livraison"
  value={values.date_livraison}
  onChange={(values) => setValues(newValue)}
/>
    */}
  <div className="mb-3 form-group" style={{ marginBottom:"2vh" }}>
    <label className="required">Facture</label>
    onChange={e => setValues({...values,facture:e.target.value})}

    value={values.facture}
    
  </div>

  <div className="mb-3 form-group">
    <label className="required">Bon Livraison</label>
    onChange={e => setValues({...values,bon_livraison:e.target.value})}
    value={values.bon_livraison}
    
    
  </div>
  <Button
    variant="contained"
    type="submit"
    fullWidth
    sx={{ paddingY: "2vh", marginTop: "4vh" }}
  >
    {/* + {statut} */} Modifier
  </Button>
</form>
</Box>
}
export default UpdateBonLivraison;
