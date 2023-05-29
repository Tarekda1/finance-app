import React, { createContext, useReducer } from "react";

const defaultState = {
  submissions: [],
};

const reducer = (prevState, action) => {
  let array;
  switch (action.type) {
    case "ADD":
      array = [...prevState];
      array.push(action.payload);
      return array;
    default:
      break;
  }
};

export const SubmissionsContext = createContext(defaultState);

export const SubmissionsContextProvider = ({ children }) => {
  const [submissionsState, dispatcher] = useReducer(reducer, []);

  const addHandler = (newSubmission) => {
    dispatcher({ type: "ADD", payload: newSubmission });
  };

  return (
    <SubmissionsContext.Provider value={{ submissionsState, addHandler }}>
      {children}
    </SubmissionsContext.Provider>
  );
};
