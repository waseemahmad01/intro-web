import { createTheme } from "@material-ui/core/styles";

export default createTheme({
  palette: {
    common: {
      grey: "#707070",
      lightPink: "#fff2eb",
      crimson: "#d5616d",
      blue: "#5330ad",
      darkPink: "#FE858C",
      green: "#04B15E",
      greenDark: "#2EA551",
    },
    primary: {
      main: "#5330ad",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    body1: {
      color: "#fff",
      fontSize: "20px",
      textAlign: "center",
      marginBottom: "3rem",
      fontFamily: "Mulish",
    },
    body2: {
      color: "#fff",
      fontSize: "0.6rem",
      textAlign: "center",
      fontFamily: "Mulish",
    },
    h1: {
      fontSize: "35px",
      fontWeight: "100",
      fontFamily: "Mulish",
    },
    h3: {
      fontSize: "22px",
      fontWeight: 300,
      fontFamily: "Mulish",
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: "100",
      lineHeight: "20px",
      fontFamily: "Mulish",
      // width: "50ch",
    },
    h4: {
      fontSize: "34px",
      fontWeight: 500,
      fontFamily: "Mulish",
    },
    h5: {
      fontSize: "18px",
      fontWeight: "100",
      fontFamily: "Mulish",
    },
    h2: {
      fontSize: "33px",
      fontWeight: 500,
      color: "#000",
      marginBottom: "1rem",
      fontFamily: "Mulish",
    },
    subtitle2: {
      fontSize: "21px",
      fontWeight: 300,
      fontFamily: "Mulish",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "#ffffff",
          opacity: 1,
        },
        color: "#ffffff",
      },
      underline: {
        "&:before": {
          borderBottom: "2px solid #707070",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: "2px solid #707070",
        },
      },
    },
    // MuiSelect:{
    // 	select:{
    // 		"&:focus":{
    // 			backgroundColor: "red",
    // 		},
    // 		'&:before': {
    // 			borderColor: 'orange'
    // 		  },
    // 		  '&:after': {
    // 			borderColor: 'green',
    // 		}
    // 	}
    // }
  },
});
