import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Slider } from "../../../components/Slider/Slider";
import image from "../../../assets/index";
import { useStyles } from "./homeStyles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getMatchedUsers,
  iVisitedProfiles,
  visitedMe as visitedMeApi,
  likedMeApi,
  getLiveUsers,
} from "../../../http";
import { setMatches } from "../../../store/matches";
import { setOnlineUsers } from "../../../store/user";
import axios from "axios";

export const Home = () => {
  const classes = useStyles();
  const userState = useSelector((state) => state.auth.user.data);
  const matched = useSelector((state) => state.matches.matches);
  const onlineUsers = useSelector((state) => state.auth.user.onlineUsers);
  const dispatch = useDispatch();
  const [iVisited, setIVisited] = useState([]);
  const [visitedMe, setVisitedMe] = useState([]);
  const [likedMe, setLikedMe] = useState([]);

  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    const feets = Math.floor(realFeets);
    const inches = Math.round((realFeets - feets) * 12);
    return `${feets}'${inches}"`;
  };
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    (async () => {
      await axios
        .all([
          getMatchedUsers(),
          iVisitedProfiles(),
          visitedMeApi(),
          likedMeApi(),
          getLiveUsers(),
        ])
        .then(
          axios.spread(function (res1, res2, res3, res4, res5) {
            dispatch(setMatches(res1.data.data));
            setIVisited(res2.data.data);
            setVisitedMe(res3.data.data);
            setLikedMe(res4.data.data);
            dispatch(setOnlineUsers(res5.data.data));
          })
        )
        .catch((err) => console.log(err));
    })();
    // eslint-disable-next-line
  }, []);
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Online Users</Typography>
      </Grid>
      <Grid item style={{ width: "100%" }} className={classes.sliderContainer}>
        <Slider users={onlineUsers} />
      </Grid>
      <Grid
        item
        container
        spacing={3}
        style={{ marginTop: lgScreen ? "0.5rem" : "1.5rem" }}
      >
        <Grid item className={classes.right}>
          <Grid container direction="column">
            <Grid item className={classes.profileCard}>
              <Typography className={classes.profileCardTitle}>
                Profile
              </Typography>
              <Grid container justifyContent="center">
                <Grid item>
                  <Avatar
                    src={userState.profile_image}
                    className={classes.profileAvatar}
                  />
                </Grid>
                <Grid item className={classes.tags}>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item container justifyContent="space-between">
                      <span className={classes.badge}>
                        {toFeet(userState.height.height)}
                      </span>
                      <span className={classes.badge}>
                        {userState.vices.smoke.smoke}
                      </span>
                    </Grid>
                    <Grid item container justifyContent="space-between">
                      <span className={classes.badge}>
                        {userState.religion.religion}
                      </span>
                      <span className={classes.badge}>
                        {userState.education.degree}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container className={classes.reelContainer}>
              <Typography className={classes.reelTitle}>Reels</Typography>
              <List>
                <ListItem
                  className={classes.reelItem}
                  dense
                  disableGutters
                  alignItems="center"
                >
                  <ListItemAvatar className={classes.reelAvatarContainer}>
                    <Avatar
                      component={Link}
                      to="/home/profile"
                      src={image.reelImage}
                      className={classes.reelAvatar}
                      variant="square"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ root: classes.reelItemText }}
                    primary="Dating me would be like"
                    secondary="23rd june"
                  />
                </ListItem>
                <ListItem
                  className={classes.reelItem}
                  dense
                  disableGutters
                  alignItems="center"
                >
                  <ListItemAvatar className={classes.reelAvatarContainer}>
                    <Avatar
                      component={Link}
                      to="/home/profile"
                      src={image.reelImage}
                      className={classes.reelAvatar}
                      variant="square"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ root: classes.reelItemText }}
                    primary="Dating me would be like"
                    secondary="23rd june"
                  />
                </ListItem>
                <ListItem
                  className={classes.reelItem}
                  dense
                  disableGutters
                  alignItems="center"
                >
                  <ListItemAvatar className={classes.reelAvatarContainer}>
                    <Avatar
                      component={Link}
                      to="/home/profile"
                      src={image.reelImage}
                      className={classes.reelAvatar}
                      variant="square"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    classes={{ root: classes.reelItemText }}
                    primary="Dating me would be like"
                    secondary="23rd june"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.middle}>
          <Grid container direction="column">
            <Grid item className={classes.card}>
              <div className={classes.cardTitle}>
                <Typography className={classes.cardTitleOne}>
                  Your Matches
                </Typography>
                <Typography
                  component={Link}
                  to="/home/inbox"
                  className={classes.cardSubtitle}
                >
                  see more
                </Typography>
              </div>
              <div style={{ overflowX: "auto" }} className={classes.scrollDiv}>
                <div style={{ display: "flex" }}>
                  {matched.length === 0 && (
                    <span className={classes.notFound}>No Matches Found</span>
                  )}
                  {matched.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      key={item.matched_ids.to}
                      className={classes.cardAvatar}
                      src={item.matched_images.to}
                    />
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item className={classes.card}>
              <div className={classes.cardTitle}>
                <Typography className={classes.cardTitleOne}>
                  Who viewed my profile
                </Typography>
                <Typography className={classes.cardSubtitle}>
                  see more
                </Typography>
              </div>
              <div style={{ overflowX: "auto" }} className={classes.scrollDiv}>
                <div style={{ display: "flex" }}>
                  {visitedMe.length === 0 && (
                    <span className={classes.notFound}>
                      No One Visited You Yet
                    </span>
                  )}
                  {visitedMe.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      className={classes.cardAvatar}
                      key={item.visited_from}
                      src={item.visited_by_profile_image}
                    />
                  ))}
                </div>
              </div>
            </Grid>
            <Grid item className={classes.card}>
              <div className={classes.cardTitle}>
                <Typography className={classes.cardTitleOne}>
                  Whose profile i visited
                </Typography>
                <Typography className={classes.cardSubtitle}>
                  see more
                </Typography>
              </div>
              <div style={{ overflowX: "auto" }} className={classes.scrollDiv}>
                <div style={{ display: "flex" }}>
                  {iVisited.length === 0 && (
                    <span className={classes.notFound}>
                      You Haven't Visited Anyone Yet
                    </span>
                  )}
                  {iVisited.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      className={classes.cardAvatar}
                      key={item.visited_to._id}
                      src={item.visited_to_profile_image}
                    />
                  ))}
                </div>
              </div>
            </Grid>

            <Grid item container justifyContent="space-between">
              <Grid item className={classes.itemOne}>
                <Typography className={classes.imageTitle}>
                  Premium subscription
                </Typography>
                <Typography className={classes.imageText}>
                  Unlock more features - Tokens - Add more videos
                </Typography>
              </Grid>
              <Grid item className={classes.itemTwo}>
                <Typography className={classes.imageTitle}>
                  Top prompts!
                </Typography>
                <Typography className={classes.imageText}>
                  Find out which prompts had the most success with our monthly
                  pick!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.left}>
          <Grid container>
            <Grid item className={classes.listContainer}>
              <Typography className={classes.likes}>Likes</Typography>
              {likedMe.length === 0 && (
                <span
                  className={classes.notFound}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  No Likes Found
                </span>
              )}
              <List>
                {likedMe.map((item, index) => (
                  <ListItem
                    key={item.liked_by}
                    dense
                    classes={{ root: classes.listItemRoot }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.listItemAvatar}
                        src={item.liked_by_profile_image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      primary={item.liked_by_name}
                    />
                    <ListItemSecondaryAction>
                      <img
                        className={classes.thumbIcon}
                        src={image.thumb}
                        alt=""
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Typography
                component={Link}
                to="/home/mylikes"
                className={classes.seeMore}
              >
                see more
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
