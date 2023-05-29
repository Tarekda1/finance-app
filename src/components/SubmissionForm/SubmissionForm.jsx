import React, { useCallback, useContext, useMemo, useState } from "react";
import { Form, FormGroup, Label, Col, Button } from "reactstrap";
import moment from "moment";
import { CountryCurrencyContext } from "../../context/CountryLanguageProvider";
import { SubmissionsContext } from "../../context/SubmissionProvider";
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
import "./SubmissionForm.css";
import { useNavigate } from "react-router-dom";

const SubmissionForm = () => {
  const { countries, currencyCodes, loadingCountry } = useContext(
    CountryCurrencyContext
  );
  const { addHandler } = useContext(SubmissionsContext);
  const [error, setError] = useState({});
  const navigate = useNavigate();
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

  const validatePeriod = useCallback(() => {
    let startDate = moment(formState.startValidity, "YYYY-MM-DD");
    let endDate = moment(formState.endValidity, "YYYY-MM-DD");
    let duration = moment.duration(endDate.diff(startDate));
    let years = Math.ceil(duration.asYears());

    // start day should be no less than 15 days from now
    if (moment().diff(startDate, "days") > 15) {
      return false;
    }
    //validity period should be between 1 and 3 years
    if (years >= 1 && years <= 3) {
      return true;
    }
    return false;
  }, [formState.endValidity, formState.startValidity]);

  const hasErrors = useCallback(() => {
    if (Object.values(error).filter(Boolean).length > 0) {
      return true;
    }
    return false;
  }, [error]);

  const valid = useCallback(() => {
    if (Object.values(error).filter(Boolean).length > 0) {
      return false;
    }
    if (!validatePeriod()) {
      alert("Invalid period");
      return false;
    }

    return true;
  }, [error, validatePeriod]);

  const checkForm = useCallback(() => {
    // eslint-disable-next-line
    for (const [key, v] of Object.entries(formState)) {
      if (v === "") {
        // eslint-disable-line
        setError({ key: true });
      } else {
        setError({ key: false });
      }
    }
  }, [setError, formState]);

  const Submit = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      checkForm();

      if (!valid()) {
        console.log("Not valid");
        return;
      }
      //OR send a post to some api
      addHandler(formState);
      console.log(formState);
      navigate("/", { replace: true });
    },
    [valid, formState, checkForm, addHandler, navigate]
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
          {hasErrors() ? (
            <div className="error">Invalid data, please check you input</div>
          ) : (
            <div></div>
          )}
        </FormGroup>
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
            {loadingCountry ? (
              "Loading ..."
            ) : (
              <Country
                options={countries}
                formState={formState}
                onChange={customCountryCb}
              />
            )}
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
        <FormGroup row>
          <Col
            sm={{
              size: 12,
            }}
          >
            <div className="d-flex justify-content-sm-center justify-content-md-end">
              <Button className="submit__btn" onClick={Submit}>
                Submit
              </Button>
            </div>
          </Col>
        </FormGroup>
      </Form>
    </>
  );
};

export default SubmissionForm;
