import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Menu,
  useTheme,
  useMediaQuery,
  Dialog,
  Button,
} from "@material-ui/core";
import image from "../../../assets/index";
import { FavoriteBorder, Close } from "@material-ui/icons";
import { getUserById, otherUserVideos, deleteVideo } from "../../../http";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toggleMute, setMute } from "../../../store/videoSound";

export const UserProfile = (props) => {
  const userState = useSelector((state) => state.auth.user.data);
  const id = userState._id;
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const videosRef = useRef([]);
  videosRef.current = [];
  const [anchorEl, setAnchorEl] = useState(null);
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
  const mutedState = useSelector((state) => state.video.muted);
  const [muted, setMuted] = useState(mutedState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const muteRef = useRef();
  const [deleteId, setDeleteId] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    const feets = Math.floor(realFeets);
    const inches = Math.round((realFeets - feets) * 12);
    return `${feets}'${inches}"`;
  };
  const handleToggleMute = () => {
    setMuted(!muted);
    dispatch(toggleMute());
  };
  const handleDeleteVideo = async () => {
    try {
      await deleteVideo(deleteId);
      const videosArray = videos.filter((video) => video._id !== deleteId);
      setVideos(videosArray);
      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDialogOpen = (id) => {
    setDeleteId(id);
    muteRef.current = mutedState;
    dispatch(setMute(true));
    setMuted(true);
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDeleteId(null);
    dispatch(setMute(muteRef.current));
    setIsDialogOpen(false);
    setMuted(muteRef.current);
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
        .all([getUserById(id), otherUserVideos(id)])
        .then(
          axios.spread((res1, res2) => {
            setUser(res1.data.data);
            setVideos(res2.data.data);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (videosRef.current.length > 0 && isDialogOpen === false) {
      videosRef.current[0].play();
    }
  });
  useEffect(() => {
    if (isDialogOpen) {
      // eslint-disable-next-line
      videosRef.current.map((video) => {
        video.pause();
      });
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
                {`@${user.username}`}
              </Typography>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography className={classes.userName}>
                  {user.first_name} {user.last_name} &nbsp;&nbsp;&nbsp;{" "}
                  {user.date_of_birth.age}
                </Typography>
                <Typography className={classes.height}>
                  {toFeet(user.height.height)}
                </Typography>
              </div>
              <Typography className={classes.userCity}>
                Lives in New York
              </Typography>
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
              {user.vices.smoke.smoke}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>
              {user.religion.religion}
            </Typography>
            <Typography className={classes.tags}>
              {user.education.degree}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center">
            <Typography className={classes.seeMore} onClick={handleClick}>
              See more
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.rootMenu}
            >
              <Grid className={classes.menu}>
                <Grid item className={classes.menuItem}>
                  <Grid item container>
                    <h1 className={classes.menuTitle}>Basics</h1>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>udergraduate</span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>udergraduate</span>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>New York</span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>New York</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Grid item container>
                    <h1 className={classes.menuTitle}>Life Style</h1>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>Do smoke</span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>Sometimes</span>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>
                        Prefer not to say
                      </span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>
                        Prefer not to say
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.menuItem}>
                  <Grid item container>
                    <h1 className={classes.menuTitle}>Bio</h1>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>172cm</span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>other</span>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className={classes.row}
                    container
                    justifyContent="space-between"
                  >
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>random</span>
                    </Grid>
                    <Grid item container alignItems="center" sm>
                      <img
                        src={image.gem}
                        className={classes.menuIcon}
                        alt=""
                      />
                      <span className={classes.menuItemText}>random</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container justifyContent="center">
                  <span className={classes.seeLess} onClick={handleClose}>
                    see less
                  </span>
                </Grid>
              </Grid>
            </Menu>
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
            <Grid
              item
              container
              className={classes.post}
              direction="column"
              alignItems="center"
              key={index}
            >
              <Grid item>
                <Typography className={classes.postTitle}>
                  {video.video_title}
                </Typography>
                <div className={classes.postContainer}>
                  <video
                    ref={addToRef}
                    playsInline
                    loop
                    muted={muted}
                    className={classes.video}
                    cover={video.cover}
                    src={`${process.env.REACT_APP_API_URL}/${video.video_url}`}
                  ></video>
                  <IconButton
                    onClick={() => handleDialogOpen(video._id)}
                    className={classes.closeButton}
                  >
                    <Close className={classes.closeIcon} />
                  </IconButton>
                  <div className={classes.iconContainer}>
                    <Grid
                      container
                      className={classes.icons}
                      justifyContent="space-between"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <IconButton onClick={handleToggleMute}>
                          <img
                            src={muted ? image.mute : image.unMute}
                            className={classes.muteIcon}
                            alt=""
                          />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <span className={classes.likeCount}>
                            {video.likes}
                          </span>
                          <FavoriteBorder className={classes.likeIcon} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Grid>
          ))}
          <Dialog
            className={classes.dialog}
            open={isDialogOpen}
            onClose={() => handleDialogClose}
          >
            <Grid container className={classes.dialogContainer}>
              <Grid item container direction="column" alignItems="center">
                <Typography className={classes.dialogTitle}>
                  Are you sure?
                </Typography>
                <Typography className={classes.dialogSubtitle}>
                  You want to delete this video
                </Typography>
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.dialogButtons}
                  style={{ marginBottom: "1rem" }}
                  onClick={handleDeleteVideo}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.dialogButtons}
                  onClick={handleDialogClose}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </Dialog>
        </Grid>
      </Grid>
      <Grid item container className={classes.right}></Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "0rem 3rem",
  },
  left: {
    width: "30.62%",
    boxSizing: "border-box",
    paddingTop: "4rem",
    paddingInline: "2.5rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
    },
  },
  middle: {
    width: "39.23%",
    backgroundColor: "#fbfbfb",
    boxSizing: "border-box",
    border: "1px solid rgba(112, 112, 112, 0.17)",
  },
  right: {
    width: "30.15%",
    boxSizing: "border-box",
    padding: "3rem",
  },
  userName: {
    fontSize: "29px",
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  userCity: {
    fontSize: "20px",
    marginBottom: 0,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  height: {
    fontSize: "22px",
    marginBottom: "0",
    color: "#3E3E3E",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
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
  },
  seeMore: {
    color: "#000",
    textDecoration: "underline",
    fontSize: "22px",
    marginTop: "0.5rem",
    cursor: "pointer",
    display: "inline-block",
    margin: "0 auto",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  postTitle: {
    color: "#000",
    margin: "0",
    fontSize: "20px",
    textAlign: "left",
    width: "100%",
    marginBottom: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  postContainer: {
    width: "338px",
    height: "596px",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
    "& video": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    [theme.breakpoints.down("lg")]: {
      width: "220px",
      height: "380px",
    },
  },
  iconContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  icons: {
    height: "100%",
    padding: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0.25rem",
    },
  },
  likeIcon: {
    color: "#fbfbfb",
    fontSize: "2.8rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
  },
  muteIcon: {
    maxWidth: "40px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "28px",
    },
  },
  post: {
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
    },
  },

  likeCount: {
    fontSize: "28px",
    color: "#fff",
    marginRight: "1rem",
    [theme.breakpoints.down(1400)]: {
      fontSize: "18px",
      marginRight: "0.5rem",
    },
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "35px",
    height: "35px",
    [theme.breakpoints.down("lg")]: {
      width: "30px",
      height: "30px",
      top: "10px",
      right: "10px",
    },
  },
  closeIcon: {
    color: "#fff",
    fontSize: "2.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2rem",
    },
  },
  rootMenu: {
    "& .MuiMenu-paper": {
      borderRadius: "25px",
      marginLeft: "-2rem",
    },
  },
  menu: {
    width: "420px",
    padding: "1rem 2rem",
    [theme.breakpoints.down("lg")]: {
      width: "265px",
      padding: "0.5rem 1rem",
    },
  },
  menuItem: {},
  menuTitle: {
    fontSize: "25px",
    marginBottom: "2rem",
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginBottom: "1rem",
      marginTop: "0.5rem",
    },
  },
  menuIcon: {
    width: "1.7rem",
    [theme.breakpoints.down("lg")]: {
      width: "1rem",
    },
  },
  menuItemText: {
    fontSize: "16px",
    marginLeft: "0.8rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
      marginLeft: "0.35rem",
    },
  },
  row: {
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "0.5rem",
    },
  },
  seeLess: {
    fontSize: "22px",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "0.75rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "0.35rem",
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
  dialogButtons: {
    margin: "0",
    width: "265px",
    height: "63px",
    fontSize: "22px",
    fontWeight: "500",
    textTransform: "none",
    borderRadius: "38px",
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      border: `2px solid ${theme.palette.primary.dark}`,
    },
    [theme.breakpoints.down("lg")]: {
      width: "220px",
      height: "50px",
      fontSize: "16px",
    },
  },
  dialogSubtitle: {
    margin: "0",
    color: "#000000",
    fontSize: "22px",
    marginTop: "18px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "8px",
    },
  },
  dialogTitle: {
    margin: "0",
    color: "#000000",
    fontSize: "32px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "25px",
    },
  },
  dialogContainer: {
    height: "500px",
    width: "460px",
    paddingBlock: "100px 60px",
    [theme.breakpoints.down("lg")]: {
      height: "340px",
      width: "350px",
      paddingBlock: "60px 40px",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
      borderRadius: "10px",
    },
  },
}));
