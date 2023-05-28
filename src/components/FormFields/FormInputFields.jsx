import FormInputField from "../FormInputField/FormInputField";
import FormDropdownField from "../FormDropdownField/FormDropdownField";

export const Name = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
}) => {
  return (
    <FormInputField
      id="name"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.name}
      onChange={onChange}
      validateFn={fieldValidation}
    />
  );
};

export const Surname = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
}) => {
  return (
    <FormInputField
      id="surname"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.surname}
      onChange={onChange}
      validateFn={fieldValidation}
    />
  );
};

export const PaymentAmount = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
}) => {
  return (
    <FormInputField
      id="amount"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.amount}
      onChange={onChange}
      validateFn={fieldValidation}
    />
  );
};

export const Description = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
  maxLength = 150,
  type,
}) => {
  return (
    <FormInputField
      id="description"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.description}
      onChange={onChange}
      validateFn={fieldValidation}
      type={type}
      maxLength={maxLength}
    />
  );
};

export const ProjectCode = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
}) => {
  return (
    <FormInputField
      id="projectCode"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.projectCode}
      onChange={onChange}
      validateFn={fieldValidation}
    />
  );
};

export const Country = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
  options,
}) => {
  return (
    <FormDropdownField
      id="country"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.country}
      onChange={onChange}
      validateFn={fieldValidation}
      options={options}
    />
  );
};

export const StartValidity = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
  options,
}) => {
  return (
    <FormInputField
      id="startValidity"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.startValidity}
      onChange={onChange}
      validateFn={fieldValidation}
      options={options}
      type="date"
    />
  );
};

export const EndValidity = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
  options,
}) => {
  return (
    <FormInputField
      id="endValidity"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.endValidity}
      onChange={onChange}
      validateFn={fieldValidation}
      options={options}
      type="date"
    />
  );
};

export const Currency = ({
  formState,
  onChange,
  isRequired,
  placeholder,
  fieldValidation,
  options,
}) => {
  return (
    <FormDropdownField
      id="currency"
      required={isRequired}
      placeholder={placeholder}
      value={formState?.currency}
      onChange={onChange}
      validateFn={fieldValidation}
      options={options}
    />
  );
};
