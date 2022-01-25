import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  nav: {
    height: "120px",
    [theme.breakpoints.down("lg")]: {
      height: "85px",
    },
  },
  searchBar: {
    width: "337px",
    height: "54px",
    backgroundColor: "#ffffff",
    borderRadius: "27px",
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "250px",
    },
  },

  searchIcon: {
    height: "20px",
    width: "20px",
  },
  searchInput: {
    margin: "auto 0",
    marginLeft: "20px",
    fontSize: "15px",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("lg")]: {
      marginLeft: "15px",
      width: "70%",
      fontSize: "12px",
    },
  },
  iconContainer: {
    marginRight: "20px",
    [theme.breakpoints.down("lg")]: {
      marginRight: "10px",
      height: "25px",
      width: "25px",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  input: {
    "&::placeholder": {
      color: theme.palette.primary.main,
    },
  },
  live: {
    fontSize: "30px",
    fontFamily: "Helvetica",
    textTransform: "none",
    textDecoration: "none",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  avatarTitle: {
    fontSize: "20px",
    fontFamily: "Helvetica",
    marginRight: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  avatar: {
    height: "75px",
    width: "75px",
    [theme.breakpoints.down("lg")]: {
      width: "50px",
      height: "50px",
    },
  },
  rightContainer: {
    width: "450px",
    marginLeft: "auto",
    marginRight: "3rem",
    [theme.breakpoints.down("lg")]: {
      width: "350px",
    },
  },
  menuContainer: {
    opacity: "0.9",
    // right: "100px",
    bottom: 0,
    "& .MuiMenu-list": {
      padding: "0",
    },
    position: "relative",
  },
  icons: {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  },
  menuIcon: {
    color: "#000",
    fontSize: "2rem",
  },
  menuItem: {
    margin: "0",
    height: "60px",
    padding: "5px 2rem",
    justifyContent: "center",
  },
  menuTitle: {
    color: "#000",
    fontSize: "20px",
  },
  list: {
    padding: "0",
  },
  listItem: {
    width: "250px",
    padding: "0.5rem 0",
    "&:hover": {
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  menuAvatar: {
    marginLeft: "10px",
  },
  listItemsText: {
    "& .MuiListItemText-primary": {
      color: "#000",
      margin: 0,
      fontSize: "12px",
      width: "100%",
      textAlign: "left",
      marginLeft: "10px",
    },
    "&:hover": {
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  action: {
    "& span": {
      fontSize: "12px",
    },
  },
  logo: {
    width: "8rem",
    marginLeft: "30px",
    [theme.breakpoints.down("lg")]: {
      width: "5.5rem",
    },
  },
  badge: {
    "& .MuiBadge-badge": {
      border: "2px solid #ffffff",
    },
  },
  menuItem: {
    margin: 0,
    color: "#000000",
    fontSize: "15px",
    padding: "10px 20px",
    "&:hover": {
      backgroundColor: theme.palette.common.lightPink,
    },
  },
}));
