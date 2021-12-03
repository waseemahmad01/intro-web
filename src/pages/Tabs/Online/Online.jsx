import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Grid,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Filter } from "../../../components/Filter/Filter";
import image from "../../../assets/index";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2rem 2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1.5rem 2rem",
    },
  },
  title: {
    fontSize: "39px",
    fontWeight: "700",
    marginTop: "1rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
      marginBottom: "1rem",
    },
  },
  badge: {
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#26BB21",
      height: "39px",
      width: "39px",
      borderRadius: "50%",
      border: "2px solid #ffffff",
      [theme.breakpoints.down("lg")]: {
        width: "16px",
        height: "16px",
        minWidth: "0",
      },
    },
  },
  avatar: {
    height: "188px",
    width: "188px",
    [theme.breakpoints.down("lg")]: {
      height: "100px",
      width: "100px",
    },
  },
  avatarContainer: {
    display: "flex",
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: {
    fontSize: "31px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  fixButton: {
    backgroundColor: "#FE858C",
    position: "fixed",
    bottom: 20,
    right: 20,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#Ff859C",
    },
  },
  innerContainer: {
    padding: "0rem 10.6rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0rem 9.7rem",
    },
  },
  item: {
    marginBottom: "2rem",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "1rem",
    },
  },
}));

export const Online = () => {
  const classes = useStyles();
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Online</h1>
      <Grid
        container
        className={classes.innerContainer}
        spacing={lgScreen ? 3 : 4}
      >
        {items.map((item) => (
          <Grid key={item} item className={classes.item}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Badge
                  className={classes.badge}
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  color="secondary"
                  badgeContent=""
                >
                  <Avatar
                    component={Link}
                    to="/home/profile"
                    className={classes.avatar}
                    src={image.img}
                  />
                </Badge>
              </Grid>
              <Grid item>
                <span className={classes.avatarTxt}>@username</span>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
