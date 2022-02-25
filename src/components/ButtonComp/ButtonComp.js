import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const ButtonComp = ({ label, ...rest }) => {
  const classes = useStyles();
  return (
    <Button variant="contained" {...rest} className={classes.button}>
      {label}
    </Button>
  );
};

export default ButtonComp;

const useStyles = makeStyles((theme) => ({
  button: {
    width: "510px",
    backgroundColor: theme.palette.common.green,
    color: "white",
    textTransform: "none",
    fontSize: "28px",
    fontWeight: "500",
    height: "85px",
    borderRadius: "43px",
    "&:hover": {
      backgroundColor: theme.palette.common.greenDark,
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
    [theme.breakpoints.down("lg")]: {
      height: "55px",
      width: "330px",
      fontSize: "20px",
    },
  },
}));
