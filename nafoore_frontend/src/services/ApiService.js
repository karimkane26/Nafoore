import axios from "axios";
const apiInstance = axios.create({
  baseURL: 'http://localhost:8000/organisations/',
  // baseURL: 'http://127.0.0.1:8000/v3',
  timeout: 15000,
  timeoutErrorMessage: "Erreur lié au timeout",
})
export default apiInstance;


