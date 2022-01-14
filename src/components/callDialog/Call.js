import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Dialog,
  useTheme,
} from "@material-ui/core";
import Lottie from "react-lottie";
import animation from "../../assets/animations/callAnimation1.json";
import { CallRounded, CallEndRounded } from "@material-ui/icons";

const Call = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Dialog className={classes.dialog} open={open}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        className={classes.container}
      >
        <Typography className={classes.title}>Incoming call</Typography>
        <Lottie options={defaultOptions} height={200} width={200} />
        <Grid item container justifyContent="space-between" alignItems="center">
          <IconButton
            style={{ background: theme.palette.success.dark }}
            className={classes.iconButton}
          >
            <CallRounded className={classes.icons} />
          </IconButton>
          <IconButton
            style={{ background: theme.palette.error.dark }}
            className={classes.iconButton}
          >
            <CallEndRounded className={classes.icons} />
          </IconButton>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Call;

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  title: {
    margin: 0,
    fontSize: "35px",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
  },
  container: {
    padding: "2rem 2rem",
    height: "400px",
    width: "350px",
  },
  iconButton: {
    height: "70px",
    width: "70px",
  },
  icons: {
    color: theme.palette.common.lightPink,
    fontSize: "40px",
  },
}));
