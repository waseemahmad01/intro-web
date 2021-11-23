import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import {
  Grid,
  RadioGroup,
  Typography,
  useTheme,
  useMediaQuery,
  FormControlLabel,
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

export const RegisterFour = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [datePreference, setDatePrerence] = useState(null);
  const [audience, setAudience] = useState(null);

  const handleDatePreference = (e) => {
    setDatePrerence(e.target.value);
  };
  const handleAudiencePreference = (e) => {
    setAudience(e.target.value);
  };
  //   const handleClick = (e) => {
  //     const { checked, name } = e.target;
  //     setValues({ ...values, [name]: checked });
  //   };
  const handleNext = async () => {
    try {
      //   const keys = Object.keys(values);
      //   //   console.log(keys);
      //   let list = keys.filter((key) => values[key] === true);
      //   let audienceT = list.map((e) => audience[e]);
      //   //   console.log(audienceT);
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
              </RadioGroup>
            </Grid>
            <Grid item>
              <Typography className={classes.title} variant="h3">
                What are you looking for
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
              {/* <Grid item xs={6} sm={4}>
                <FormControlLabel
                  value={values}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="meet"
                      show={values.meet}
                    />
                  }
                  label="Meet Someone New"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  onClick={handleClick}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="casual"
                      show={values.casual}
                    />
                  }
                  label="Something Casual"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  onClick={handleClick}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="friends"
                      show={values.friends}
                    />
                  }
                  label="Friends"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  onClick={handleClick}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="relationship"
                      show={values.relationship}
                    />
                  }
                  label="Relationship"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  onClick={handleClick}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="marraige"
                      show={values.marraige}
                    />
                  }
                  label="Marraige"
                  labelPlacement="start"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  onClick={handleClick}
                  className={classes.formControlLabel}
                  control={
                    <Checkbox
                      variant="circle"
                      handleShow={handleClick}
                      name="anything"
                      show={values.anything}
                    />
                  }
                  label="Anything"
                  labelPlacement="start"
                />
              </Grid> */}
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
