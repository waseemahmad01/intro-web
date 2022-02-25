import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import {
  Grid,
  RadioGroup,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import image from "../../../assets/index";
import { RadioButton } from "../../../components/RadioButton/RadioButton";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { Header } from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import {
  datePreference as datePreferenceApi,
  identify as identifyApi,
} from "../../../http";
import Joi from "joi-browser";
// import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { gender } from "../../../data";
import axios from "axios";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import ButtonComp from "../../../components/ButtonComp/ButtonComp";
import { useEffect } from "react";

export const RegisterFour = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const identifyOptions = gender;
  const [disabled, setDisabled] = useState(true);
  const [datePreference, setDatePrerence] = useState("");
  const [show, setShow] = useState(true);
  const [audience, setAudience] = useState("");
  // const [identify, setIdentify] = useState("0");
  // const [identifyShow, setIdentifyShow] = useState(true);
  const [errors, setErrors] = useState({
    datePreference: "",
    audience: "",
  });
  const schema = {
    datePreference: Joi.string().required().label("Date Preference"),
    audience: Joi.string().required().label("Intent"),
  };

  const validate = () => {
    const data = {
      datePreference,
      audience,
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({
        datePreference: "",
        audience: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = `"${
          item.path[0].charAt(0).toUpperCase() + item.path[0].slice(1)
        }" can not be empty`;
      setErrors(errorsObject);
      return true;
    }
  };

  const handleShow = (e) => {
    setShow(e.target.checked);
  };
  // const handleSelect = (e) => {
  //   setIdentify(e.target.value);
  //   const obj = { identify: e.target.value };
  //   const subSchema = { identify: schema.identify };
  //   const { error } = Joi.validate(obj, subSchema);
  //   // eslint-disable-next-line
  //   const it = error
  //     ? setErrors({
  //         ...errors,
  //         identify: `"Identify" is not allowed to be empty`,
  //       })
  //     : setErrors({ ...errors, identify: "" });
  // };
  const handleDatePreference = (e) => {
    setDatePrerence(e.target.value);
    const obj = { datePreference: e.target.value };
    const subSchema = { datePreference: schema.datePreference };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({
          ...errors,
          datePreference: `"Date Preference" is not allowed to be empty`,
        })
      : setErrors({ ...errors, datePreference: "" });

    if (
      errors.datePreference === "" &&
      errors.audience === "" &&
      audience !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleAudiencePreference = (e) => {
    setAudience(e.target.value);
    const obj = { audience: e.target.value };
    const subSchema = { audience: schema.datePreference };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({
          ...errors,
          audience: `"Intent" is not allowed to be empty`,
        })
      : setErrors({ ...errors, audience: "" });
    if (
      errors.datePreference === "" &&
      errors.audience === "" &&
      datePreference !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      try {
        const apiData = {
          interested_gender: datePreference,
          interested_audience: audience,
          visible: show,
          step: "/height",
        };
        const { data } = await datePreferenceApi(apiData);
        dispatch(submit(data));
        onNext();
      } catch (err) {
        alert("something went wrong");
        console.log(err.message);
      }
    }
  };
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundImage: `url(${image.heart})`,
        backgroundPosition: "100% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        alignItems="center"
        direction="column"
        className={classes.form}
      >
        <form action="">
          <Grid
            container
            // className={classes.registerFourContainer}
            direction="column"
          >
            <Grid item container justifyContent="center">
              <Typography variant="h1" className={classes.formTitle}>
                Dating Preference
              </Typography>
            </Grid>
            {/* <Grid item sm={12}>
              <SelectOption
                checkboxVaraint="switch"
                label="How do you identify?"
                options={identifyOptions}
                placeholder="Choose"
                show={identifyShow}
                handleShow={handleShow}
                name="identify"
                onSelect={handleSelect}
                value={identify}
                error={Boolean(errors.identify)}
                errorText={errors.identify}
                identify
              />
            </Grid> */}
            <Grid item>
              <Typography className={classes.title} variant="h3">
                I am looking for
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography
                className={`${classes.title} ${classes.t2}`}
                variant="h5"
              >
                You can change this later
              </Typography>
            </Grid> */}
            <Grid
              item
              style={{
                marginTop: "0.5rem",
                marginBottom: mdScreen ? "1rem" : "2rem",
              }}
            >
              <RadioGroup
                value={datePreference}
                onChange={handleDatePreference}
              >
                <Grid
                  container
                  direction={smScreen ? "column" : "row"}
                  spacing={smScreen ? 0 : 2}
                >
                  <RadioButton value="men" label="Men" />
                  <RadioButton value="women" label="Women" />
                  <RadioButton value="everyone" label="Everyone" />
                </Grid>
                {Boolean(errors.datePreference) && (
                  <span className={classes.error}>{errors.datePreference}</span>
                )}
              </RadioGroup>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.intentContainer}
            >
              <Typography className={classes.title} variant="h3">
                Intent
              </Typography>
              <Grid item style={{ paddingRight: "5px" }}>
                <Grid item container alignItems="center">
                  <span className={classes.showText}>show on profile</span>
                  <Checkbox
                    variant="switch"
                    name="intentVisible"
                    show={show}
                    handleShow={handleShow}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography
                className={`${classes.title} ${classes.t2}`}
                variant="h5"
              >
                You can change this lator
              </Typography>
            </Grid> */}
            <Grid container spacing={3} className={classes.checkboxContainer}>
              <RadioGroup value={audience} onChange={handleAudiencePreference}>
                <Grid
                  container
                  direction={smScreen ? "column" : "row"}
                  spacing={smScreen ? 0 : 2}
                >
                  <RadioButton
                    value="Meeting someone new"
                    label="Meeting someone new"
                  />
                  <RadioButton
                    value="Something casual"
                    label="Something casual"
                  />
                  <RadioButton value="Friends" label="Friends" />
                  <RadioButton value="Relationship" label="Relationship" />
                  <RadioButton value="Marraige" label="Marraige" />
                  <RadioButton value="Anything" label="Anything" />
                </Grid>
              </RadioGroup>
              {Boolean(errors.audience) && (
                <span className={classes.error}>{errors.audience}</span>
              )}
            </Grid>
            <Grid
              item
              style={{
                marginTop: mdScreen ? "0rem" : "63px",
                paddingLeft: "16px",
              }}
            >
              <Grid item container alignItems="center" justifyContent="center">
                <ButtonComp
                  disabled={disabled}
                  onClick={handleNext}
                  label="Continue"
                />
                {/* <CustomIconButton onClick={handleNext} /> */}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
