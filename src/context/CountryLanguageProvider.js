import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

const defaultState = {
  countries: [],
  currencyCodes: [],
  loadingCountry: true,
  loadingCurrency: true,
};

export const CountryCurrencyContext = createContext(defaultState);

export const CountryLanguageContextProvider = ({ children }) => {
  const [countries, setCountries] = useState();
  const [currencyCodes, setCurrencyCodes] = useState();
  const [loadingCurrency, setLoadingCurrency] = useState(true);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    if (effectRan.current === true) {
      setLoadingCountry(true);
      const fetchCountryCode = async () => {
        try {

          const resp = await axios.get(config.COUNTRY_URL, {
            headers: {
              'Authorization': `Bearer ${config.COUNTRY_KEY}`
            },
            signal: controller.signal,
          });
          const countryNameValye = Object.values(resp?.data).reduce(function (curr, next) {
            curr.push({ name: next.name, value: next.name });
            return curr;
          }, []);
          setCountries(countryNameValye);
          setLoadingCountry(false);
        } catch (error) {
          console.log(error)
        }
      };
      fetchCountryCode();
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
          const resp = await axios.get(config.CURRENCY_URL, {
            signal: controller.signal,
          });
          let currencies = [];
          Object.keys(resp.data).forEach((code) => {
            currencies.push({
              name: code.toUpperCase(),
              value: code.toUpperCase(),
            });
          });
          setCurrencyCodes(currencies);
          setLoadingCurrency(true);
        };
        fetchCountryCode();
      } catch (error) { }
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
