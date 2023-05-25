import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const defaultState = {
  countries: [],
  currencyCodes: [],
  loadingCountry: true,
  loadingCurrency: true,
};

export const CountryCurrencyContext = createContext(defaultState);

export const CountryLanguageContextProvider = ({ children }) => {
  // fetches business customer and updates the context
  const [countries, setCountries] = useState();
  const [currencyCodes, setCurrencyCodes] = useState();
  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const effectRan = useRef(false);
  const Country_URL = "https://restcountries.com/v3.1/all";
  const Currency_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json";

  useEffect(() => {
    const controller = new AbortController();
    if (effectRan.current === true) {
      try {
        setLoadingCountry(true);
        const fetchCountryCode = async () => {
          const resp = await axios.get(Country_URL, {
            signal: controller.signal,
          });
          setCountries(resp.data);
          setLoadingCountry(false);
        };
        fetchCountryCode();
      } catch (error) {}
    }
    return () => {
      console.log("unmount");
      controller.abort();
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (effectRan.current === true) {
      try {
        setLoadingCurrency(true);
        const fetchCountryCode = async () => {
          const resp = await axios.get(Currency_URL, {
            signal: controller.signal,
          });
          setCurrencyCodes(resp.data);
          setLoadingCurrency(true);
        };
        fetchCountryCode();
      } catch (error) {}
    }
    return () => {
      console.log("unmount");
      controller.abort();
      effectRan.current = true;
    };
  }, []);

  return (
    <CountryCurrencyContext.Provider
      value={{ countries, currencyCodes, loadingCountry, loadingCurrency }}
    >
      {children}
    </CountryCurrencyContext.Provider>
  );
};
