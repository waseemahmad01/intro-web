import React from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  IconButton,
  InputBase,
} from "@material-ui/core";
import image from "../../../assets/index";
import { Favorite } from "@material-ui/icons";

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
    padding: "2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60%",
      borderRadius: "0px 34px 0px 0px",
    },
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
    bottom: 15,
    borderRadius: "16px",
    display: "flex",
    alignItems: "flex-end",
    [theme.breakpoints.down("lg")]: {
      bottom: 5,
    },
  },
  icons: {
    height: "80px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "0.25rem",
      padding: "0",
      height: "50px",
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
  superlike: {
    [theme.breakpoints.down("lg")]: {
      maxHeigth: "18px",
      maxWidth: "18px",
    },
  },
  post: {
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
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
}));
export const UnMatch = () => {
  const classes = useStyles();
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
              <Avatar className={classes.avatar} src={image.img} />
              <Typography className={classes.anchor}>@username</Typography>
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
                  Kathrine Young
                </Typography>
                <Typography className={classes.userAge}>26</Typography>
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
            <Typography className={classes.tags}>5'6"</Typography>
            <Typography className={classes.tags}>Christian</Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>Undergrad</Typography>
            <Typography className={classes.tags}>NYU</Typography>
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
                      <img
                        src={image.superlike}
                        className={classes.superlike}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <img
                        src={image.heartIcon}
                        className={classes.muteIcon}
                        alt=""
                      />
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
                      <img
                        src={image.superlike}
                        className={classes.superlike}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <Favorite className={classes.likeIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" className={classes.right}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          className={classes.messageBoxContainer}
        >
          <Typography className={classes.messageBoxTitle}>
            Quick Message
          </Typography>
          <Grid item container>
            <Typography className={classes.message}>
              To send a personalized message, subscribe to our premium services
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            className={classes.input}
          >
            <Grid item>
              <InputBase
                className={classes.inputBase}
                placeholder="Select a Message"
                inputProps={{ className: classes.inputEl }}
              />
            </Grid>
            <Grid item>
              <img className={classes.sendIcon} src={image.navigation} alt="" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
