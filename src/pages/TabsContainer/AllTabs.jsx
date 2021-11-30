import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useStyles } from "./tabStyles";
import { TopBar } from "../../components/TopBar/TopBar";
import { Explore } from "../Tabs/Explore/Explore";
import { Online } from "../Tabs/Online/Online";
import { MyLikes } from "../Tabs/MyLikes/MyLikes";
import { Home } from "../Tabs/Home/Home";
import { Inbox } from "../Tabs/Inbox/Inbox";
import image from "../../assets/index";
import { UserProfile } from "../Tabs/UserProfile/UserProfile";
import { MeetMe } from "../Tabs/MeetMe/MeetMe";
import { Route, NavLink } from "react-router-dom";
import { ProfileMatched } from "../Tabs/ProfileMatched/ProfileMatched";
import {
  HomeRounded,
  PublicRounded,
  FavoriteRounded,
  QuestionAnswerRounded,
  ThumbUpAltRounded,
  PersonRounded,
  SubscriptionsRounded,
} from "@material-ui/icons";
import {
  videos as getVideos,
  allVideos as getAllVideos,
} from "../../http/index";

export const AllTabs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [videos, setVideos] = useState([]);
  const allVideos = useRef([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  allVideos.current = [];

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const addToRefs = (e) => {
    if (e && !allVideos.current.includes(e) && !null) allVideos.current.push(e);
  };
  const handleScroll = (e) => {
    const boundry = {
      top: {
        upper: lgScreen ? -147 : -370,
        lower: lgScreen ? 382 : 530,
      },
      bottom: {
        upper: lgScreen ? 385 : 540,
        lower: lgScreen ? 912 : 1441,
      },
    };
    allVideos.current.map((item) => {
      const video = item.lastChild.lastChild.lastChild.firstChild;
      const top = item.getBoundingClientRect().top;
      const bottom = item.getBoundingClientRect().bottom;
      if (
        top > boundry.top.upper &&
        top < boundry.top.lower &&
        bottom > boundry.bottom.upper &&
        bottom < boundry.bottom.lower
      ) {
        video.play();
      } else {
        video.pause();
      }
    });
  };
  useEffect(() => {
    if (allVideos.current.length > 0) {
      allVideos.current[0].lastChild.lastChild.lastChild.firstChild.play();
    }
  });
  useEffect(() => {
    (async function () {
      const { data } = await getAllVideos(pageNumber, 3);
      setVideos([...videos, ...data.data]);
    })();
  }, [pageNumber]);
  const tabItems = [
    {
      label: "Home",
      icon: <HomeRounded className={classes.icons} />,
      to: "/home",
    },
    {
      label: "Explore",
      icon: <PublicRounded className={classes.icons} />,
      to: "/home/explore",
    },
    {
      label: "Meet Me",
      icon: <FavoriteRounded className={classes.icons} />,
      to: "/home/meetme",
    },
    {
      label: "Inbox",
      icon: <QuestionAnswerRounded className={classes.icons} />,
      to: "/home/inbox",
    },
    {
      label: "My Likes",
      icon: <ThumbUpAltRounded className={classes.icons} />,
      to: "/home/mylikes",
    },
    {
      label: "Online",
      icon: <PersonRounded className={classes.icons} />,
      to: "/home/online",
    },
    {
      label: "Live!",
      to: "/live",
      img: image.liveIcon,
    },
  ];

  return (
    <Grid container direction="row">
      <Grid item style={{ width: "17%" }}>
        <Grid
          container
          alignItems="center"
          className={classes.tabsContainer}
          direction="column"
        >
          <Grid item>
            <img src={image.logo} className={classes.tabsLogo} alt="" />
          </Grid>
          <Grid item className={classes.tabs}>
            <List className={classes.root}>
              {tabItems.map((item, index) => (
                <ListItem
                  className={classes.listItem}
                  alignItems="center"
                  key={index}
                  dense
                  disableGutters
                  component={NavLink}
                  to={item.to}
                  activeClassName={classes.listItemActive}
                  exact
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    {item.icon ? (
                      item.icon
                    ) : (
                      <img
                        src={item.img}
                        className={classes.newIcon}
                        alt="icon"
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary={item.label}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: "83%" }}>
        <Grid container direction="column" className={classes.mainContainer}>
          <TopBar />
          <Grid
            item
            container
            className={classes.hero}
            alignItems="center"
            direction="column"
            onScroll={handleScroll}
          >
            <Route exact path="/home" render={() => <Home />} />
            <Route
              exact
              path="/home/explore"
              render={() => (
                <Explore
                  addToRefs={addToRefs}
                  lastElementRef={lastElementRef}
                  videos={videos}
                />
              )}
            />
            <Route exact path="/home/meetme" render={() => <MeetMe />} />
            <Route exact path="/home/inbox" render={() => <Inbox />} />
            <Route exact path="/home/mylikes" render={() => <MyLikes />} />
            <Route exact path="/home/online" render={() => <Online />} />
            <Route
              exact
              path="/home/premium"
              render={() => <h1>Not found</h1>}
            />
            <Route exact path="/home/profile" render={() => <UserProfile />} />
            <Route exact path="/home/match" render={() => <ProfileMatched />} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
