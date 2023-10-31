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

export function UpdateIntrant(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [values,setValues] = useState({id:id,libelle:'',type:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/intrans/"+id)
            .then(response => setValues({...values,libelle:response.data.libelle,type:response.data.type})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/intrans/'+id+'/', values)
        .then((response) => setValues({...values,libelle :response.data.libelle,type: response.data.type}))
        .catch((error) => console.log(error))
        navigate("/intrans")

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
          value={values.libelle}
          onChange={e => setValues({...values,libelle:e.target.value})}
        >
        </TextField>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          id="demo-simple-select"
          name="type"
          fullWidth
          label="Type"
          value={values.type}
          onChange={e => setValues({...values,type:e.target.value})}

        >
         <MenuItem value="pompage">Kit de pompage</MenuItem>
            <MenuItem value="semence">semence</MenuItem>
            <MenuItem value="engrais_chimique">engrais chimique</MenuItem>
            <MenuItem value="engrais_organique">engrais organique</MenuItem>
            engrais_organique{" "}
        </Select>
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
export default UpdateIntrant;
