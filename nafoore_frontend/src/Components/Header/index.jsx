import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
const StyleLink = styled(Link)`
padding: 15px;
color: blue;
text-decoration: none;
font-size: 18px;
`
function Header(){
    return(
        <div>
          <StyleLink to="/faitier">Faitier</StyleLink>  
          <StyleLink to="/benef">Beneficiare</StyleLink>
          <StyleLink to="/intrans">Page Intrans</StyleLink>
          <StyleLink to="/fournisseurs"> Fournisseur</StyleLink>
          <StyleLink to="/livraison">Bon livraison</StyleLink>
          <StyleLink to="/bons">Bon</StyleLink>
        </div>
    )
}
export default Header