import React from "react";
import { useStyles } from "./helpStyles";
import {
  Grid,
  InputBase,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import image from "../../assets/index";
import { NavigateNext } from "@material-ui/icons";
import { Header } from "../../components/header/Header";
import { NavLink } from "react-router-dom";
export const HelpCenter = () => {
  const classes = useStyles();
  const headerItems = [
    {
      label: "Register",
      to: "/signin",
    },
    {
      label: "Log in",
      to: "/",
    },
  ];
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Header headerItems={headerItems} transparent />
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        className={classes.innerContainer}
      >
        <Grid item className={classes.titleContainer}>
          <p className={classes.title}>Help Center</p>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.searchBar}
          >
            <Grid item>
              <img
                src={image.searchIcon}
                className={classes.searchIcon}
                alt=""
              />
            </Grid>
            <InputBase className={classes.searchInput} />

            <Grid item>
              <IconButton className={classes.navNextBtn}>
                <NavigateNext className={classes.navNextIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <p className={classes.subTitle1}>
            Or <span>Pick</span> a catagory
          </p>
        </Grid>
        <Grid item style={{ width: "80%", marginInline: "auto" }}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  style={{ textDecoration: "none" }}
                  component={NavLink}
                  to="/helpcenter/profileandaccount"
                  className={classes.cardHeader}
                  title="Profile & Account"
                />
                <CardContent className={classes.cardContent}>
                  <p>
                    Profile & Accounts screen includes the guidelines and help
                    regarding profile editing, account management, email editing
                    notification, and email unsubscriptions.
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  style={{ textDecoration: "none" }}
                  component={NavLink}
                  to="/helpcenter/billingandsubscription"
                  className={classes.cardHeader}
                  title="Billing & Subscriptions"
                />
                <CardContent className={classes.cardContent}>
                  <p>
                    Billing & Subscription screen includes payments, product
                    purchases, Third-party purchases, and Live credits features.
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  style={{ textDecoration: "none" }}
                  component={NavLink}
                  to="/helpcenter/safetyandprivacy"
                  className={classes.cardHeader}
                  title="Safety & Privacy"
                />
                <CardContent className={classes.cardContent}>
                  <p>
                    Safety and Privacy includes Guidelines & Rules, Staying
                    Safe, Account Security, and Legal Requests features.
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  style={{ textDecoration: "none" }}
                  component={NavLink}
                  to="/helpcenter/features"
                  className={classes.cardHeader}
                  title=" Features"
                />
                <CardContent className={classes.cardContent}>
                  <p>
                    Features option screen includes the details and information
                    regarding all the features including, Matches, Meet Me,
                    Favorites & Likes, Messaging, Searching, Tokens, Upgraded
                    Account, Mobile, Live, Member Profiles, and Other.
                  </p>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardHeader
                  component={NavLink}
                  to="/helpcenter/livefaq"
                  className={classes.cardHeader}
                  title=" Live FAQ’s"
                  style={{ textDecoration: "none" }}
                />
                <CardContent className={classes.cardContent}>
                  <p>
                    Profile & Accounts screen includes the guidelines and help
                    regarding profile editing, account management, email editing
                    notification, and email unsubscriptions.
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <p className={classes.subTitle2}>Quick Answers</p>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            className={classes.question}
            alignItems="center"
          >
            <p>How can i set up my user profile?</p>
            <IconButton className={classes.questionIcon}>
              <NavigateNext />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-between"
            className={classes.question}
            alignItems="center"
          >
            <p>How Can I set up my user profile?</p>
            <IconButton className={classes.questionIcon}>
              <NavigateNext />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
