import { Brand } from "lib/types/common";
import React, { FC, useState } from "react";

export const AppContext = React.createContext<any>({});

const ContextProvider: FC = ({ children }) => {
  const [brand, setBrand] = useState<Brand>("lazurde");

  return (
    <AppContext.Provider value={{ brand, setBrand }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
