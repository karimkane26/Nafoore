import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState ,useEffect} from "react";
import {
  Box,
  Radio,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
// import { useAuthContext } from "../../../Utils/contexts/AuthProvider";
import { useParams } from "react-router-dom";

export function UpdateFournisseur(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [values,setValues] = useState({id:id,libelle_entreprise:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/fournisseur/"+id)
            .then(response => setValues({...values,libelle_entreprise:response.data.libelle_entreprise})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/fournisseur/'+id+'/', values)
        .then((response) => setValues({...values,libelle_entreprise :response.data.libelle_entreprise}))
        .catch((error) => console.log(error))
        navigate("/fournisseurs")

    }
  return (
    <Box sx={{ overflowY: "scroll", height: "80vh" }}>
    <h2 style={{ textAlign: "center" }}>titre</h2>
    <form onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Libelle</InputLabel>

        <TextField
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name="libelle"
          fullWidth
          value={values.libelle_entreprise}
          onChange={e => setValues({...values,libelle_entreprise:e.target.value})}
        >
        </TextField>
      </Box>
    
      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ paddingY: "2vh", marginTop: "4vh" }}
      >
         Modifier
      </Button>
    </form>
  </Box>
  );
}
export default UpdateFournisseur;
