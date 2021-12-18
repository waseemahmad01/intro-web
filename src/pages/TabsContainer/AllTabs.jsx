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
import { UnMatch } from "../Tabs/UnMatch/UnMatch";
// import { getStories } from "../../http/index";
import {
  HomeRounded,
  PublicRounded,
  FavoriteRounded,
  QuestionAnswerRounded,
  ThumbUpAltRounded,
  PersonRounded,
} from "@material-ui/icons";
import { allVideos as getAllVideos } from "../../http/index";
// import { ethnicityList } from "../../data";
// import { setStories } from "../../store/stories";
export const AllTabs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [videos, setVideos] = useState([]);
  const allVideos = useRef([]);
  const pageNumber = useRef(1);
  const [changing, setChanging] = useState(1);
  const totalPages = useRef(0);
  allVideos.current = [];
  // filters
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([18, 50]);
  const [intent, setIntent] = useState([]);
  const [religion, setReligion] = useState([]);
  const [ethnicity, setEthnicity] = useState([]);
  const [bodyType, setBodyType] = useState([]);
  const [education, setEducation] = useState([]);
  const [kids, setKids] = useState([]);
  const [drink, setDrink] = useState([]);
  const [smoke, setSmoke] = useState([]);
  const [weed, setWeed] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [country, setCountry] = useState([]);
  const [height, setHeight] = useState([]);
  const [filterUpdated, setFilterUpdated] = useState(0);
  const [isAnyOpen, setIsAnyOpen] = useState(false);
  // filters end
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        pageNumber.current <= totalPages.current
      ) {
        pageNumber.current = pageNumber.current + 1;
        setChanging((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

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
    // eslint-disable-next-line
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
        if (video.readyState >= 2) {
          video.play();
        }
        // console.log(video.readyState);
      } else {
        video.pause();
      }
    });
  };
  useEffect(() => {
    if (isAnyOpen) {
      allVideos.current.map((item) =>
        item.lastChild.lastChild.lastChild.firstChild.pause()
      );
    }
  }, [isAnyOpen]);
  useEffect(() => {
    if (allVideos.current.length > 0 && isAnyOpen === false) {
      const video =
        allVideos.current[0].lastChild.lastChild.lastChild.firstChild;
      video.play();
    }
  });
  const url = window.location.pathname;
  useEffect(() => {
    if (url === "/home/explore") {
      if (filterUpdated > 0) {
        pageNumber.current = 1;
        setVideos([]);
        setFilterUpdated(0);
      }
      (async function () {
        const query = `${
          gender.length > 0 ? `gender=${JSON.stringify(gender)}` : null
        }&${age.length > 0 ? `age=${JSON.stringify(age)}` : null}&${
          intent.length > 0
            ? `interested_audience=${JSON.stringify(intent)}`
            : null
        }&${
          religion.length > 0 ? `religion=${JSON.stringify(religion)}` : null
        }&${
          ethnicity.length > 0 ? `ethnicity=${JSON.stringify(ethnicity)}` : null
        }&${bodyType.length > 0 ? `type=${JSON.stringify(bodyType)}` : null}&${
          education.length > 0 ? `eduction=${JSON.stringify(education)}` : null
        }&${kids.length > 0 ? `children=${JSON.stringify(kids)}` : null}&${
          drink.length > 0 ? `drink=${JSON.stringify(drink)}` : null
        }&${smoke.length > 0 ? `smoke=${JSON.stringify(smoke)}` : null}&${
          weed.length > 0 ? `weed=${JSON.stringify(weed)}` : null
        }&${drugs.length > 0 ? `drugs=${JSON.stringify(drugs)}` : null}&${
          country.length > 0 ? `country=${JSON.stringify(country)}` : null
        }&${height.length > 0 ? `height=${JSON.stringify(height[0])}` : null}`;
        const { data } = await getAllVideos(pageNumber.current, 10, query);
        setVideos([...videos, ...data.data]);
        totalPages.current = data.totalPages;
      })();
    } else {
      setVideos([]);
      pageNumber.current = 1;
    }
    // eslint-disable-next-line
  }, [changing, url, filterUpdated]);
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
                  setGender={setGender}
                  setIntent={setIntent}
                  setReligion={setReligion}
                  setEthnicity={setEthnicity}
                  setBodyType={setBodyType}
                  setEducation={setEducation}
                  setKids={setKids}
                  setDrink={setDrink}
                  setSmoke={setSmoke}
                  setWeed={setWeed}
                  setDrugs={setDrugs}
                  setCountry={setCountry}
                  setHeight={setHeight}
                  setAge={setAge}
                  gender={gender}
                  intent={intent}
                  ethnicity={ethnicity}
                  bodyType={bodyType}
                  religion={religion}
                  kids={kids}
                  education={education}
                  drink={drink}
                  smoke={smoke}
                  weed={weed}
                  country={country}
                  drugs={drugs}
                  height={height}
                  age={age}
                  setFilterUpdated={setFilterUpdated}
                  filterUpdated={filterUpdated}
                  setIsAnyOpen={setIsAnyOpen}
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
            <Route
              exact
              path="/home/profile"
              render={(props) => <UserProfile {...props} />}
            />
            <Route
              exact
              path="/home/match/:id"
              render={(props) => <ProfileMatched {...props} />}
            />
            <Route
              exact
              path="/home/unmatch/:id"
              render={(props) => <UnMatch {...props} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
