import * as Yup from "yup";
export const FormBeneficiaireValidationSchema = Yup.object().shape({
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
});
