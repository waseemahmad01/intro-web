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
    },
    body2: {
      color: "#fff",
      fontSize: "0.6rem",
      textAlign: "center",
    },
    h1: {
      fontSize: "62px",
      fontWeight: "100",
    },
    h3: {
      fontSize: "22px",
      fontWeight: 300,
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: "100",
      lineHeight: "20px",
      // width: "50ch",
    },
    h4: {
      fontSize: "34px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "18px",
      fontWeight: "100",
    },
    h2: {
      fontSize: "33px",
      fontWeight: 500,
      color: "#000",
      marginBottom: "1rem",
    },
    subtitle2: {
      fontSize: "21px",
      fontWeight: 300,
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
