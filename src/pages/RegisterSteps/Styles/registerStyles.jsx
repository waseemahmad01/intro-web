import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff8f5",
    backgroundSize: "554.5px 520.5px, 330px 250px",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("lg")]: {
      backgroundSize: "390px 390px, 240px 190px",
    },
  },

  form: {
    padding: "0 8rem",
    marginTop: "5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 5rem",
      marginTop: "7rem",
    },
  },
  formContainer: {
    width: "860px",
    // backgroundColor: "red",
    marginTop: "2rem",
    padding: "10px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
      // padding: "5px 10px",
      width: "680px",
    },
    zIndex: 1,
  },
  checkbox: {
    color: theme.palette.primary.main,
    borderRadius: "4px",
    transform: "scale(1.6)",
    [theme.breakpoints.down("lg")]: {
      transform: "scale(1.3)",
    },
  },

  p: {
    textAlign: "left",
    color: "#000",
    marginTop: "2rem",
    fontSize: "23px",
    fontWeight: "100",
    "& a": {
      color: "#000    ",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
      marginTop: "1rem",
    },
  },
  skipButton: {
    backgroundColor: theme.palette.primary.main,
    width: "134px",
    height: "85px",
    borderRadius: "43px",
    marginTop: "20px",
    marginLeft: "3rem",
    fontSize: "28px",
    color: "#ffff",
    fontWeight: "700",
    textTransform: "capitalzie",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    display: "inline-block",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
      height: "50px",
      fontSize: "18px",
      marginTop: "10px",
    },
  },
  title: {
    marginLeft: "34px",
    marginBottom: "0.8rem",
  },
  checkboxWithText: {
    backgroundColor: "#fff",
    borderRadius: "34px",
    border: `2px solid  ${theme.palette.primary.main}`,
    width: "264px",
    height: "62px",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "100%",
    },
  },
  label: {
    marginLeft: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      width: "88%",
    },
  },
  showProfileText: {
    fontSize: "15px",
    marginRight: "10px",
    marginLeft: "20px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
  checkboxContainer: {
    marginBottom: "1rem",
    paddingLeft: "16px",
    width: "880px",
    [theme.breakpoints.down("lg")]: {
      width: "700px",
    },
  },
  t2: {
    fontSize: "18px",
    fontWeight: "100",
  },
  inputContainer: {
    width: "456px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
    },
  },
  switchContainer: {
    width: "210px",
  },
  formControlLabel: {
    border: `2px solid ${theme.palette.primary.main}`,
    width: "264px",
    height: "62px",
    borderRadius: "34px",
    backgroundColor: "white",
    padding: "0.5rem",
    margin: "0",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "100%",
    },
    "&.MuiFormControlLabel-root": {
      justifyContent: "space-between",
    },
    "& .MuiFormControlLabel-label": {
      color: "#000000",
      margin: "0",
      marginLeft: "5px",
      fontSize: "18px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "14px",
      },
    },
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "1.3rem",
    marginLeft: "20px",
    marginTop: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
      marginTop: "7px",
    },
  },

  // select styles
  selectContainer: {
    width: "456px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
    },
  },
  select: {
    width: "456px",
    borderRadius: "34px",
    backgroundColor: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
    height: "62px",
    textAlign: "left",
    paddingLeft: "0.4rem",
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  select1: {
    width: "456px",
    borderRadius: "34px",
    backgroundColor: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
    minHeight: "62px",
    textAlign: "left",
    paddingLeft: "0.4rem",
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    "&:before": {
      borderColor: "transparent",
    },
    "&:after": {
      borderColor: "transparent",
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      minHeight: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
  },
  menuOrigin: {
    visibility: "hidden",
    "& .MuiMenu-paper": {
      visibility: "hidden",
    },
  },
  inputLabel: {
    marginLeft: "25px",
    padding: "none",
    fontWeight: "300",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginLeft: "14px",
    },
  },
  switchRoot: {},
  switchContainer: {
    marginTop: "-10px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0px",
    },
    width: "210px",
    "& span": {
      fontSize: "15px",
      marginRight: "20px",
      marginLeft: "22px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        marginLeft: "14px",
        marginRight: "10px",
      },
    },
  },
  dropdownIcon: {
    fontSize: "2rem",
    marginRight: "5px",
    fontWeight: "700",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.7rem",
    },
  },
  none: {
    color: "rgba(112,112,112,0.5)",
  },

  //   dialog styles
  dialog: {
    "& .MuiDialog-paper": {
      border: "1px solid #707070",
      borderRadius: "0px",
    },
  },
  dialogContainer: {
    backgroundColor: theme.palette.common.lightPink,
    // padding: "36px 20px",
    paddingBlock: "36px 25px",
    paddingInline: "20px",
  },
  dialogTitle: {
    margin: 0,
    color: "#000000",
    textAlign: "left",
    fontSize: "22px",
    fontWeight: "bold",
  },
  dialogSubtitle: {
    margin: 0,
    color: "#828282",
    textAlign: "left",
    fontSize: "18px",
  },
  chipsContainer: {
    marginTop: "35px",
  },
  dialogButton: {
    width: "369px",
    height: "57px",
    margin: 0,
    fontSize: "16px",
    color: "#ffffff",
    marginTop: "1.25rem",
    textTransform: "none",
    borderRadius: "29px",
  },
  active: {
    border: "2px solid red",
  },
  menuItem: {
    color: "#000",
    marginBottom: "5px",
    fontSize: "22px",
    "&:hover": {
      backgroundColor: "#e7e7e7",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  underline: {
    // visibility: "hidden",
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderColor: "transparent",
    },
  },
  chips: { display: "flex", flexWrap: "wrap" },
  chip: {
    margin: "2px",
    [theme.breakpoints.down("lg")]: {
      height: "23px",
      margin: "1px",
      fontSize: "11px",
    },
  },
}));
