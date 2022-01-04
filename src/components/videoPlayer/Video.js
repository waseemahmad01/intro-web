import React, { useState, useRef } from "react";
import { makeStyles, IconButton, Slider } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import a from "./a.mp4";
const Video = ({ src, fromMe }) => {
  const classes = useStyles();
  const player = useRef();
  const [play, setPlay] = useState(false);
  const [value, setValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    if (player.current.paused && !isPlaying) {
      player.current.play();
      setPlay(true);
    } else if (!player.current.paused && isPlaying) {
      player.current.pause();
      setPlay(false);
    }
  };
  const handleChange = (event, newValue) => {
    player.current.currentTime = (newValue / 100) * player.current.duration;
    // player.current.currentTime = newValue;
    setValue(newValue);
  };
  const handleTimeUpdate = () => {
    const progress =
      (player.current.currentTime / player.current.duration) * 100;
    setValue(progress);
  };
  return (
    <div className={classes.container}>
      <div className={classes.videoContainer}>
        <video
          className={classes.video}
          src={src}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          ref={player}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setPlay(false);
            setValue(0);
          }}
        ></video>
      </div>
      <div className={fromMe ? classes.controls2 : classes.controls}>
        <IconButton onClick={handlePlay} className={classes.icon}>
          {play ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Slider value={value} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Video;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "210px",
    width: "200px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "12px",
    overflow: "hidden",
  },
  videoContainer: {
    height: "158px",
    background: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controls: {
    paddingInline: "10px 20px",
    paddingBlock: "5px",
    display: "flex",
    alignItems: "center",
    background: "rgba(254, 133, 140,0.1)",
  },
  controls2: {
    paddingInline: "10px 20px",
    paddingBlock: "5px",
    display: "flex",
    alignItems: "center",
    background: "rgba(161, 125, 255, 0.13)",
  },
  icon: {
    height: "30px",
    width: "30px",
    marginRight: "10px",
  },
}));
