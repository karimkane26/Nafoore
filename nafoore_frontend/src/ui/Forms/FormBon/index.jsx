import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useState,useEffect} from "react";
import * as Yup from "yup"
import moment from "moment";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import apiInstance from "../../../services/ApiService";

export default function FormBons() {
//   const auth = useAuthContext();

const[faitieres,setFaitieres] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/faitier/")
            .then((response) => response.json()
            .then((faitieres) => setFaitieres(faitieres))
            .catch((error) => console.log(error))
        )
    }, []);
    const[beneficiaires,setBeneficiaires] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/benef/")
            .then((response) => response.json()
            .then((beneficiaires) => setBeneficiaires(beneficiaires))
            .catch((error) => console.log(error))
        )
    }, []);
    const[intrants,setIntrants] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/intrans/")
            .then((response) => response.json()
            .then((intrants) => setIntrants(intrants))
            .catch((error) => console.log(error))
        )
    }, []);
    const[fournisseurs,setFournisseurs] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/fournisseur/")
            .then((response) => response.json()
            .then((fournisseurs) => setFournisseurs(fournisseurs))
            .catch((error) => console.log(error))
        )
    }, []);
  return (
    <Formik
      initialValues={{
        nom_faitiere: "",
        quantite_livree: "",
        prix_unitaire: "",
        montant_subvention: "",
        intrant: "",
        beneficiaire: "",
        fournisseur: "",
        caracteristique: "",
      }}
      validationSchema={
        Yup.object().shape({
        quantite_livree: Yup.number().required("Champ Obligatoire"),
        prix_unitaire: Yup.number().required("Champ Obligatoire"),
        montant_subvention: Yup.number().required("Champ Obligatoire"),
        intrant: Yup.number().required("Champ Obligatoire"),
        beneficiaire: Yup.number().required("Champ Obligatoire"),
        fournisseur: Yup.number().required("Champ Obligatoire"),
        caracteristique: Yup.string().required("Champ Obligatoire"),
})}
    //  enableReinitialize

      onSubmit={async (values) => {
          const payload = {
            code: "BN-" + moment(new Date()).format("DDYYYYssmm"),
            quantite_livree: values.quantite_livree,
            prix_unitaire: values.prix_unitaire,
            caracteristique: values.caracteristique,
            montant_subvention: values.montant_subvention,
            regler: false,
            beneficiaire: values.beneficiaire,
            intrant: values.intrant,
            fournisseur: values.fournisseur,
            date: moment(new Date()).format("YYYY-MM-DD"),
          };
          const result = await apiInstance.post(
            "bons/",
             payload,
            // {
            //   headers: { Authorization: `Token ${token}` },
            // }
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
            window.location.reload();
          }
          // console.log(result.status)
        // if (statut === "Modifier") {
        //   const payload = {
        //     quantite_livree: values.quantite_livree,
        //     prix_unitaire: values.prix_unitaire,
        //     caracteristique: values.caracteristique,
        //     montant_subvention: values.montant_subvention,
        //     regler: row.regler ?? false,
        //     beneficiaire: values.beneficiaire,
        //     intrant: values.intrant,
        //     fournisseur: values.fournisseur,
        //   };
        //   const result = await apiInstance.patch(
        //     `organisations/bons/${row?.id}/`,
        //     payload,
        //     {
        //       headers: { Authorization: `Token ${token}` },
        //     }
        //   );

        //   if (result.status === 200) {
        //     toast.success("Modifier avec succés!", {
        //       position: "top-center",
        //       autoClose: 2000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //     });
        //     window.location.reload();
        //   }
        // }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        isSubmitting,
        setSubmitting,
      }) => (
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
                onBlur={handleBlur}
                value={values.nom_faitiere}
                onChange={handleChange}
              >
                {faitieres.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {name.nom_faitiere}
                  </MenuItem>
                ))}
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
                onBlur={handleBlur}
                value={values.beneficiaire}
                onChange={handleChange}
              >
                {beneficiaires.filter((item)=>item.nom_faitiere).map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {
                      name.prenom_nom +
                      "  - - - tel:" +
                      name.telephone +
                      "  - - - CNI:" +
                      name.cni
                    }
                  </MenuItem>
                ))}
              </Select>

            </Box>
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.beneficiaire && errors.beneficiaire}
            </p>

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Intrant</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="intrant"
                fullWidth
                onBlur={handleBlur}
                value={values.intrant}
                onChange={handleChange}
              >
                {intrants.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {name.libelle}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.intrant && errors.intrant}
            </p>

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="fournisseur"
                fullWidth
                onBlur={handleBlur}
                value={values.fournisseur}
                onChange={handleChange}
              >
                {fournisseurs.map((name) => (
                  <MenuItem key={name} value={name.id}>
                    {name.libelle_entreprise}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.fournisseur && errors.fournisseur}
            </p>

            <TextField
              variant="outlined"
              label="Quantité à livrer"
              type="text"
              fullWidth
              sx={{ marginBottom: "2vh" }}
              name="quantite_livree"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantite_livree}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.quantite_livree &&
                touched.quantite_livree &&
                errors.quantite_livree}
            </p>

            <TextField
              variant="outlined"
              label="prix unitaire"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="prix_unitaire"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.prix_unitaire}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.prix_unitaire &&
                touched.prix_unitaire &&
                errors.prix_unitaire}
            </p>

            <TextField
              variant="outlined"
              label="montant subvention"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="montant_subvention"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.montant_subvention}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.montant_subvention &&
                touched.montant_subvention &&
                errors.montant_subvention}
            </p>

            <TextField
              variant="outlined"
              label="caracteristique"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="caracteristique"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.caracteristique}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.caracteristique &&
                touched.caracteristique &&
                errors.caracteristique}
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
  );
}
