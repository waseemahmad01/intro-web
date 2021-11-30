import React from "react";
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
import { useSelector } from "react-redux";

export const Home = () => {
  const classes = useStyles();
  const userState = useSelector((state) => state.auth.user.data);

  const likes = [
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
    {
      name: "Jen Kins",
      avatar: image.img,
    },
  ];
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Online Users</Typography>
      </Grid>
      <Grid item style={{ width: "100%" }} className={classes.sliderContainer}>
        <Slider />
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
                        {userState.height.height}
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
                <Avatar className={classes.cardAvatar} src={image.img} />
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
              <List>
                {likes.map((item, index) => (
                  <ListItem
                    key={index}
                    dense
                    classes={{ root: classes.listItemRoot }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        className={classes.listItemAvatar}
                        src={item.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className={classes.listItemText}
                      primary={item.name}
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
