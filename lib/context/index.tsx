import { AppStateType } from "lib/types/common";
import { getAppStateFromLocalStorage } from "lib/utils/common";
import { DEFAULT_APP_STATE } from "lib/utils/constants";
import React, { FC, useState } from "react";

export const AppContext = React.createContext<any>({});

const ContextProvider: FC = ({ children }) => {
  var defaultState: AppStateType | string = "";
  if (getAppStateFromLocalStorage()) {
    defaultState = getAppStateFromLocalStorage();
  } else {
    defaultState = DEFAULT_APP_STATE;
  }

  const [appState, setAppState] = useState<AppStateType | string>(defaultState);

  const saveAppState = ({
    lang,
    region,
    channel,
    locale,
    brand,
  }: AppStateType) => {
    window.localStorage.setItem(
      "app-state",
      JSON.stringify({ lang, region, channel, locale, brand })
    );
    setAppState({ lang, region, channel, locale, brand });
  };

  return (
    <AppContext.Provider value={{ appState, saveAppState }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
