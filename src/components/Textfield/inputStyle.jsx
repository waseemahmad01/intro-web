import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  input: {
    fontSize: "22px",
    backgroundColor: "#fff",
    borderRadius: "34px",
    height: "62px",
    marginBottom: "20px",
    paddingLeft: "7px",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      fontSize: "15px",
      marginBottom: "10px",
    },
  },
  inputDate: {
    fontSize: "22px",
    backgroundColor: "#fff",
    borderRadius: "34px",
    height: "62px",
    border: `2px solid ${theme.palette.primary.light}`,
    margin: "0",
    marginBottom: "30px",
    paddingLeft: "7px",
    "&::-webkit-calendar-picker-indicator": {
      backgroundColor: "red",
      color: "rgba(0,0,0,0)",
      display: "block",
      width: "20px",
      height: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      fontSize: "15px",
      border: `1px solid ${theme.palette.primary.light}`,
      marginBottom: "10px",
    },
  },
  inputLabel: {
    marginLeft: "25px",
    marginBottom: "5px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginLeft: "14px",
    },
  },
  inputRoot: {
    "& .MuiOutlinedInput-root": {
      boxShadow: theme.shadows[2],
      "& fieldset": {
        border: "1px solid transparent",
        // border: `2px solid ${theme.palette.primary.main}`,
      },
      "&:hover fieldset": {
        border: "1px solid transparent",
        // border: `2px solid ${theme.palette.primary.main}`,
      },
      "&.Mui-focused fieldset": {
        border: "1px solid transparent",
        // border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  error: {
    fontSize: "1.3rem",
    marginTop: "-15px",
    marginBottom: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
      marginBottom: "0px",
      marginTop: "-5px",
    },
  },
}));
