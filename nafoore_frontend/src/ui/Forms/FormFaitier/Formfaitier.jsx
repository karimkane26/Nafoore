import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
// import { useAuthContext } from "../../../Utils/contexts/AuthProvider";
import apiInstance from "../../../services/ApiService";

export function FormFaitieres({
  titre,
  initialValues,
  statut,
}) {
  // const auth = useAuthContext(); 
  // const { token } = auth;
  // console.log(token);
  return (
    <Formik
      //innerRef={(p) => (this.formik = p)}
      initialValues={{nom_faitiere:""}}
      validationSchema={Yup.object().shape({
        nom_faitiere: Yup.string().required("Champ libellé Obligatoire"),
      })}
      onSubmit={async (values) => {
        const result = await apiInstance.post(
          "faitier/",
          values,
          // {
          //   headers: { Authorization: `Token ${token}` },
          // }
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

          <p style={{ fontSize: 13, color: "red" }}>
            {errors.type && touched.type && errors.type}
          </p>

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="nom faitiere"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="nom_faitiere"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nom_faitiere}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.nom_faitiere && touched.nom_faitiere && errors.nom_faitiere}
            </p>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ paddingY: "2vh", marginTop: "4vh" }}
            >
              {/* Ajouter */}
              + {statut}
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  );
}
