import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  postAvatar: {
    width: "104px",
    height: "104px",
    marginLeft: "10px",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      width: "70px",
      height: "70px",
      marginLeft: "10px",
    },
  },
  postAvatarText: {
    fontSize: "22px",
    marginTop: "8px",
    marginLeft: "5px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginLeft: "0px",
    },
  },
  postContainer: {
    width: "914px",
    height: "750px",
    padding: "0rem 1rem",
    borderRadius: "54px",
    [theme.breakpoints.down("lg")]: {
      width: "600px",
      height: "530px",
      padding: "0.5rem 1rem",
      borderRadius: "33px",
    },
  },
  postAvatarContainer: {
    paddingTop: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0.5rem",
    },
  },
  postTitle: {
    fontSize: "24px",
    fontFamily: "Helvetica",
    margin: "10px 0px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
      margin: "8px 0",
    },
  },
  postAsset: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  postAssetContainer: {
    padding: 0,
    paddingLeft: "0.5rem",
    marginBottom: 0,
  },
  imageContianer: {
    position: "relative",
    height: "640px",
    width: "428px",
    overflow: "hidden",
    borderRadius: "35px",
    background: "#000000",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "447.97px",
    },
  },
  iconContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    borderRadius: "16px",
    opacity: 1,
    transition: "0.6s ease",
  },
  icons: {
    height: "100%",
    padding: "0.25rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0.25rem",
    },
  },
  likeIcon: {
    color: "#fbfbfb",
    fontSize: "2.8rem",
    transition: "0.4s ease",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
  },
  muteIcon: {
    width: "40px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "28px",
    },
  },
  superIcons: {
    position: "absolute",
    left: "0%",
    bottom: "42px",
    width: "100%",
    paddingInline: "3rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.71rem",
      bottom: "20px",
    },
  },
  superIcon: {
    height: "60px",
    width: "60px",
    marginInline: "1.5rem",
    [theme.breakpoints.down("lg")]: {
      height: "48px",
      width: "48px",
      marginInline: "0.8rem",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& img": {
      [theme.breakpoints.down("lg")]: {
        width: "3.5rem",
      },
    },
  },
}));
