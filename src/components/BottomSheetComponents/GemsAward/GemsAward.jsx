import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import image from "../../../assets";

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
    marginBottom: "34px",
    [theme.breakpoints.down(1480)]: {
      fontSize: "25px",
      lineHeight: "45px",
    },
  },
  subtitle: {
    margin: 0,
    color: "#929292",
    fontSize: "23px",
    marginBottom: "35px",
  },
  image: {
    height: "117px",
    width: "117px",
    borderRadius: "50%",
    marginInline: "10px",
  },
}));
const GemsAward = () => {
  const classes = useStyles();
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
      <Grid item container>
        <img src={image.img} className={classes.image} alt="" />
        <img src={image.img} className={classes.image} alt="" />
      </Grid>
    </Grid>
  );
};

export default GemsAward;
