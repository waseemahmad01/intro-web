import React, { useState, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  makeStyles,
  Grid,
  Dialog,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import Story from "../stories/Story";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { useSelector, useDispatch } from "react-redux";

import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import { setMute } from "../../store/videoSound";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .splide__arrow": {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.85,
      fill: "#ffffff",
      fontSize: "1.25rem",
      height: "42px",
      width: "42px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.75rem",
        height: "32px",
        width: "32px",
      },
    },
    "& .splide__arrow--prev": {
      left: "-1rem",
      [theme.breakpoints.down("lg")]: {
        left: "-0.7rem",
      },
    },
    "& .splide__arrow--next": {
      right: "-0.6rem",
      [theme.breakpoints.down("lg")]: {
        right: "-0.2rem",
      },
    },
  },
  dialogContainer: {
    height: "685px",
    width: "365px",
    padding: "0.5rem",
    position: "relative",
    backgroundImage: "linear-gradient( #654AAB,#E77783)",
    [theme.breakpoints.down("lg")]: {
      height: "480px",
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
      fontSize: "2rem",
    },
  },
  profilePic: {
    height: "60px",
    width: "60px",
    border: `5px solid ${theme.palette.common.crimson}`,
    boxSizing: "content-box",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "40px",
      border: `3px solid ${theme.palette.common.crimson}`,
    },
  },
  username: {
    color: "#fff",
    fontSize: "14px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "11px",
    },
  },
  storyIcon: {
    minHeight: 8,
    minWidth: 8,
    height: "28px ",
    width: "28px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down("lg")]: {
      height: "15px",
      width: "15px",
    },
  },
  btnLeft: {
    position: "absolute",
    top: "calc(50% - 14px)",
    left: "14px",
    [theme.breakpoints.down("lg")]: {
      top: "calc(50% - 10px)",
      left: "10px",
    },
  },
  btnRight: {
    position: "absolute",
    top: "calc(50% - 14px)",
    right: "14px",
    [theme.breakpoints.down("lg")]: {
      top: "calc(50% - 10px)",
      right: "10px",
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
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    transition: "0.3s ease",
    backgroundColor: "#ffffff",
    height: "0%",
  },
}));

export const StorySlider = ({ setIsAnyOpen }) => {
  const classes = useStyles();
  const videoRef = useRef();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories.stories);
  const [openDialog, setOpenDialog] = useState(false);
  const [allStories, setAllStories] = useState(stories || []);
  const muted = useSelector((state) => state.video.muted);
  const [mainIndex, setMainIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const handleClick = (index) => {
    setMainIndex(index);
    setStoryIndex(0);
    setProgress(0);
    setIsAnyOpen(true);
    setOpenDialog(true);
  };
  const handleVideoEnd = () => {
    setProgress(0);
    if (
      mainIndex === allStories.length - 1 &&
      storyIndex === allStories[mainIndex].stories.length - 1
    ) {
      setOpenDialog(false);
      setIsAnyOpen(false);
      setStoryIndex(0);
    } else if (storyIndex === allStories[mainIndex].stories.length - 1) {
      setMainIndex(mainIndex + 1);
      setStoryIndex(0);
    } else {
      setStoryIndex(storyIndex + 1);
    }
  };
  const handlePrev = () => {
    setProgress(0);
    if (mainIndex === 0 && storyIndex === 0) {
      setOpenDialog(false);
      setIsAnyOpen(false);
      setStoryIndex(0);
    } else if (storyIndex === 0) {
      setStoryIndex(allStories[mainIndex - 1].stories.length - 1);
      setMainIndex(mainIndex - 1);
    } else {
      setStoryIndex(storyIndex - 1);
    }
  };
  const handleNext = () => {
    setProgress(0);
    if (
      mainIndex === allStories.length - 1 &&
      storyIndex === allStories[mainIndex].stories.length - 1
    ) {
      setOpenDialog(false);
      setIsAnyOpen(false);
      setStoryIndex(0);
    } else if (storyIndex === allStories[mainIndex].stories.length - 1) {
      setMainIndex(mainIndex + 1);
      setStoryIndex(0);
    } else {
      setStoryIndex(storyIndex + 1);
    }
  };
  const handleMouseDown = () => {
    videoRef.current.pause();
  };
  const handleMouseUp = () => {
    videoRef.current.play();
  };
  const handleTimeUpdate = () => {
    const progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <>
      <div className={classes.root}>
        <Splide
          options={{
            perPage: 8,
            perMove: 1,
            pagination: false,
          }}
        >
          {allStories.map((user, index) => (
            <SplideSlide key={user.user_id}>
              <img
                src={user.avatar}
                className={classes.image}
                onClick={() => handleClick(index)}
                alt=""
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
      {allStories.length !== 0 ? (
        <Dialog
          className={classes.dialog}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <Grid container className={classes.dialogContainer}>
            <div
              className={classes.progress}
              style={{ height: `calc(100% - ${progress + 2}%)` }}
            ></div>
            <Grid item container className={classes.content}>
              <video
                playsInline
                autoPlay
                src={allStories[mainIndex].stories[storyIndex].url}
                onEnded={handleVideoEnd}
                className={classes.story}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
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
                      <Avatar
                        className={classes.profilePic}
                        src={allStories[mainIndex].avatar}
                      />
                    </Grid>
                    <Grid item>
                      <span className={classes.username}>
                        {allStories[mainIndex].username}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <IconButton
                onClick={handlePrev}
                className={`${classes.storyIcon} ${classes.btnLeft}`}
              >
                <ChevronLeft className={classes.storyButtonIcon} />
              </IconButton>
              <IconButton
                onClick={handleNext}
                className={`${classes.storyIcon} ${classes.btnRight}`}
              >
                <ChevronRight className={classes.storyButtonIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Dialog>
      ) : undefined}
    </>
  );
};
