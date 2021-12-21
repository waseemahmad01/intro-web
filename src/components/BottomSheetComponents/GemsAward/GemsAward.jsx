import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import image from "../../../assets";
import { Add, Remove } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 3rem",
    [theme.breakpoints.down(1680)]: {
      padding: "0 2rem",
    },
  },
  title: {
    fontSize: "33px",
    fontWeight: 700,
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    marginBottom: "30px",
    [theme.breakpoints.down(1480)]: {
      fontSize: "25px",
      marginBottom: "15px",
    },
  },
  subtitle: {
    margin: 0,
    color: "#929292",
    fontSize: "23px",
    marginBottom: "35px",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "15px",
      fontSize: "17px",
    },
  },
  image: {
    height: "117px",
    width: "117px",
    borderRadius: "50%",
    marginInline: "10px",
    boxShadow: theme.shadows[8],
    [theme.breakpoints.down("lg")]: {
      height: "70px",
      width: "70px",
    },
  },
  gem: {
    width: "44px",
    [theme.breakpoints.down("lg")]: {
      width: "22px",
    },
  },
  gemContainer: {
    marginBlock: "16px 13px",
    [theme.breakpoints.down("lg")]: {
      marginBlock: "8px 7px",
    },
  },
  buttons: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#000000",
    marginInline: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  gemCount: {
    fontSize: "35px",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
  },
  sendButton: {
    height: "62px",
    width: "337px",
    textTransform: "none",
    fontSize: "20px",
    borderRadius: "25px",
    marginTop: "20px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "10px",
      height: "45px",
      width: "250px",
      fontSize: "18px",
    },
  },
}));
const GemsAward = () => {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography className={classes.title}>Award Gems</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.subtitle}>
          Award gems to the participants of this face-off
        </Typography>
      </Grid>
      <Grid item container justifyContent="center">
        <img src={image.img} className={classes.image} alt="" />
        <img src={image.img} className={classes.image} alt="" />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        className={classes.gemContainer}
      >
        <img src={image.gem} className={classes.gem} alt="" />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Grid item container alignItems="center">
            <IconButton onClick={handleDecrement}>
              <Remove className={classes.buttons} />
            </IconButton>
            <span className={classes.gemCount}>{count}</span>
            <IconButton onClick={handleIncrement}>
              <Add className={classes.buttons} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.sendButton}
        >
          Send Gems
        </Button>
      </Grid>
    </Grid>
  );
};

export default GemsAward;
