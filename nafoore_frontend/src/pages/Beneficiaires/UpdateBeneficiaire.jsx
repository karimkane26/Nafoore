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

export function UpdateBenef(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [values,setValues] = useState({id:id,type:'',nom_faitiere:'',prenom_nom:'',commune:'',adresse:'',cni:'',telephone:'',genre:'',age:'',localisation_parcelle:'',superficie:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/benef/"+id)
            .then(response => setValues({...values,type:response.data.type,nom_faitiere: response.data.nom_faitiere,prenom_nom:response.data.prenom_nom,commune:response.data.commune,adresse:response.data.adresse,cni:response.data.cni,telephone:response.data.telephone,genre:response.data.genre,age:response.data.age,localisation_parcelle:response.data.localisation_parcelle,superficie:response.data.superficie})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/benef/'+id+'/', values)
        .then((response) => setValues({...values,type:  response.data.type,nom_faitiere:  response.data.nom_faitiere,prenom_nom: response.data.prenom_nom,commune: response.data.commune,adresse: response.data.adresse,cni: response.data.cni,telephone: response.data.telephone,genre: response.data.genre,age: response.data.age,localisation_parcelle: response.data.localisation_parcelle,superficie: response.data.superficie}))
        .catch((error) => console.log(error))
        navigate("/benef")

    }
  return (
    <Box sx={{ overflowY: "scroll", height: "80vh" }}>
    <h2 style={{ textAlign: "center" }}>titre</h2>
    <form onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          id="demo-simple-select"
          name="type"
          fullWidth
          
          label="Type"
          
          value={values.type}
        >
          <MenuItem value="organisations_producteurs">
            Organisation de producteurs
          </MenuItem>
          <MenuItem value="agregateur">Agregateur</MenuItem>
          <MenuItem value="institut_financiere">
            Institut financiere
          </MenuItem>
          <MenuItem value="Fournisseur_intrants">
            Fournisseur intrant
          </MenuItem>
          <MenuItem value="producteur_individuel">
            Producteur individuel
          </MenuItem>
          <MenuItem value="autre">Autre</MenuItem>
        </Select>
      </Box>
      

      <Box sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Faitiere</InputLabel>

        <TextField
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name="nom_faitiere"
          fullWidth
          value={values.nom_faitiere}
          onChange={e => setValues({...values,nom_faitiere:e.target.value})}
        >
          {/* {values.map((name) => (
            <MenuItem key={name} value={name.id}>
              {name.nom_faitiere}
            </MenuItem>
          ))} */}
        </TextField>
      </Box>
      

      <TextField
        variant="outlined"
        label="nom et prenom bénéficiaire"
        type="text"
        sx={{ marginBottom: "2vh" }}
        name="prenom_nom"
        fullWidth
        value={values.prenom_nom}
        onChange={e => setValues({...values,prenom_nom:e.target.value})}

      />
     

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={values.genre}
        onChange={e => setValues({...values,genre:e.target.value})}
      >
        <FormControlLabel
          value="femme"
          control={<Radio />}
          label="femme"
          name="genre"
        />
        <FormControlLabel
          value="homme"
          control={<Radio />}
          label="homme"
          name="genre"
        />
      </RadioGroup>
      

      <TextField
        variant="outlined"
        label="telephone"
        type="text"
        fullWidth
        sx={{ marginBottom: "2vh" }}
        name="telephone"
        value={values.telephone}
        onChange={e => setValues({...values,telephone:e.target.value})}
      />
      

      <TextField
        variant="outlined"
        label="cni"
        type="text"
        sx={{ marginBottom: "2vh" }}
        fullWidth
        name="cni"
        value={values.cni}
        onChange={e => setValues({...values,cni:e.target.value})}
      />
     

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={values.age}
        onChange={e => setValues({...values,age:e.target.value})}
      >
        <FormControlLabel
          value="jeune"
          control={<Radio />}
          label="[15-29]"
          name="age"
        />
        <FormControlLabel
          value="adulte"
          control={<Radio />}
          label="+ 30"
          name="age"
        />
      </RadioGroup>

      <TextField
        variant="outlined"
        label="commune"
        type="text"
        sx={{ marginBottom: "2vh" }}
        name="commune"
        
        fullWidth
        
        value={values.commune}
        onChange={e => setValues({...values,commune:e.target.value})}
      />
      
      <TextField
        variant="outlined"
        label="adresse"
        type="text"
        fullWidth
        sx={{ marginBottom: "2vh" }}
        name="adresse"
        value={values.adresse}
        onChange={e => setValues({...values,adresse:e.target.value})}
      />
      

      <TextField
        variant="outlined"
        label="localisation parcelle"
        type="text"
        fullWidth
        sx={{ marginBottom: "2vh" }}
        name="localisation_parcelle"
        
        
        value={values.localisation_parcelle}
        onChange={e => setValues({...values,localisation_parcelle:e.target.value})}
      />
      
      <TextField
        variant="outlined"
        label="superficie"
        type="text"
        fullWidth
        sx={{ marginBottom: "2vh" }}
        name="superficie"
        value={values.superficie}
        onChange={e => setValues({...values,superficie:e.target.value})}

      />
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
export default UpdateBenef;
