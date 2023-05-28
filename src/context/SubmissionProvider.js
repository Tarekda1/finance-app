import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

const defaultState = {
    submissions: []
};

export const SubmissionsContext = createContext(defaultState);

export const SubmissionsContextProvider = ({ children }) => {
    const [submission, setSubmissions] = useState();

}