import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#000",
    margin: "0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  filterIconContainer: {
    height: "60px",
    width: "60px",
    backgroundColor: "#FE858C",
    "&:hover": {
      backgroundColor: "#FE858C",
    },
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "40px",
    },
  },
  filterIcon: {
    color: "#fff",
    fontSize: "2rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.5rem",
    },
  },
  accordionRoot: {
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "25px",
    width: "392px",
    [theme.breakpoints.down("lg")]: {
      width: "350px",
      borderRadius: "18px",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(0deg)",
    },
  },
  summary: {
    backgroundColor: "#fbfbfb",
    padding: "0.5rem 1rem",
    borderRadius: "25px",
    height: "85px",
    [theme.breakpoints.down("lg")]: {
      height: "55px",
    },
  },
  details: {
    display: "block",
    padding: "5px",
  },
  // child accordion
  filter: {
    height: "68px",
    background: "#ffffff",
    borderRadius: "12px",
    boxSizing: "border-box",
    paddingInline: "21px 14px",
    boxShadow: theme.shadows[1],
    marginBlock: "2px",
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      paddingInline: "14px 8px",
    },
  },
  ageFilterContainer: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: theme.shadows[1],
    marginBlock: "2px",
    paddingInline: "21px 14px",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "14px 8px",
    },
  },
  ageFilter: {
    height: "68px",
    [theme.breakpoints.down("lg")]: {
      height: "50px",
    },
  },
  sliderRoot: {
    marginTop: "10px",
    color: theme.palette.primary.main,
    height: "2px",
    "& .MuiSlider-thumb": {
      height: "20px",
      width: "20px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-7px",
      marginLeft: "-7px",
    },
    "& 	.MuiSlider-valueLabel": {
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "16px",
      },
    },
    "& .MuiSlider-rail": {
      height: "6px",
      backgroundColor: theme.palette.common.darkPink,
    },
    "& .MuiSlider-track": {
      height: "6px",
      backgroundColor: "#FE858C",
    },
  },
  title: {
    margin: 0,
    color: "#7E7E7E",
    fontSize: "18px",
    fontWeight: 500,
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  subtitle: {
    margin: 0,
    color: "#7E7E7E",
    fontSize: "19px",
    fontWeight: 500,
    maxWidth: "20ch",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  arrowIcon: {
    marginTop: "7px",
    transition: "0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: "7px",
    },
  },
  rotate: {
    transform: "rotate(90deg)",
  },
  expandLess: {
    width: "100%",
    "&:hover": {
      backgroundColor: "transparent",
    },
    padding: "0",
    margin: "0",
  },
  expandLessIcon: {
    color: theme.palette.primary.main,
    fontSize: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2rem",
    },
  },
  setButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  cancelButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    marginRight: "0.75rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
}));
