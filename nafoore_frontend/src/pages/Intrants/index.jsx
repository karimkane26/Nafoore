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
import UpdateIntrant from "./UpdateIntrant";
import axios from "axios";
function Intrants() {
  const[corps,SetCorps] = useState([])
  useEffect(() => {
      fetch("http://localhost:8000/organisations/intrans/")
          .then((response) => response.json()
          .then((corps) => SetCorps(corps))
          .catch((error) => console.log(error))
      )
  }, [])
  const baseUrl = 'http://localhost:8000/organisations/intrans'
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
            <TableCell align="center">Libelle</TableCell>
            <TableCell align="center">Type</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.libelle}</TableCell>
              <TableCell align="center">{corps.type} </TableCell>
              <Link to={`/UpdateIntrant/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
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
export default Intrants;