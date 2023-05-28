import { useReducer, useCallback } from "react";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return action.values;
    case "set":
      return set(cloneDeep(state), action.id, action.value);
    default:
      return state;
  }
}

function useFormState(initialData) {
  const [state, dispatch] = useReducer(
    (_state, _action) => reducer(_state, _action),
    initialData
  );

  const onChangeCb = useCallback(
    (e) => {
      const { type, id, name, checked, value } = e.target;
      dispatch({
        type: "set",
        id: type === "radio" ? name : id,
        value: type === "checkbox" ? checked : value,
      });
    },
    [dispatch]
  );

  const setState = useCallback(
    (newState) => {
      dispatch({ type: "reset", values: newState });
    },
    [dispatch]
  );

  return [state, onChangeCb, setState];
}

export default useFormState;
