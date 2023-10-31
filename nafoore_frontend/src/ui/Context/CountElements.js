import React from "react";

export const useCountContext = () => React.useContext(CountElementsContext);
const CountElementsContext = React.createContext(null);
export default function CountElementsContextProvider({ children }) {
  const [nbrIntrants, setNbrIntrants] = React.useState(5);
  const [nbrBeneficiaires, setNbrBeneficiaires] = React.useState(3);
  const [nbrBons, setNbrBons] = React.useState(2);
  return (
    <CountElementsContext.Provider
      value={{ nbrBeneficiaires, nbrBons, nbrIntrants }}
    >
      {children}
    </CountElementsContext.Provider>
  );
}
