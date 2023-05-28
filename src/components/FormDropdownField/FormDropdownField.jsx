import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Input, FormFeedback } from "reactstrap";

const FormDropdownField = ({
  id,
  placeholder,
  required,
  onChange,
  pattern,
  errorMessage,
  value,
  options,
  validateFn,
  disabled,
}) => {
  const [validationError, setValidationError] = useState("");
  const error = errorMessage || validationError;
  const inputEl = useRef(null);
  const didMountRef = useRef(false);

  const validate = useCallback(() => {
    const err = validateFn ? validateFn(value ?? "") : "";
    setValidationError(err);
  }, [value, validateFn, setValidationError]);

  // This is needed to trigger events on paste, if not defined validation doesn't work
  const onPasteCb = useCallback(() => {}, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    validate();
  }, [required, didMountRef, validate, value]);

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

  const hasEmptyOption = useMemo(
    () => !!options?.find((option) => option.value === ""),
    [options]
  );

  const getDropDownItems = useCallback(() => {
    return (
      <>
        {!hasEmptyOption && !required && <option value="" name=" " />}
        {options?.map(
          ({ name, value: optionValue, disabled: isDisabled = false }) => (
            <option
              key={`form-dropdown-field-${name}_${optionValue}`}
              value={optionValue}
              label={name}
              disabled={isDisabled}
            />
          )
        )}
      </>
    );
  }, [options, hasEmptyOption, required]);

  if (!options || !options.length) {
    return null;
  }

  return (
    <>
      <Input
        id={id}
        type="select"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChangeCb}
        onPaste={onPasteCb}
        pattern={pattern}
        value={value}
        invalid={!!validationError}
        ref={inputEl}
      >
        {getDropDownItems()}
      </Input>
      {error ? <FormFeedback>{error}</FormFeedback> : ""}
    </>
  );
};

export default FormDropdownField;
