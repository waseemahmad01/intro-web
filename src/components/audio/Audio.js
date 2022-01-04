import React, { useState, useRef } from "react";
import {
  makeStyles,
  IconButton,
  Slider,
  CircularProgress,
} from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";

const Audio = ({ src, fromMe }) => {
  const classes = useStyles();
  const player = useRef();
  const [play, setPlay] = useState(false);
  const [value, setValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
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
    <>
      <div>
        <div
          className={
            fromMe
              ? canPlay
                ? classes.meContainer
                : classes.hide
              : canPlay
              ? classes.container
              : classes.hide
          }
        >
          <audio
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onCanPlay={() => setCanPlay(true)}
            ref={player}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setPlay(false);
              setValue(0);
            }}
          >
            <source src={src} />
          </audio>
          <IconButton onClick={handlePlay} className={classes.icon}>
            {play ? <Pause /> : <PlayArrow />}
          </IconButton>
          <Slider value={value} onChange={handleChange} />
        </div>
        {!canPlay && (
          <CircularProgress color={fromMe ? "primary" : "secondary"} />
        )}
      </div>
    </>
  );
};

export default Audio;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "200px",
    alignItems: "center",
    background: "rgba(254, 133, 140, 0.1)",
    paddingBlock: "5px",
    paddingInline: "10px 20px",
    borderRadius: "20px",
  },
  meContainer: {
    display: "flex",
    width: "200px",
    alignItems: "center",
    background: "rgba(161, 125, 255, 0.13)",
    paddingBlock: "5px",
    paddingInline: "10px 20px",
    borderRadius: "20px",
  },
  icon: {
    height: "30px",
    width: "30px",
    marginRight: "10px",
  },
  hide: {
    visibility: "hidden",
    width: "1px",
    height: "1px",
  },
}));
