import React, { useState, useRef } from "react";
import {
  makeStyles,
  Grid,
  Dialog,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import { SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setMute } from "../../store/videoSound";

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    height: "685px",
    width: "365px",
    padding: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      height: "500px",
      width: "270px",
      padding: "0.25rem",
    },
  },
  dialog: {
    "& .MuiDialog-container": {
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    "& .MuiDialog-paper": {
      borderRadius: "35px",
      backgroundImage: "linear-gradient( #654AAB,#E77783)",
      [theme.breakpoints.down("lg")]: {
        borderRadius: "25px",
      },
    },
  },
  content: {
    width: "100%",
    height: "100%",
    background: "#fff",
    borderRadius: "35px",
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      borderRadius: "25px",
    },
  },
  story: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profile: {
    position: "absolute",
    top: "24px",
    left: "20px",
    [theme.breakpoints.down("lg")]: {
      top: "0.5rem",
      left: "0.5rem",
    },
  },
  backButton: {
    height: "20px",
    width: "20px",
    marginBottom: "1.5rem",

    [theme.breakpoints.down("lg")]: {
      height: "25px",
      width: "25px",
      marginBottom: "1.4rem",
    },
  },
  backIcon: {
    color: "#fff",
    fontSize: "2.5rem",
    fontWeight: "bold",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.25rem",
    },
  },
  profilePic: {
    height: "60px",
    width: "60px",
    border: `5px solid ${theme.palette.common.crimson}`,
    boxSizing: "content-box",
    [theme.breakpoints.down("lg")]: {
      height: "60px",
      width: "60px",
    },
  },
  username: {
    color: "#fff",
    fontSize: "14px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
    },
  },
  arrowContainer: {
    position: "absolute",
    top: "50%",
    width: "100%",
    marginTop: "-2%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 14px",
    [theme.breakpoints.down("lg")]: {
      padding: "0rem 0.25rem",
    },
  },
  storyIcon: {
    height: "28px ",
    width: "28px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down("lg")]: {
      height: "25px",
      width: "25px",
    },
  },
  storyButtonIcon: {
    color: "#fff",
    fontSize: "1.7rem",
    fontWeight: "700",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.2rem",
    },
  },
  image: {
    height: "160px",
    width: "160px",
    border: `3px solid ${theme.palette.common.crimson}`,
    borderRadius: "50%",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      height: "115px",
      width: "115px",
    },
  },
}));

const Story = (props) => {
  const { image, username, stories } = props;
  const videoRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [prevMute, setPrevMute] = useState();
  const muted = useSelector((state) => state.video.muted);
  const [openDialog, setOpenDialog] = useState(false);
  const videos = stories;
  const [index, setIndex] = useState(0);
  const handleClick = () => {
    setPrevMute(muted);
    if (!muted) {
      dispatch(setMute(true));
    }
    setOpenDialog(true);
  };
  const handleVideoEnd = () => {
    if (index === videos.length - 1) {
      setOpenDialog(false);
      dispatch(setMute(prevMute));
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const handleNext = () => {
    if (index === videos.length - 1) {
      console.log(videoRef);
      return;
    } else {
      setIndex(index + 1);
    }
  };
  const handlePrev = () => {
    if (index === 0) {
      return;
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <>
      <SplideSlide>
        <img
          src={image}
          className={classes.image}
          onClick={handleClick}
          alt=""
        />
      </SplideSlide>
      <Dialog
        className={classes.dialog}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Grid container className={classes.dialogContainer}>
          <Grid item container className={classes.content}>
            <video
              ref={videoRef}
              playsInline
              autoPlay
              src={videos[index].url}
              onEnded={handleVideoEnd}
              className={classes.story}
            ></video>
            <Grid container alignItems="center" className={classes.profile}>
              <Grid item>
                <IconButton
                  onClick={() => setOpenDialog(false)}
                  className={classes.backButton}
                >
                  <ChevronLeft className={classes.backIcon} />
                </IconButton>
              </Grid>
              <Grid item>
                <Grid item container direction="column" alignItems="center">
                  <Grid item>
                    <Avatar className={classes.profilePic} src={image} />
                  </Grid>
                  <Grid item>
                    <span className={classes.username}>{username}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.arrowContainer}>
              <div>
                <IconButton onClick={handlePrev} className={classes.storyIcon}>
                  <ChevronLeft className={classes.storyButtonIcon} />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={handleNext} className={classes.storyIcon}>
                  <ChevronRight className={classes.storyButtonIcon} />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default Story;
