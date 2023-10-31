import React from "react";
const OrganizationsContenxt = React.createContext(null);
export const useOrganizationsContext = () =>
  React.useContext(OrganizationsContenxt);
 
function OrganizationsProvider({ children }) {
  const [bons, setBons] = React.useState([]);
  const [beneficiaires, setBeneficiaires] = React.useState([]);
  const [intrants, setIntrants] = React.useState([]);
  const [fournisseurs, setFournisseurs] = React.useState([]);
  const [faitieres, setFaitieres] = React.useState([]);
  const [exportB, setExportB] = React.useState([]);
  return (
    <OrganizationsContenxt.Provider
      value={{
        beneficiaires,
        setBeneficiaires,
        intrants,
        setIntrants,
        fournisseurs,
        setFournisseurs,
        bons,
        setBons,
        faitieres,
        setFaitieres,
        exportB,
        setExportB
      }}
    >
      {children}
    </OrganizationsContenxt.Provider>
  );
}

export default OrganizationsProvider;
