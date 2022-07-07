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
  const [searchWrapperPosition, setSearchWrapperPosition] = useState({
    promo: false,
    langSelector: false,
  });

  const activeAccountPageTab =
    typeof window !== "undefined" && window.localStorage.getItem("active");

  const saveAppState = ({
    lang,
    region,
    channel,
    locale,
    brand,
    locationNum,
  }: AppStateType) => {
    window.localStorage.setItem(
      "app-state",
      JSON.stringify({ lang, region, channel, locale, brand, locationNum })
    );
    setAppState({ lang, region, channel, locale, brand, locationNum });
  };

  type SelectedFilterProps = {
    [key: string]: {
      name: string;
      selectedOptions: { [key: string]: { selected: boolean; name: string } };
    };
  };

  const [totalSelectedFilterCount, setTotalSelectedFilterCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilterProps>(
    {}
  );
  const [hasFilteredData, setHasFilteredData] = useState(false);
  const [priceListId, setPriceListId] = useState("100000");
  const [allWishListProducts, setAllWishListProducts] = useState(
    (typeof window !== "undefined" &&
      window?.sessionStorage?.getItem("wishListArray") !== "undefined" &&
      JSON.parse(window.sessionStorage.getItem("wishListArray"))) ||
      []
  );

  return (
    <AppContext.Provider
      value={{
        appState,
        saveAppState,
        searchWrapperPosition,
        setSearchWrapperPosition,
        totalSelectedFilterCount,
        setTotalSelectedFilterCount,
        selectedFilters,
        setSelectedFilters,
        hasFilteredData,
        setHasFilteredData,
        priceListId,
        setPriceListId,
        allWishListProducts,
        setAllWishListProducts,
        activeAccountPageTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
