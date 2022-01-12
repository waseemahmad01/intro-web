import React from "react";
import {
  makeStyles,
  Grid,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  ChevronLeft,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
} from "@material-ui/icons";
import image from "../../assets";
import AgoraRTC from "agora-rtc-sdk-ng";

const AudioCall = ({ hello, closeAPortal, appId }) => {
  const classes = useStyles();
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  console.log(hello, appId);
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid
        item
        container
        className={classes.top}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <IconButton className={classes.prevButton}>
          <ChevronLeft className={classes.icon} />
        </IconButton>
        <Grid item>
          <Grid item container direction="column">
            <Typography className={classes.title}>Savannah</Typography>
            <Typography className={classes.subtitle}> calling</Typography>
          </Grid>
        </Grid>
        <div />
      </Grid>
      <Grid item container direction="column" className={classes.bottom}>
        <Grid item className={classes.imageContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6mQv8iE9O1qNGUGC7Wqq0gYljPX0sai-qA&usqp=CAU"
            alt=""
          />
        </Grid>
        <Grid item container className={classes.middle}></Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.bottomBar}
        >
          <IconButton disableRipple className={classes.actionButton}>
            <Videocam className={classes.actionButtonIcons} />
          </IconButton>
          <IconButton onClick={closeAPortal} className={classes.callEndButton}>
            <CallEnd className={classes.callEndButtonIcon} />
          </IconButton>
          <IconButton disableRipple className={classes.actionButton}>
            <Mic className={classes.actionButtonIcons} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AudioCall;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  top: {
    paddingTop: "3rem",
    paddingInline: "5rem",
    paddingBottom: "1rem",
    backgroundImage: `linear-gradient(to bottom, #654AAB, #E77783)`,
    [theme.breakpoints.down("lg")]: {
      paddingTop: "1rem",
      paddingInline: "1rem",
    },
  },
  prevButton: {
    height: "50px",
    width: "50px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      width: "35px",
    },
  },
  icon: {
    color: "#ffffff",
    fontSize: "50px",
    textShadow: "1px 1px 10px #000000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  title: {
    margin: "0",
    fontSize: "28px",
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  subtitle: {
    margin: "0",
    fontSize: "18px",
    marginTop: "5px",
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  bottom: {
    flexGrow: 1,
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  middle: {
    flexGrow: 1,
    zIndex: 1,
  },
  bottomBar: {
    height: "6rem",
    paddingInline: "30%",
    zIndex: 1,
    background: "#55355Fb3",
    [theme.breakpoints.down("lg")]: {
      height: "3rem",
    },
  },
  actionButtonIcons: {
    fontSize: "60px",
    color: "#ffffff",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  callEndButton: {
    height: "100px",
    width: "100px",
    background: "#EB5757",
    marginTop: "-90px",
    "&:hover": {
      background: "#EB5757",
    },
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      width: "50px",
      marginTop: "-50px",
    },
  },
  callEndButtonIcon: {
    fontSize: "50px",
    color: "#ffffff",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  actionButton: {
    height: "60px",
    width: "60px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      width: "35px",
    },
  },
}));
