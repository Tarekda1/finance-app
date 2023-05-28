import React, { useCallback, useState, useRef } from "react";
import { Input, FormFeedback } from "reactstrap";

const FormInputField = ({
  id,
  placeholder,
  required,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  minLength,
  maxLength = 100,
  pattern,
  errorMessage,
  value,
  validateFn,
  disabled,
}) => {
  const [focused, setFocused] = useState(false);
  const [validationError, setValidationError] = useState("");
  const error = errorMessage || validationError;
  const inputEl = useRef(null);

  const validate = useCallback(() => {
    const err = validateFn ? validateFn(value ?? "") : "";
    console.log(err);
    setValidationError(err);
  }, [value, validateFn, setValidationError]);

  const onFocusCb = useCallback(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus, setFocused]
  );

  const onBlurCb = useCallback(
    (e) => {
      setFocused(false);
      onBlur?.(e);
      validate();
    },
    [onBlur, setFocused, validate]
  );

  const onInputCb = useCallback(() => {
    // Do a validation if input happens when the field not is in focus
    if (!focused) {
      validate();
    }
  }, [focused, validate]);

  // This is needed to trigger events on paste, if not defined validation doesn't work
  const onPasteCb = useCallback(() => {}, []);

  const onChangeCb = useCallback(
    (e) => {
      onChange?.(e);
      if (validationError) {
        const err = validateFn ? validateFn(e.target.value) : "";
        setValidationError(err);
      }
    },
    [validateFn, onChange, validationError]
  );

  // update native HTML element validation
  // this could be used to check validity on entire forms
  //   useEffect(() => {
  //     inputEl?.current?.setCustomValidity(error);
  //   }, [inputEl, error]);

  return (
    <>
      <Input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChangeCb}
        onBlur={onBlurCb}
        onFocus={onFocusCb}
        onInput={onInputCb}
        onPaste={onPasteCb}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        invalid={validationError.length > 0}
        value={value}
        ref={inputEl}
      />
      {error ? <FormFeedback>{error}</FormFeedback> : ""}
    </>
  );
};

export default FormInputField;
