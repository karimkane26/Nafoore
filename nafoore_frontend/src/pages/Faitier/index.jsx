import {React, useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead'
import { TableBody } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from "axios";

import { FormFaitieres } from "../../ui/Forms/FormFaitier/Formfaitier";
function Faitier(){
    const[corps,SetCorps] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8000/organisations/faitier")
            .then((response) => response.json()
            .then((corps) => SetCorps(corps))
            .catch((error) => console.log(error))
        )
    }, [])
    const baseUrl = 'http://localhost:8000/organisations/faitier'
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
            <TableCell align="center">nom_faitiere</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {corps?.map((corps) => (
            <TableRow
              key={corps.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{corps.nom_faitiere}</TableCell>
              <Link to={`/Update/${corps.id}`}> <Button variant="contained" title="modifier_faitier">
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
export default Faitier


