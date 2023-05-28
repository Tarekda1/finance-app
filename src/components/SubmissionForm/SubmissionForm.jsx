import React, { useCallback, useContext, useMemo, useState } from "react";
import { Form, FormGroup, Label, Col, Button } from "reactstrap";
import { CountryCurrencyContext } from "../../context/CountryLanguageProvider";
import useFormState from "../../hooks/useFormState";
import {
  Country,
  Currency,
  Description,
  Name,
  PaymentAmount,
  ProjectCode,
  Surname,
  StartValidity,
  EndValidity,
} from "../FormFields/FormInputFields";

const SubmissionForm = () => {
  const { countries, currencyCodes } = useContext(CountryCurrencyContext);
  const [error, setError] = useState({});
  const OPEC_COUNTRIES = useMemo(() => {
    return ["Saudi Arabia", "Kuwait", "United Arab Emirates"];
  }, []);
  const [formState, onChange] = useFormState({
    name: "",
    surname: "",
    currency: "",
    country: "",
    amount: 0,
    projectCode: "",
    endValidity: "",
    startValidity: "",
  });

  const valid = useCallback(() => {
    if (Object.values(error).filter(Boolean).length > 0) {
      console.log(error);
      return false;
    }
    return true;
  }, [error]);

  const Submit = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!valid()) {
        console.log("Not valid");
        return;
      }
      console.log(formState);
    },
    [valid, formState]
  );

  const customCurrencyCb = useCallback(
    (e) => {
      if (OPEC_COUNTRIES.includes(formState?.country)) {
        onChange({
          target: {
            id: "currency",
            value: "USD",
          },
        });
      } else {
        const { currentTarget } = e;
        onChange({
          target: {
            id: "currency",
            value: currentTarget.value,
          },
        });
      }
    },
    [onChange, OPEC_COUNTRIES, formState?.country]
  );

  const customCountryCb = useCallback(
    (e) => {
      const { currentTarget } = e;
      if (OPEC_COUNTRIES.includes(currentTarget.value)) {
        onChange({
          target: {
            id: "country",
            value: currentTarget.value,
          },
        });
        onChange({
          target: {
            id: "currency",
            value: "USD",
          },
        });
      } else {
        onChange({
          target: {
            id: "country",
            value: currentTarget.value,
          },
        });
      }
    },
    [onChange, OPEC_COUNTRIES]
  );

  return (
    <>
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Name
              id="name"
              placeholder="name"
              formState={formState}
              onChange={onChange}
              isRequired={true}
              fieldValidation={(value) => {
                if (value.length < 5) {
                  setError({ name: true });
                  return "Invalid length";
                } else {
                  setError({ name: false });
                  return "";
                }
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="surName" sm={2}>
            Surname
          </Label>
          <Col sm={10}>
            <Surname
              placeholder="surname"
              formState={formState}
              onChange={onChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="countryofOrigin" sm={2}>
            Country of Origin
          </Label>
          <Col sm={10}>
            <Country
              options={countries}
              formState={formState}
              onChange={customCountryCb}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="currency" sm={2}>
            Currency
          </Label>
          <Col sm={10}>
            <Currency
              options={currencyCodes}
              formState={formState}
              onChange={customCurrencyCb}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="amount" sm={2}>
            Payment Amount
          </Label>
          <Col sm={10}>
            <PaymentAmount
              formState={formState}
              onChange={onChange}
              placeholder="amount"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="startvalidity" sm={2}>
            Start Validity
          </Label>
          <Col sm={10}>
            <StartValidity
              formState={formState}
              onChange={onChange}
              placeholder="start Validity"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="endvalidity" sm={2}>
            Start Validity
          </Label>
          <Col sm={10}>
            <EndValidity
              formState={formState}
              onChange={onChange}
              placeholder="End Validity"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Description of request
          </Label>
          <Col sm={10}>
            <Description
              formState={formState}
              onChange={onChange}
              type="textarea"
              placeholder="description of request"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="projectCode" sm={2}>
            Project Code
          </Label>
          <Col sm={10}>
            <ProjectCode
              formState={formState}
              onChange={onChange}
              fieldValidation={(value) => {
                if (value.length < 9) {
                  setError({ name: true });
                  return "Invalid length";
                } else {
                  let regex = /^[A-Z]{4}-[1-9]{4}$/;
                  if (!regex.test(value)) {
                    setError({ name: true });
                    return "Invalid Code";
                  } else {
                    setError({ name: false });
                    return "";
                  }
                }
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button onClick={Submit}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default SubmissionForm;
