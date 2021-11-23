import React from "react";
import {
  makeStyles,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  radio: {
    border: `2px solid  ${theme.palette.primary.main}`,
    borderRadius: "34px",
    width: "264px",
    height: "62px",
    backgroundColor: "#fff",
    position: "relative",
    "& .MuiFormControlLabel-label": {
      color: "#000",
      fontSize: "18px",
      fontWeight: "300",
      marginTop: "47px",
      width: "100%",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
      },
    },
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "205px",
    },
  },
  label: {
    fontSize: "18px",
    width: "100%",
    textAlign: "left",
    marginLeft: "15px",
    lineHeight: "62px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  radiobtn: {
    transform: "scale(1.3)",
    color: "#cecece",
    borderColor: "#cecece",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .Mui-checked": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      transform: "scale(1)",
    },
  },
  container: {
    [theme.breakpoints.down("sm")]: {
      margin: "7px 0",
    },
  },
}));

export const RadioButton = ({ value, label, hide = false }) => {
  const classes = useStyles();
  return (
    <Grid item className={classes.container}>
      <FormControlLabel
        className={classes.radio}
        value={value}
        control={
          <Radio
            disableRipple
            disableFocusRipple
            color="primary"
            className={classes.radiobtn}
            style={{ visibility: hide ? "hidden" : "visible" }}
          />
        }
        label={
          <Typography variant="subtitle1" className={classes.label}>
            {label}
          </Typography>
        }
        labelPlacement="start"
      />
    </Grid>
  );
};
