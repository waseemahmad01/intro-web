import React, { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { likedMe } from "../../../http";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem 3rem",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 2rem",
    },
  },
  title: {
    fontSize: "39px",
    fontWeight: "500",
    margin: "2rem 0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
      margin: "1rem 0rem",
    },
  },
  likesContainer: {
    padding: "0rem",
  },
  avatar: {
    height: "112px",
    width: "112px",
    [theme.breakpoints.down("lg")]: {
      height: "80px",
      width: "80px",
    },
  },
  avatarTxt: {
    fontSize: "16px",
    textDecoration: "none",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  },
  userInfoTitle: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "0",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "21px",
    },
  },
  userInfo: {
    marginBottom: "0",
    fontSize: "24px",
    fontWeight: "500",
    color: "#443F3D",
    [theme.breakpoints.down("lg")]: {
      fontSize: "19px",
    },
  },
}));

export const MyLikes = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [likes, setLikes] = useState([]);
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  useEffect(() => {
    (async function () {
      const { data } = await likedMe();
      setLikes(data.data);
    })();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>My Likes</h1>
      <Grid
        container
        // direction="column"
        spacing={lgScreen ? 3 : 5}
        className={classes.likesContainer}
      >
        {likes.map((like, index) => (
          <Grid key={index} sm={3} item container spacing={2}>
            <Grid item>
              <Grid
                container
                spacing={1}
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <Avatar
                    component={Link}
                    to={`/home/profile/${like.liked_by}`}
                    className={classes.avatar}
                    src={like.liked_by_profile_image}
                  />
                </Grid>
                <Grid item>
                  <span className={classes.avatarTxt}>
                    {like.liked_by_name}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-start" direction="column">
                <Typography className={classes.userInfoTitle}>
                  {like.liked_by_name}
                </Typography>
                <Typography className={classes.userInfo}>26</Typography>
                <Typography className={classes.userInfo}>New York</Typography>
                <Typography className={classes.userInfo}>2 mi</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
