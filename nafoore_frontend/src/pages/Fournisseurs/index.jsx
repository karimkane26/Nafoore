import React, {useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'
import { TableBody } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function Fournisseur() {
  const[corps,SetCorps] = useState([])
  useEffect(() => {
      fetch("http://localhost:8000/organisations/fournisseur/")
          .then((response) => response.json()
          .then((corps) => SetCorps(corps))
          .catch((error) => console.log(error))
      )
  }, [])
    return(
        <TableContainer>
            <Table>
            <TableHead>
          <TableRow>
            <TableCell align="center">libelle Entreprise</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.libelle_entreprise}</TableCell>
              <Link to={`/UpdateFournisseur/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
                Modifier
              </Button> </Link>
            </TableRow>
          ))}
        </TableBody>
            </Table>
        </TableContainer>
    )
} 
export default Fournisseur;