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
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { datePreference as datePreferenceApi } from "../../../http";
import Joi from "joi-browser";

export const RegisterFour = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [datePreference, setDatePrerence] = useState("");
  const [audience, setAudience] = useState("");
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
    console.log(result);
    if (!result.error) {
      setErrors({
        datePreference: "",
        audience: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = item.message;
      setErrors(errorsObject);
      return true;
    }
  };

  const handleDatePreference = (e) => {
    setDatePrerence(e.target.value);
    const obj = { datePreference: e.target.value };
    const subSchema = { datePreference: schema.datePreference };
    const { error } = Joi.validate(obj, subSchema);
    const it = error
      ? setErrors({
          ...errors,
          datePreference: `"Date Preference" is not allowed to be empty`,
        })
      : setErrors({ ...errors, datePreference: "" });
  };
  const handleAudiencePreference = (e) => {
    setAudience(e.target.value);
    const obj = { audience: e.target.value };
    const subSchema = { audience: schema.datePreference };
    const { error } = Joi.validate(obj, subSchema);
    const it = error
      ? setErrors({
          ...errors,
          audience: `"Intent" is not allowed to be empty`,
        })
      : setErrors({ ...errors, audience: "" });
  };
  //   const handleClick = (e) => {
  //     const { checked, name } = e.target;
  //     setValues({ ...values, [name]: checked });
  //   };
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      try {
        const apiData = {
          interested_gender: datePreference,
          interested_audience: audience,
          visible: true,
          step: "/hometown",
        };
        console.log(apiData);
        const { data } = await datePreferenceApi(apiData);
        dispatch(submit(data));
        onNext();
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <Grid
      container
      className={classes.container}
      alignItems="center"
      style={{
        backgroundImage: `url(${image.heart})`,
        backgroundPosition: "100% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.form}
      >
        <form action="">
          <Grid
            container
            className={classes.registerFourContainer}
            direction="column"
          >
            <Grid item>
              <Typography className={classes.title} variant="h3">
                Dating Preferences
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={`${classes.title} ${classes.t2}`}
                variant="h5"
              >
                You can change this later
              </Typography>
            </Grid>
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
                {errors.datePreference && (
                  <span className={classes.error}>{errors.datePreference}</span>
                )}
              </RadioGroup>
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="h3">
                Intent
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={`${classes.title} ${classes.t2}`}
                variant="h5"
              >
                You can change this lator
              </Typography>
            </Grid>
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
              {errors.audience && (
                <span className={classes.error}>{errors.audience}</span>
              )}
            </Grid>
            <Grid
              item
              style={{
                marginTop: mdScreen ? "0rem" : "2rem",
                paddingLeft: "16px",
              }}
            >
              <Grid item container alignItems="center" justifyContent="center">
                <CustomIconButton onClick={handleNext} />
                <CustomButton variant="outlineButton">Skip</CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
