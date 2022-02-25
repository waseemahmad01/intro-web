import { makeStyles } from "@material-ui/core";
import image from "../../../assets/index";

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff8f5",
    backgroundImage: `url(${image.bgUser})`,
    backgroundSize: "644.5px 644.5px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "100% 100%",
    [theme.breakpoints.down("lg")]: {
      backgroundSize: "390px 390px",
    },
  },
  formTitle: {
    marginBottom: "1.8rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
      marginBottom: "0rem",
    },
  },
  form: {
    marginTop: "2.5rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "5rem",
    },
  },
  formContainer: {
    width: "600px",
    [theme.breakpoints.down("lg")]: {
      width: "450px",
      marginTop: "20px",
    },
  },
  checkbox: {
    color: theme.palette.primary.main,
    borderRadius: "4px",
    transform: "scale(1.6)",
    [theme.breakpoints.down("lg")]: {
      transform: "scale(1.2)",
    },
  },

  p: {
    textAlign: "left",
    color: "#000",
    margin: "0",
    marginTop: "13px",
    fontSize: "23px",
    fontWeight: "100",
    "& .link": {
      color: "#000    ",
    },

    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  typographyS1: {
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      marginLeft: "10px",
    },
  },
}));
