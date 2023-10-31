import React from "react";
import { Formik } from "formik";
import { FormBeneficiaireValidationSchema } from "./validationbeneficiare";
import { useOrganizationsContext } from "../../Context/Organsisationproviders";
import apiInstance from "../../../services/ApiService";
import axios from "axios";
import * as Yup from "yup"
import { useState,useEffect } from "react";
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


export  default function FormBeneficiaire(){
  //const { token } = useAuthContext;useEffect(() => {
    const[corps,SetCorps] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/faitier")
            .then((response) => response.json()
            .then((corps) => SetCorps(corps))
            .catch((error) => console.log(error))
        )
    }, []);
  return (
    <Formik
    // initialValues={initializer()}
    initialValues={{
      type: "",
      nom_faitiere: "",
      prenom_nom: "",
      genre: "",
      telephone: "",
      cni: "",
      age: "",
      commune: "",
      adresse: "",
      localisation_parcelle: "",
      superficie: "",
    }}
    // validationSchema={FormBeneficiaireValidationSchema}
  validationSchema={ Yup.object().shape({
      type: Yup.string().required("Champ type Obligatoire"),
      nom_faitiere: Yup.string().required("Champ nom faitiere Obligatoire"),
      prenom_nom: Yup.string().required("Champ prenom et nom Obligatoire"),
      genre: Yup.string().required("Champ genre Obligatoire"),
      telephone: Yup.number()
      .typeError('Numéro téléphone invalide')
      .required('Entrer votre numéro téléphone svp !')
      .min(700000000, 'Verifier votre numéro téléphone svp!')
      .max(789999999, 'Verifier votre numéro téléphone svp!'),
      cni: Yup.number()
      .typeError('Numéro d\'identité invalide')
      .required('Entrer votre numéro d\'identité svp !')
      .min(1000000000000, 'Verifier votre numéro CNI svp!')
      .max(99999999999999, 'Verifier votre numéro CNI svp!'),
      commune: Yup.string().required("Champ commune Obligatoire"),
      adresse: Yup.string().required("Champ adresse Obligatoire"),
      localisation_parcelle: Yup.string().required(
        "Champ localisation Obligatoire"
      ),
      superficie: Yup.number().required("Champ superficie Obligatoire"),
    })}
    enableReinitialize
    onSubmit={async (values) => {
      
        const result = await apiInstance.post(
          "benef/",
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
      <Box sx={{ overflowY: "scroll", height: "80vh" }}>
        <h2 style={{ textAlign: "center" }}>titre</h2>
        <form onSubmit={handleSubmit}>
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
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.type && touched.type && errors.type}
          </p>

          <Box sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Faitiere</InputLabel>

            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="nom_faitiere"
              fullWidth
              onBlur={handleBlur}
              value={values.nom_faitiere}
              onChange={handleChange}
            >
              {corps.map((name) => (
                <MenuItem key={name} value={name.id}>
                  {name.nom_faitiere}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.nom_faitiere && errors.nom_faitiere}
          </p>

          <TextField
            variant="outlined"
            label="nom et prenom bénéficiaire"
            type="text"
            sx={{ marginBottom: "2vh" }}
            name="prenom_nom"
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.prenom_nom}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.prenom_nom && touched.prenom_nom && errors.prenom_nom}
          </p>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.genre}
            onChange={handleChange}
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
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.genre && errors.genre}
          </p>

          <TextField
            variant="outlined"
            label="telephone"
            type="text"
            fullWidth
            sx={{ marginBottom: "2vh" }}
            name="telephone"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.telephone}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.telephone && touched.telephone && errors.telephone}
          </p>

          <TextField
            variant="outlined"
            label="cni"
            type="text"
            sx={{ marginBottom: "2vh" }}
            fullWidth
            name="cni"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.cni}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.cni && touched.cni && errors.cni}
          </p>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={values.age}
            onChange={handleChange}
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
            onBlur={handleBlur}
            fullWidth
            onChange={handleChange}
            value={values.commune}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.commune && touched.commune && errors.commune}
          </p>
          <TextField
            variant="outlined"
            label="adresse"
            type="text"
            fullWidth
            sx={{ marginBottom: "2vh" }}
            name="adresse"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.adresse}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.adresse && touched.adresse && errors.adresse}
          </p>

          <TextField
            variant="outlined"
            label="localisation parcelle"
            type="text"
            fullWidth
            sx={{ marginBottom: "2vh" }}
            name="localisation_parcelle"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.localisation_parcelle}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.localisation_parcelle &&
              touched.localisation_parcelle &&
              errors.localisation_parcelle}
          </p>
          <TextField
            variant="outlined"
            label="superficie"
            type="text"
            fullWidth
            sx={{ marginBottom: "2vh" }}
            name="superficie"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.superficie}
          />
          <p style={{ fontSize: 13, color: "red" }}>
            {errors.superficie && touched.superficie && errors.superficie}
          </p>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ paddingY: "2vh", marginTop: "4vh" }}
          >
             Ajouter
          </Button>
        </form>
      </Box>
    )}
  </Formik>
  )


}
