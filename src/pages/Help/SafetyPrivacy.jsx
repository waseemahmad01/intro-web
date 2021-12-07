import React from "react";
import { useStyles } from "./helpStyles";
import { Grid, Typography } from "@material-ui/core";
import { Header } from "../../components/header/Header";

export const SafetyPrivacy = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Header transparent />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={classes.colorTxt}
      >
        <Grid item className={classes.textContainer}>
          <h1>Safety & Privacy</h1>
          <h2>
            Tips, recommendations, and how-to’s for staying safe while meeting
            new people online and off.
          </h2>
        </Grid>
      </Grid>
      <Grid item>
        <p className={classes.subtitle2}>
          Intro &gt; Help Center &gt; Safety and Privacy
        </p>
      </Grid>
      <Grid
        item
        container
        className={classes.columnContainer}
        justifyContent="space-evenly"
      >
        <div className={classes.column}>
          <Grid className={classes.col} item>
            <div className={classes.colInnerContainer}>
              <Typography className={classes.colTitle} variant="h2">
                Guidelines and Rules
              </Typography>
              <Typography className={classes.colText} variant="subtitle2">
                Community Guidelines
              </Typography>
              <Typography className={classes.colText} variant="subtitle2">
                Terms of Service
              </Typography>
            </div>
          </Grid>
          <Grid className={`${classes.col} ${classes.margin}`} item>
            <div className={classes.colInnerContainer}>
              <Typography className={classes.colTitle} variant="h2">
                Legal Requests
              </Typography>
              <Typography className={classes.colText} variant="subtitle2">
                Your Privacy Rights
              </Typography>
              <Typography className={classes.colText} variant="subtitle2">
                Cookie Policy
              </Typography>
            </div>
          </Grid>
        </div>
        <Grid className={classes.col} item>
          <div className={classes.colInnerContainer}>
            <Typography className={classes.colTitle} variant="h2">
              Staying Safe
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Blocking Another Member
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Blocking on Live!
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Reporting a Member
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Reporting on Live!
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Safety on a First Date
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Contacting Intro
            </Typography>
          </div>
        </Grid>
        <Grid className={classes.col} item>
          <div className={classes.colInnerContainer}>
            <Typography className={classes.colTitle} variant="h2">
              Account Security
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Two-Factor Authentication (2FA)
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Troubleshooting account verification
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Changing your Verification Phone Number
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              If you Believe Your account was Compromised
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Digital Security and Measures
            </Typography>
            <Typography className={classes.colText} variant="subtitle2">
              Profiles and Automated Decision Making
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
