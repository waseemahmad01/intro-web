import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Menu,
} from "@material-ui/core";
import image from "../../../assets/index";
import { FavoriteBorder, Close } from "@material-ui/icons";
import { getUserById, visitedUser } from "../../../http";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "0rem 3rem",
  },
  left: {
    width: "28.62%",
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
    padding: "2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
    },
  },
  right: {
    width: "32.15%",
    boxSizing: "border-box",
    padding: "3rem",
  },
  userName: {
    fontSize: "29px",
    fontWeight: 700,
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
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
    "& img": {
      width: "100%",
      height: "100%",
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
    top: 0,
    bottom: 0,
    borderRadius: "16px",
  },
  icons: {
    height: "100%",
    padding: "1rem",
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
    top: "10px",
    right: "10px",
    width: "23px",
    height: "23px",
  },
  closeIcon: {
    color: "#fff",
    fontSize: "2rem",
  },
  rootMenu: {
    "& .MuiMenu-paper": {
      borderRadius: "25px",
      marginLeft: "-2rem",
    },
  },
  menu: {
    width: "395px",
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
    fontSize: "17px",
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
}));

export const UserProfile = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
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
  useEffect(() => {
    (async function () {
      await axios
        .all([getUserById(id), visitedUser(id)])
        .then(
          axios.spread((res1, res2) => {
            setUser(res1.data.data);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
    // eslint-disable-next-line
  }, []);
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
                {user.username}
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
              <Grid contianer className={classes.menu}>
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
          className={classes.post}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.postTitle}>
              Worst idea ever has?
            </Typography>
            <div className={classes.postContainer}>
              <img src={image.post} alt="" />
              <IconButton className={classes.closeButton}>
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
                    <IconButton>
                      <img
                        src={image.mute}
                        className={classes.muteIcon}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <span className={classes.likeCount}>60</span>
                      <FavoriteBorder className={classes.likeIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          container
          className={classes.post}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.postTitle}>
              Worst idea ever has?
            </Typography>
            <div className={classes.postContainer}>
              <img src={image.post} alt="" />
              <div className={classes.iconContainer}>
                <IconButton className={classes.closeButton}>
                  <Close className={classes.closeIcon} />
                </IconButton>
                <Grid
                  container
                  className={classes.icons}
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <IconButton>
                      <img
                        src={image.mute}
                        className={classes.muteIcon}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <span className={classes.likeCount}>60</span>
                      <FavoriteBorder className={classes.likeIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.right}></Grid>
    </Grid>
  );
};
