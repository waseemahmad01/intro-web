import React, { useEffect } from "react";
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
  checkMatch,
  otherUserVideos,
} from "../../../http";
import {
  setMatches,
  setIvisited,
  setMyLikes,
  setVisitedMe,
} from "../../../store/matches";
import { setOnlineUsers } from "../../../store/user";
import { setUserVideos } from "../../../store/userVideos";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const userState = useSelector((state) => state.auth.user.data);
  const matched = useSelector((state) => state.matches.matches);
  const iVisited = useSelector((state) => state.matches.iVisited);
  const visitedMe = useSelector((state) => state.matches.visitedMe);
  const likedMe = useSelector((state) => state.matches.myLikes);
  const onlineUsers = useSelector((state) => state.auth.user.onlineUsers);
  const userReels = useSelector((state) => state.userVideos.data);
  const dispatch = useDispatch();

  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    const feets = Math.floor(realFeets);
    const inches = Math.round((realFeets - feets) * 12);
    return `${feets}'${inches}"`;
  };
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleImageClick = async (id) => {
    const { data } = await checkMatch(id);
    if (data.data) {
      history.push(`/home/match/${id}`);
    } else {
      history.push(`/home/unmatch/${id}`);
    }
  };
  useEffect(() => {
    (async () => {
      await axios
        .all([
          getMatchedUsers(),
          iVisitedProfiles(),
          visitedMeApi(),
          likedMeApi(),
          getLiveUsers(),
          otherUserVideos(userState._id),
        ])
        .then(
          axios.spread(function (res1, res2, res3, res4, res5, res6) {
            dispatch(setMatches(res1.data.data));
            dispatch(setIvisited(res2.data.data));
            dispatch(setVisitedMe(res3.data.data));
            // dispatch(setMyLikes(res4.data.data));
            dispatch(setOnlineUsers(res5.data.data));
            dispatch(setUserVideos(res6.data.data));
          })
        )
        .catch((err) => console.log(err));
    })();
    // eslint-disable-next-line
  }, [userState]);
  return (
    <Grid container direction="column" className={classes.container}>
      {onlineUsers.length !== 0 ? (
        <>
          <Grid item>
            <Typography className={classes.title}>Online Users</Typography>
          </Grid>
          <Grid
            item
            style={{ width: "100%" }}
            className={classes.sliderContainer}
          >
            <Slider users={onlineUsers} />
          </Grid>
        </>
      ) : (
        <></>
      )}
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
                    component={Link}
                    to="/home/profile"
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
            <Grid
              item
              container
              direction="column"
              className={classes.reelContainer}
            >
              <Typography className={classes.reelTitle}>Reels</Typography>
              <List className={classes.reelsList}>
                {userReels.map((reel, index) => (
                  <ListItem
                    key={index}
                    className={classes.reelItem}
                    dense
                    disableGutters
                    alignItems="center"
                  >
                    <ListItemAvatar className={classes.reelAvatarContainer}>
                      <Avatar
                        component={Link}
                        to="/home/profile"
                        src={`${process.env.REACT_APP_API_URL}/${reel.cover}`}
                        className={classes.reelAvatar}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      classes={{ root: classes.reelItemText }}
                      primary={reel.video_title}
                      secondary="23rd june"
                    />
                  </ListItem>
                ))}
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
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src={image.find}
                        className={classes.notFoundImage}
                        alt=""
                      />
                      <span className={classes.notFound}>No Matches Found</span>
                    </Grid>
                  )}
                  {matched.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      // key={item.matched_ids.to}
                      component={Link}
                      to={`/home/match/${item.matched_ids.to}`}
                      key={index}
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
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src={image.find}
                        className={classes.notFoundImage}
                        alt=""
                      />
                      <span className={classes.notFound}>
                        No one visited your profile
                      </span>
                    </Grid>
                  )}
                  {visitedMe.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      className={classes.cardAvatar}
                      onClick={() => handleImageClick(item.visited_by)}
                      key={index}
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
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src={image.find}
                        className={classes.notFoundImage}
                        alt=""
                      />
                      <span className={classes.notFound}>
                        You haven't visited anyone's profile yet
                      </span>
                    </Grid>
                  )}
                  {iVisited.map((item, index) => (
                    <Avatar
                      style={{ marginLeft: index === 0 ? "auto" : "" }}
                      className={classes.cardAvatar}
                      // key={item.visited_to._id}
                      onClick={() => handleImageClick(item.visited_to)}
                      key={index}
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
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  className={classes.notFoundContainer}
                >
                  <img
                    src={image.find}
                    className={classes.likeNotFoundImage}
                    alt=""
                  />
                  <span className={classes.notFound}>
                    No one liked your videos yet
                  </span>
                </Grid>
              )}
              <List className={classes.likeList}>
                {likedMe.map((item, index) => (
                  <ListItem
                    onClick={() => handleImageClick(item.liked_by)}
                    key={index}
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
