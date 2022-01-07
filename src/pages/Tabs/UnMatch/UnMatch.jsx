import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import image from "../../../assets/index";
import {
  getUserById,
  visitedUser,
  otherUserVideos,
  likeVideo,
} from "../../../http";
import axios from "axios";
import { Video } from "../../../components/video/Video";
const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "0rem 3rem",
  },
  left: {
    width: "29.62%",
    boxSizing: "border-box",
    paddingTop: "4rem",
    paddingInline: "2.5rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
      width: "40%",
    },
  },
  middle: {
    width: "39.23%",
    backgroundColor: "#fbfbfb",
    boxSizing: "border-box",
    border: "1px solid rgba(112, 112, 112, 0.17)",
  },
  right: {
    width: "31.15%",
    boxSizing: "border-box",
    padding: "3rem",
    paddingTop: "4rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
    },
  },
  userName: {
    fontSize: "29px",
    fontWeight: 700,
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  userCity: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: 0,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },
  userAge: {
    fontSize: "29px",
    marginBottom: "0",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },
  avatar: {
    height: "202px",
    width: "202px",
    marginInline: "auto",
    [theme.breakpoints.down("lg")]: {
      height: "150px",
      width: "150px",
    },
    [theme.breakpoints.down("md")]: {
      height: "120px",
      width: "120px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      width: "100px",
    },
  },
  anchor: {
    fontSize: "20px",
    color: theme.palette.primary.main,
    margin: 0,
    fontWeight: 700,
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0.5rem",
      fontSize: "15px",
    },
  },
  userInfo: {
    width: "100%",
    padding: "0 2.5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 1.5rem",
    },
  },
  tagsConainer: {
    backgroundColor: "#fbfbfb",
    width: "100%",
    boxShadow: theme.shadows[3],
    borderRadius: "30px",
    marginTop: "1.5rem",
    boxSizing: "border-box",
    paddingInline: "1rem",
    paddingTop: "3rem",
    height: "226px",
    [theme.breakpoints.down("lg")]: {
      paddingTop: "1.5rem",
      height: "140px",
      marginTop: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      height: "140px",
      marginTop: "0.75rem",
    },
  },
  tags: {
    backgroundColor: theme.palette.primary.main,
    width: "155px",
    height: "52px",
    lineHeight: "52px",
    borderRadius: "26px",
    fontSize: "22px",
    fontWeight: "500",
    margin: 0,
    marginBottom: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      width: "100px",
      height: "30px",
      lineHeight: "30px",
      fontSize: "12px",
      borderRadius: "22px",
    },
    [theme.breakpoints.down("md")]: {
      width: "90px",
      borderRadius: "18px",
    },
  },
  seeMore: {
    color: "#000",
    margin: "0",
    textDecoration: "underline",
    fontSize: "22px",
    marginTop: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },

  messageBoxContainer: {
    width: "100%",
    backgroundColor: "#fbfbfb",
    height: "570px",
    borderRadius: "26px 26px 33px 33px",
    padding: "1rem",
    boxSizing: "border-box",
    boxShadow: theme.shadows[3],
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      height: "320px",
    },
    [theme.breakpoints.down("md")]: {
      height: "280px",
    },
  },
  messageBoxTitle: {
    color: "#000",
    margin: "1rem 0",
    fontSize: "27px",
    [theme.breakpoints.down("lg")]: {
      margin: "0.5rem",
      fontSize: "18px",
    },
  },
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "33px",
    height: "71px",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: `1px 1px 5px ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
    [theme.breakpoints.down("lg")]: {
      height: "45px",
    },
  },
  inputBase: {
    margin: "auto 0",
    marginLeft: "41px",
    fontSize: "21px",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      marginLeft: "20px",
    },
  },
  inputEl: {
    "&::placeholder": {
      color: "#000",
      opacity: 1,
    },
  },
  sendIcon: {
    marginRight: "20px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "25px",
      marginTop: "7px",
    },
  },
  message: {
    fontSize: "16px",
    backgroundColor: "rgba(254, 133, 140, 0.13)",
    color: "#000",
    padding: "1rem",
    paddingRight: "3rem",
    paddingBottom: "5rem",
    borderRadius: "22px 22px 22px 0px",
    marginRight: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "9px",
      marginRight: "1.5rem",
      paddingRight: "2rem",
      paddingBottom: "3rem",
    },
  },
  scrollDiv: {
    height: "880px",
    padding: "2rem",
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
      height: "580px",
    },
  },
}));
export const UnMatch = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [user, setUser] = useState({
    phonenumber: "",
    socialMedia_id: "",
    step: "/dob",
    date_of_birth: { dob: "", age: 0 },
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    identify: { gender: "", visible: false },
    date_preference: { interested_gender: "", interested_audience: "" },
    height: { height: 0.0, visible: false },
    body_type: { type: "", visible: false },
    ethnicity: {
      country_list: [],
      c_visible: false,
      race: "",
      r_visible: false,
    },
    location: { lat: "", lon: "", geoHash: "", visible: false },
    home_town: {
      live_with: "",
      home_town: "",
      live_with_visible: false,
      visible: false,
    },
    education: {
      school: "",
      s_visible: false,
      degree: "",
      d_visible: false,
    },
    profession: {
      company: { company: "", c_visible: false },
      job_title: { job_title: "", j_visible: false },
      occupation: { occupation: "", o_visible: false },
    },
    religion: { religion: "", visible: false },
    vices: {
      drink: { drink: "", d_visible: false },
      smoke: { smoke: "", s_visible: false },
      weed: { weed: "", w_visible: false },
      drugs: { drugs: "", dr_visible: false },
    },
    profile_image: "",
    children: { have_children: "", want_children: "", visible: false },
    prompt: [{ question: "", url: "" }],
  });
  const [videos, setVideos] = useState([]);

  const videosRef = useRef([]);
  videosRef.current = [];
  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    let feets = Math.floor(realFeets);
    let inches = Math.round((realFeets - feets) * 12);
    if (inches === 12) {
      feets = feets + 1;
      inches = 0;
    }
    return `${feets}'${inches}"`;
  };
  // eslint-disable-next-line
  const handleLike = async (id) => {
    // eslint-disable-next-line
    const { data } = await likeVideo(id);
  };
  const handleScroll = () => {
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
    videosRef.current.map((item) => {
      const top = item.getBoundingClientRect().top;
      const bottom = item.getBoundingClientRect().bottom;
      if (
        top > boundry.top.upper &&
        top < boundry.top.lower &&
        bottom > boundry.bottom.upper &&
        bottom < boundry.bottom.lower
      ) {
        if (item.readyState >= 2) {
          item.play();
        }
        // console.log(video.readyState);
      } else {
        item.pause();
      }
    });
  };
  const addToRef = (e) => {
    if (e && !videosRef.current.includes(e) && !null) videosRef.current.push(e);
  };
  useEffect(() => {
    (async function () {
      await axios
        .all([getUserById(id), visitedUser(id), otherUserVideos(id)])
        .then(
          axios.spread((res1, res2, res3) => {
            setUser(res1.data.data);
            setVideos(res3.data.data);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (videosRef.current.length > 0) {
      videosRef.current[0].play();
    }
  });
  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        className={classes.left}
      >
        <Grid item className={classes.userInfo}>
          <Grid container direction="column" spacing={2}>
            <Grid item className={classes.avatarContainer}>
              <Avatar className={classes.avatar} src={user.profile_image} />
              <Typography className={classes.anchor}>
                @{user.username}
              </Typography>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography className={classes.userName}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography className={classes.userAge}>
                  {user.date_of_birth.age}
                </Typography>
              </div>
              <Typography className={classes.userCity}>New York</Typography>
              <Typography className={classes.subtitle}>2 mi</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.tagsConainer}
        >
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>
              {toFeet(user.height.height)}
            </Typography>
            <Typography className={classes.tags}>
              {user.religion.religion}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>
              {user.vices.smoke.smoke}
            </Typography>
            <Typography className={classes.tags}>
              {user.education.degree}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.seeMore}>See more</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        className={classes.middle}
      >
        <Grid
          item
          container
          onScroll={handleScroll}
          className={classes.scrollDiv}
        >
          {videos.map((video, index) => (
            <Video
              key={index}
              video_url={video.video_url}
              like={video.like}
              video_title={video.video_title}
              ref={addToRef}
              video_id={video._id}
              username={video.user_name}
              user_id={video.user_id}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item container direction="column" className={classes.right}></Grid>
    </Grid>
  );
};
