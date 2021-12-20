import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tabs: {
    marginInline: "auto",
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
  tab: {
    minWidth: "35px",
    width: "150px",
    [theme.breakpoints.down("lg")]: {
      width: "100px",
    },
    "& 	.MuiTab-wrapper": {
      margin: 0,
      "& > :first-child": {
        marginBottom: "0px",
      },
    },
  },
  listItem: {
    width: "100%",
    padding: "0.7rem 0rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0.4rem 0",
    },
  },
  listItemText: {
    marginLeft: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0.7rem",
    },
    "& .MuiListItemText-primary": {
      margin: 0,
      color: "#000",
      fontSize: "15px",
      fontWeight: 500,
      textAlign: "left",
      marginBottom: "5px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        marginBottom: "0px",
      },
    },
  },
  secondaryText: {
    display: "flex",
  },
  text: {
    fontSize: "15px",
    fontWeight: 100,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  gemCounter: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(112,112,122,0.4)",
    borderRadius: "26px",
    padding: "2px 8px",
    backgroundColor: "#fff",
    marginLeft: "0.8rem",
    "& img": {
      width: "0.6rem",
    },
    "& span": {
      fontSize: "12px",
      color: "#000",
      marginLeft: "5px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "10px",
      },
    },
  },
  avatarRoot: {
    minWidth: "20px",
    minHeight: "20px",
  },
  avatar: {
    width: "46px",
    height: "46px",
    [theme.breakpoints.down("lg")]: {
      width: "35px",
      height: "35px",
    },
  },
  tabsIcon: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0px",
    "& img": {
      width: "1.4rem",
      [theme.breakpoints.down("lg")]: {
        width: "0.8rem",
      },
    },
    "& span": {
      marginLeft: "5px",
      fontSize: "20px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "14px",
      },
    },
  },
  tabLabel: {
    fontSize: "17px",
    textTransform: "none",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  box: {
    overflowY: "auto",
    height: "100%",
  },
  scrollView: {
    height: "510px",
    [theme.breakpoints.down("lg")]: {
      height: "310px",
    },
  },
}));
