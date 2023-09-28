import { createContext, useContext, useState } from "react";

export const DetailsContext = createContext();
export const useDetails = () => useContext(DetailsContext);

function DetailsContextProvider(props) {
  const [phone] = useState("9797654654");

  const value = { phone };
  return (
    <DetailsContext.Provider value={value}>
      {props.children}
    </DetailsContext.Provider>
  );
}

export default DetailsContextProvider;
