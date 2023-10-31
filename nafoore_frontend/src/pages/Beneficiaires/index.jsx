import React, {useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import { TableBody } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
function Benfeciaires(){
    const [corps,Setcorps] = useState([])
    useEffect(() => {
      fetch("http://localhost:8000/organisations/benef/")
            .then((response) => response.json()
            .then((corps) => Setcorps(corps))
            .catch((error) => console.log(error))
        )
    }, [])
    const baseUrl = 'http://localhost:8000/organisations/benef'
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
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Nom Faitiere</TableCell>
            <TableCell align="center">Prenom & Nom</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Telephone</TableCell>
            <TableCell align="center">Cni</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Commune</TableCell>
            <TableCell align="center">Adresse</TableCell>
            <TableCell align="center">Superficie Parcelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corps && corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.type}</TableCell>
              <TableCell align="center">{corps.nom_faitiere} </TableCell>
              <TableCell align="center">{corps.prenom_nom}</TableCell>
              <TableCell align="center">{corps.genre}</TableCell>
              <TableCell align="center">{corps.telephone}</TableCell>
              <TableCell align="center">{corps.cni}</TableCell>
              <TableCell align="center">{corps.age}</TableCell>
              <TableCell align="center">{corps.commune}</TableCell>
              <TableCell align="center">{corps.adresse}</TableCell>
              <TableCell align="center">{corps.superficie}</TableCell>
              <Link to={`/UpdateBenef/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
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
export default Benfeciaires;