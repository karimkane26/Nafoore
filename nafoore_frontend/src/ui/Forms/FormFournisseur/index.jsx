import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup"
import { Box, Button, TextField } from "@mui/material";
import apiInstance from "../../../services/ApiService";

export function FormFournisseurs({ titre, statut }) {
//   const auth = useAuthContext();
//   const { token } = auth;
  return (
    <Formik
      initialValues={{ libelle_entreprise: "" }}
      validationSchema={Yup.object().shape({
        libelle_entreprise: Yup.string().required("Champ libellé Obligatoire"),
      })}
      onSubmit={async (values) => {
        const result = await apiInstance.post(
          "http://localhost:8000/organisations/fournisseur/",
          values,
        //   {
        //     headers: { Authorization: `Token ${token}` },
        //   }
        );

        console.log(result);

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
        <Box>
          <h2 style={{ textAlign: "center" }}>{titre}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Libelle entreprise"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="libelle_entreprise"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.libelle_entreprise}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.libelle_entreprise &&
                touched.libelle_entreprise &&
                errors.libelle_entreprise}
            </p>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ paddingY: "2vh", marginTop: "4vh" }}
            >
              + {statut}
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  );
}
