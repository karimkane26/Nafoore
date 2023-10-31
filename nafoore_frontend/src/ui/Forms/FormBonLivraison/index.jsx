import React from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { toast } from "react-toastify";
import { Box, Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";


// import { useAuthContext } from "../../../Utils/contexts/AuthProvider";
import apiInstance from "../../../services/ApiService";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';

export default function FormBonLivraisons() {
//   const auth = useAuthContext();
//   const { token, user } = auth;
  // const [beneficiaires, setBeneficiaires] = React.useState([]);
  // const [intrants, setIntrants] = React.useState([]);
  const [bons, setBons] = React.useState([]);
  const [facture, setFacture] = React.useState("");
  const [bonLivraison, setBonLivraison] = React.useState("");
  const [valuel, onChangel] = useState(new Date());
  const [valuei, onChangei] = useState(new Date());
  const[fournisseurs,setFournisseurs] = useState([])
  useEffect(() => {
      fetch("http://localhost:8000/organisations/fournisseur/")
          .then((response) => response.json()
          .then((fournisseurs) => setFournisseurs(fournisseurs))
          .catch((error) => console.log(error))
      )
  }, []);
  // function getBeneficiaires() {
  //   apiInstance.get("organisations/beneficiaires/", {
  //     headers: { Authorization: `Token ${token}` },
  //   }).then((response) => { setBeneficiaires(response.data) });
  // }

  // function getIntrants() {
  //   apiInstance.get("organisations/intrants/", {
  //     headers: { Authorization: `Token ${token}` },
  //   }).then((response) => { setIntrants(response.data) });
  // }

  function getBons() {
    apiInstance.get("bons/", {
    //   headers: { Authorization: `Token ${token}` },
    }).then((response) => { setBons(response.data.filter((item)=>item.regler===false)) });
  }

  // function getFournisseur() {
  //   apiInstance.get("fournisseur/", {
  //   //   headers: { Authorization: `Token ${token}` },
  //   }).then((response) => { setFournisseurs(response.data.filter((item)=>item.regler===false)) });
  // }
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleIconBon = async (e, setFieldValue) => {
    const file = e.target.files[0];
    //check the size of image 
    if (file?.size / 1024 / 1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue('profile_image', base64);
      setBonLivraison(base64)
    }
    else {
      toast.error('Image size must be of 2MB or less');
    };
  };

  const handleIconFacture = async (e, setFieldValue) => {
    const file = e.target.files[0];
    //check the size of image 
    if (file?.size / 1024 / 1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue('profile_image', base64);
      setFacture(base64)
    }
    else {
      toast.error('Image size must be of 2MB or less');
    };
  };

  React.useEffect(() => {
    // getIntrants()
    // getBeneficiaires()
    getBons()
    
  }, []);

  return (
    <Formik
      initialValues={{
        reference_bl: "",
        reference_facture: "",
        observation: "",
        facture: null,
        bon:"",
        bon_livraison: null,
        intrant: "",
        beneficiaire: "",
        fournisseur: "",
      }}
      validationSchema={Yup.object().shape({
        reference_bl: Yup.string().required("Champ Obligatoire"),
        reference_facture: Yup.string().required("Champ Obligatoire"),
        observation: Yup.string().required("Champ Obligatoire"),
        fournisseur :Yup.string().required("Champ Obligatoire"),
        bon: Yup.number().required("Champ Obligatoire"),
      })}
      onSubmit={async (values) => {
        const payload = {
          "reference_bl": values.reference_bl,
          "reference_facture": values.reference_facture,
          "date_livraison": moment(valuel).format('YYYY-MM-DD') ,
          "observation": values.observation,
          "facture":facture,
          "bon": values.bon,
          "date_installation": moment(valuei).format('YYYY-MM-DD') ,
          "beneficiaire": bons.filter((item)=>item.id==values.bon)[0].beneficiaire,
          "intrant": bons.filter((item)=>item.id==values.bon)[0].intrant,
          "fournisseur": values.fournisseur,
          "bon_livraison" : bonLivraison,
        }

        const result = await apiInstance.post(
          "bonl/",
          payload,
        //   {
        //     headers: { Authorization: `Token ${token}` },
        //   }
        );

        if (result.status === 201) {
          await apiInstance.patch(
            "bons/"+values.bon+"/",
            {"regler":true},
           
          );
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
                  onBlur={handleBlur}
                  value={values.bon}
                  onChange={handleChange}
                  
                >
                  {bons.map((name) => (
                    <MenuItem
                      key={name}
                      value={name.id}
                    >
                      {name.code}
                    </MenuItem>
                    )) }
                </Select>
          
            </Box>
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.bon && errors.bon}
            </p>      

            <Box sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Founisseur </InputLabel>
              
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  name="fournisseur"
                  fullWidth
                  onBlur={handleBlur}
                  value={values.bon}
                  onChange={handleChange}
                  
                >
                  {fournisseurs.map((fournisseur) => (
                    <MenuItem
                      key={fournisseur}
                      value={fournisseur.id}
                    >
                    </MenuItem>
                    )) }
                </Select>
          
            </Box>
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.fournisseur && errors.fournisseur}
            </p>  

            
            


            <TextField
              variant="outlined"
              label="Reference Facture"
              type="text"
              fullWidth
              sx={{ marginBottom: "2vh" }}
              name="reference_facture"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.reference_facture}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.reference_facture &&
                touched.reference_facture &&
                errors.reference_facture}
            </p>

            <TextField
              variant="outlined"
              label="Reference BL"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="reference_bl"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.reference_bl}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.reference_bl && touched.reference_bl && errors.reference_bl}
            </p>

            <div className="mb-3 form-group" style={{ marginBottom:"2vh" }}>
            <label>Date livraison : </label>
            <DateTimePicker label ="Controlled picker" onChange={onChangel} value={valuel} />
            </div>

            <TextField
              variant="outlined"
              label="Observation"
              fullWidth
              type="text"
              sx={{ marginBottom: "2vh" }}
              name="observation"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.observation}
            />
            <p style={{ fontSize: 13, color: "red" }}>
              {errors.observation &&
                touched.observation &&
                errors.observation}
            </p>
                
           
            

            <div className="mb-3 form-group" style={{ marginBottom:"2vh" }}>
            <label>Date installation : </label>
            <DateTimePicker label ="Controlled picker"  onChange={onChangei} value={valuei} />           
            </div>

            <div className="mb-3 form-group" style={{ marginBottom:"2vh" }}>
              <label className="required">Facture</label>
              <Field name='profile_image'>
                {({ form, field }) => {
                  const { setFieldValue } = form
                  return (
                    <input
                      type="file"
                      className='form-control'
                      // required
                      onChange={(e) => handleIconFacture(e, setFieldValue)}
                    />
                  )
                }}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="profile_image" />
              </div>
            </div>

            <div className="mb-3 form-group">
              <label className="required">Bon Livraison</label>
              <Field name='profile_image'>
                {({ form, field }) => {
                  const { setFieldValue } = form
                  return (
                    <input
                      type="file"
                      className='form-control'
                      // required
                      onChange={(e) => handleIconBon(e, setFieldValue)}
                    />
                  )
                }}
              </Field>
              <div className="text-danger">
                <ErrorMessage name="profile_image" />
              </div>
            </div>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ paddingY: "2vh", marginTop: "4vh" }}
            >
              {/* + {statut} */} Ajouter
            </Button>
          </form>
        </Box>
      )}
    </Formik>
  );
}
