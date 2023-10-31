import {React, useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'
import { TableBody } from '@mui/material';
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../services/ApiService";

import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
} from "@mui/material"
import axios from "axios";

function Update(){
    const {id} = useParams();
    const navigate = useNavigate();
    // console.log(id)
    const [values,setValues] = useState({id:id,nom_faitiere:''})
    useEffect(() => {
        axios.get("http://localhost:8000/organisations/faitier/"+id)
            .then((response) => setValues({...values,nom_faitiere: response.data.nom_faitiere})
        )
        .catch((error) => console.log(error))
    }, [])

    const handleSubmit =(e) =>{
        e.preventDefault();
        axios.patch('http://localhost:8000/organisations/faitier/'+id+'/', values)
        .then((response) => setValues({...values,nom_faitiere: response.data.nom_faitiere}))
        .catch((error) => console.log(error))
        // navigate("http://localhost:8000/organisations/faitier/")

    }
   
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label >Nom Faitier</label>
                    <input type="text" name="nom_faitier" className="form-control" placeholder="Enter Nom Faitier" value={values.nom_faitiere} onChange={e => setValues({...values,nom_faitiere:e.target.value})}  />
                    <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ paddingY: "2vh", marginTop: "4vh" }}
            >
              {/* Ajouter */}
              + 
            </Button>
                </form>
            </div>
        </div>
    )
}
export default Update;


