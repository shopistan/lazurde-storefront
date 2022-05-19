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

  const getPromoBarStatus = () => {
    // var status = false;
    let status =
      typeof window !== "undefined"
        ? JSON.parse(window.localStorage.getItem("promo-bar-visible"))
        : false;
    return status === true ? true : false;
  };

  const [appState, setAppState] = useState<AppStateType | string>(defaultState);
  const [promoBarClosed, setPromoBarClosed] = useState<boolean>(
    getPromoBarStatus()
  );

  const savePromoBarStatus = () => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("promo-bar-visible", "true");
    setPromoBarClosed(true);
  };

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
    <AppContext.Provider
      value={{ appState, saveAppState, promoBarClosed, savePromoBarStatus }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
