import React, {useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'
import { TableBody } from '@mui/material';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import TableFooter from '@mui/material/TableFooter';
function Bonlivraison() {
    const [corps,Setcorps] = useState([])
    useEffect(() => {
      fetch("http://localhost:8000/organisations/bonl/")
          .then((response) => response.json()
          .then((corps) => Setcorps(corps))
          .catch((error) => console.log(error))
      )
  }, [])
  const baseUrl = 'http://localhost:8000/organisations/bonl'
  const deleteContact = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(response =>response.data)
    // navigate("/benef")
    }
    return(
        <TableContainer>
            <Table>
            <TableHead>
          <TableRow>
            <TableCell align="center">Bon</TableCell>
            <TableCell align="center">beneficiaire</TableCell>
            <TableCell align="center">intrant</TableCell>
            <TableCell align="center">fournisseur</TableCell>
            <TableCell align="center">reference_bl</TableCell>
            <TableCell align="center">reference_facture</TableCell>
            <TableCell align="center">date_livraison</TableCell>
            <TableCell align="center">date_installation</TableCell>
            <TableCell align="center">observation</TableCell>
            <TableCell align="center">facture</TableCell>
            <TableCell align="center">Bon_livraisons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.bon}</TableCell>
              <TableCell align="center">{corps.beneficiaire}</TableCell>
              <TableCell align="center">{corps.intrant}</TableCell>
              <TableCell align="center">{corps.fournisseur}</TableCell>
              <TableCell align="center">{corps.reference_bl}</TableCell>
              <TableCell align="center">{corps.reference_facture}</TableCell>
              <TableCell align="center">{corps.date_livraison}</TableCell>
              <TableCell align="center">{corps.date_installation}</TableCell>
              <TableCell align="center">{corps.observation}</TableCell>
              <TableCell align="center">{corps.facture}</TableCell>
              <TableCell align="center">{corps.Bon_livraisons}</TableCell>
              <Link to={`/UpdateBonLivraison/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
                Modifier
              </Button> </Link>
              <Button variant="contained" color="secondary" title="supprimer" onClick={()=>deleteContact(corps.id)}>
                Supprimer
              </Button> 
            </TableRow>
          ))}
        </TableBody>
            </Table>
        </TableContainer>
    )
} 
export default Bonlivraison;