import React from "react";
import { Formik } from "formik";
import apiInstance from "../../../services/ApiService";
import axios from "axios";
import * as Yup from "yup"
import { toast } from "react-toastify";

import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";


export  default function FormIntrants(titre,statut){
  //const { token } = useAuthContext;useEffect(() => {
    // const[corps,SetCorps] = useState([])
    // // useEffect(() => {
    //     fetch("http://localhost:8000/organisations/faitier")
    //         .then((response) => response.json()
    //         .then((corps) => SetCorps(corps))
    //         .catch((error) => console.log(error))
    //     )
    // }, []);
  return (
    <Formik
    // initialValues={initializer()}
    initialValues={{
        libelle:"",
        type:"",
    }}
    // validationSchema={FormBeneficiaireValidationSchema}
  validationSchema={ Yup.object().shape({
    libelle: Yup.string().required("Champ libellé Obligatoire"),
    type: Yup.string().required("Champ type Obligatoire"),
  })}
    enableReinitialize
    onSubmit={async (values) => {
        const result = await apiInstance.post(
          "http://localhost:8000/organisations/intrans/",
          values,
        );
        if (result.status === 201) {
          toast.success("Ajouté avec succés!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

         // window.location.reload();
        }
       
    }}
  >
    {({
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
    }) => (
        <Box>
        <h2 style={{ textAlign: "center" }}> titre</h2>

        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="type"
            fullWidth
            onBlur={handleBlur}
            label="Type"
            onChange={handleChange}
            value={values.type}
          >
            <MenuItem value="pompage">Kit de pompage</MenuItem>
            <MenuItem value="semence">semence</MenuItem>
            <MenuItem value="engrais_chimique">engrais chimique</MenuItem>
            <MenuItem value="engrais_organique">engrais organique</MenuItem>
            engrais_organique{" "}
          </Select>
        </Box>

        <p style={{ fontSize: 13, color: "red" }}>
          {errors.type && touched.type && errors.type}
        </p>

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Libelle"
            fullWidth
            type="text"
            sx={{ marginBottom: "2vh" }}
            name="libelle"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.libelle}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.libelle && touched.libelle && errors.libelle}
          </p>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ paddingY: "2vh", marginTop: "4vh" }}
          >
            + Ajouter
          </Button>
        </form>
      </Box>
    )}
  </Formik>
  )


}
