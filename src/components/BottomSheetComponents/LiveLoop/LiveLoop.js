import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Chip,
  Slider,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem",
    [theme.breakpoints.down(1680)]: {
      padding: "1rem 2rem",
    },
  },
  title: {
    margin: "0",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontSize: "30px",
    fontWeight: 700,
    [theme.breakpoints.down(1680)]: {
      fontSize: "18px",
    },
  },
  description: {
    fontSize: "16px",
    marginTop: "0.5rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "12px",
      marginTop: "0.25rem",
    },
  },
  dateText: {
    margin: "0",
    color: "#000",
    fontSize: "21px",
    marginTop: "3rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
      marginTop: "0.6rem",
    },
  },
  chipContainer: {
    marginTop: "1rem",
    [theme.breakpoints.down(1680)]: {
      marginTop: "0.5rem",
    },
  },
  chip: {
    width: "140px",
    height: "56px",
    borderRadius: "28px",
    backgroundColor: "#fff",
    fontSize: "17px",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down(1680)]: {
      height: "30px",
      width: "90px",
      fontSize: "11px",
    },
  },
  allowText: {
    color: "#000",
    margin: "0",
    marginTop: "3rem",
    width: "100%",
    textAlign: "left",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
      fontSize: "13px",
    },
  },
  sliderContainer: {
    marginTop: "1rem",
  },
  sliderRoot: {
    color: theme.palette.primary.main,
    height: "2px",
    "& .MuiSlider-thumb": {
      height: "17px",
      width: "17px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-8.5px",
      marginLeft: "-8.5px",
    },
    "& 	.MuiSlider-valueLabel": {
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "13px",
      },
    },
  },
  sliderLabel: {
    color: "#000",
    margin: "0",
    fontSize: "17px",
    width: "100%",
    textAlign: "left",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
    },
  },
  startButton: {
    width: "194px",
    height: "48px",
    textTransform: "none",
    borderRadius: "38px",
    fontSize: "22px",
    marginTop: "1rem",
    [theme.breakpoints.down(1680)]: {
      fontSize: "13px",
      width: "120px",
      height: "30px",
    },
  },
  active: {
    border: "2px solid blue",
  },
}));
export const LiveLoop = () => {
  const classes = useStyles();
  const [age, setAge] = useState([22, 32]);
  const [distance, setDistance] = useState(1);
  const handleAge = (event, age) => {
    setAge(age);
  };
  const handleDistance = (event, distance) => {
    setDistance(distance);
  };
  const handleValueLabel = (value) => {
    return `${value}mi`;
  };
  const handleClick = (e) => {
    e.target.classList.toggle(classes.active);
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        <Typography className={classes.title}>Live Loop</Typography>
      </Grid>
      <Grid item>
        <p className={classes.description}>
          Speed date other users with a timer!
        </p>
      </Grid>
      <Grid item container>
        <Typography className={classes.dateText}>I want to date</Typography>
      </Grid>
      <Grid
        item
        container
        className={classes.chipContainer}
        justifyContent="space-between"
      >
        <Grid item>
          <Chip className={classes.chip} label="Men" onClick={handleClick} />
        </Grid>
        <Grid item>
          <Chip className={classes.chip} label="Women" onClick={handleClick} />
        </Grid>
        <Grid item>
          <Chip
            className={classes.chip}
            label="Everyone"
            onClick={handleClick}
          />
        </Grid>
      </Grid>
      <Typography className={classes.allowText}>Only Allow</Typography>
      <Grid
        item
        container
        alignItems="center"
        className={classes.sliderContainer}
      >
        <Grid item lg={4}>
          <Typography className={classes.sliderLabel}>Age</Typography>
        </Grid>
        <Grid item lg={8}>
          <Slider
            onChange={handleAge}
            value={age}
            defaultValue={[22, 33]}
            min={18}
            max={99}
            valueLabelDisplay="on"
            classes={{ root: classes.sliderRoot }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        className={classes.sliderContainer}
      >
        <Grid item lg={4}>
          <Typography className={classes.sliderLabel}>
            People near me
          </Typography>
        </Grid>
        <Grid item lg={8}>
          <Slider
            onChange={handleDistance}
            value={distance}
            defaultValue={1}
            min={0}
            max={20}
            valueLabelDisplay="on"
            classes={{ root: classes.sliderRoot }}
            valueLabelFormat={handleValueLabel}
          />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item></Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.startButton}
        >
          Start
        </Button>
      </Grid>
    </Grid>
  );
};
