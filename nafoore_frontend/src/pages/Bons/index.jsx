import React, {useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'
import { TableBody } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";

import TableFooter from '@mui/material/TableFooter';
function Bons() {
    const[corps,SetCorps] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/organisations/bons/")
            .then((response) => response.json()
            .then((corps) => SetCorps(corps))
            .catch((error) => console.log(error))
        )
    }, [])
    const baseUrl = 'http://localhost:8000/organisations/bons'
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
            <TableCell align="center">beneficiaire</TableCell>
            <TableCell align="center">intrant</TableCell>
            <TableCell align="center">fournisseur</TableCell>
            <TableCell align="center">code</TableCell>
            <TableCell align="center">date</TableCell>
            <TableCell align="center">quantite_livree</TableCell>
            <TableCell align="center">prix_unitaire</TableCell>
            <TableCell align="center">montant_subvention</TableCell>
            <TableCell align="center">caracteristique</TableCell>
            <TableCell align="center">regler</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.beneficiaire}</TableCell>
              <TableCell align="center">{corps.intrant}</TableCell>
              <TableCell align="center">{corps.fournisseur}</TableCell>
              <TableCell align="center">{corps.code}</TableCell>
              <TableCell align="center">{corps.date}</TableCell>
              <TableCell align="center">{corps.quantite_livree}</TableCell>
              <TableCell align="center">{corps.prix_unitaire}</TableCell>
              <TableCell align="center">{corps.montant_subvention}</TableCell>
              <TableCell align="center">{corps.caracteristique}</TableCell>
              <TableCell align="center">{corps.regler}</TableCell>
              <Link to={`/UpdateBon/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
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
export default Bons;