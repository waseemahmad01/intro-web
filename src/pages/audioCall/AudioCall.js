import React, { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  ChevronLeft,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
} from "@material-ui/icons";
import AgoraRTC from "agora-rtc-sdk-ng";
import useTimer from "../../hooks/useTimer";
import { useHistory } from "react-router-dom";

const AudioCall = ({ hello, closeAPortal, appId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [muteAudio, setMuteAudio] = useState(false);
  const { start, stop, time } = useTimer();
  const { chatId, userImg, username } = history.location.state;
  const [started, setStarted] = useState(false);

  const localTracks = useRef({
    audioTrack: null,
    videoTrack: null,
  });

  // agora config

  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: chatId,
    uid: null,
    token: null,
  };

  const handleMuteAudio = async () => {
    console.log(localTracks);
    const audioTrack = localTracks.current.audioTrack;
    audioTrack.setMuted(!muteAudio);
    setMuteAudio(!muteAudio);
  };
  const remoteUsers = {};

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const join = async () => {
    options.uid = await client.join(
      options.appId,
      options.channel,
      options.token || null,
      options.uid || null
    );
    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    let audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // let videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.current = { audioTrack: audioTrack, videoTrack: null };
    // localTracks.current.videoTrack.play(local.current);
    await client.publish(Object.values(localTracks.current));
    console.log("Successfully Published");
  };
  const leave = async () => {
    for (let trackName in localTracks.current) {
      let track = localTracks.current[trackName];
      console.log(track);
      if (track) {
        track.stop();
        track.close();
        localTracks.current[trackName] = undefined;
      }
    }
    await client.leave();
    console.log("Client successfuly left the channel");
  };

  const subscribe = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    setStarted(true);

    if (mediaType === "video") {
      console.log(user.uid, options.uid);
      if (user.uid === options.uid) {
        // user.videoTrack.play(local.current);
      } else {
        // user.videoTrack.play(remote.current);
      }
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
    start();
  };
  const handleUserPublished = (user, mediaType) => {
    const id = user.uid;
    remoteUsers[id] = user;
    console.log("published");
    subscribe(user, mediaType);
  };
  const handleUserJoined = (user, mediaType) => {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  };
  const handleUserLeft = (user) => {
    const id = user.uid;
    delete remoteUsers[id];
    alert(user.uid);
    history.goBack();
  };

  useEffect(() => {
    join();
    return () => {
      leave();
      stop();
    };
  }, []);
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid
        item
        container
        className={classes.top}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <IconButton className={classes.prevButton}>
          <ChevronLeft className={classes.icon} />
        </IconButton>
        <Grid item>
          <Grid item container direction="column">
            <Typography className={classes.title}>Savannah</Typography>
            <Typography className={classes.subtitle}>
              {started ? (
                <>
                  <span>{Math.floor(time / 60)}</span>
                  <span>:</span>
                  <span>{("0" + (time % 60)).slice(-2)}</span>
                </>
              ) : (
                "video calling"
              )}
            </Typography>
          </Grid>
        </Grid>
        <div />
      </Grid>
      <Grid item container direction="column" className={classes.bottom}>
        <Grid item className={classes.imageContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK6mQv8iE9O1qNGUGC7Wqq0gYljPX0sai-qA&usqp=CAU"
            alt=""
          />
        </Grid>
        <Grid item container className={classes.middle}></Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.bottomBar}
        >
          <IconButton disableRipple className={classes.actionButton}>
            <Videocam className={classes.actionButtonIcons} />
          </IconButton>
          <IconButton
            onClick={() => history.goBack()}
            className={classes.callEndButton}
          >
            <CallEnd className={classes.callEndButtonIcon} />
          </IconButton>
          <IconButton
            disableRipple
            onClick={handleMuteAudio}
            className={classes.actionButton}
          >
            {muteAudio ? (
              <MicOff
                style={{ color: "#FE858C" }}
                className={classes.actionButtonIcons}
              />
            ) : (
              <Mic className={classes.actionButtonIcons} />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AudioCall;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  top: {
    paddingTop: "3rem",
    paddingInline: "5rem",
    paddingBottom: "1rem",
    backgroundImage: `linear-gradient(to bottom, #654AAB, #E77783)`,
    [theme.breakpoints.down("lg")]: {
      paddingTop: "1rem",
      paddingInline: "1rem",
    },
  },
  prevButton: {
    height: "50px",
    width: "50px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      width: "35px",
    },
  },
  icon: {
    color: "#ffffff",
    fontSize: "50px",
    textShadow: "1px 1px 10px #000000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  title: {
    margin: "0",
    fontSize: "28px",
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  subtitle: {
    margin: "0",
    fontSize: "18px",
    marginTop: "5px",
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
    },
  },
  bottom: {
    flexGrow: 1,
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  middle: {
    flexGrow: 1,
    zIndex: 1,
  },
  bottomBar: {
    height: "6rem",
    paddingInline: "30%",
    zIndex: 1,
    background: "#55355Fb3",
    [theme.breakpoints.down("lg")]: {
      height: "3rem",
    },
  },
  actionButtonIcons: {
    fontSize: "60px",
    color: "#ffffff",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  callEndButton: {
    height: "100px",
    width: "100px",
    background: "#EB5757",
    marginTop: "-90px",
    "&:hover": {
      background: "#EB5757",
    },
    [theme.breakpoints.down("lg")]: {
      height: "50px",
      width: "50px",
      marginTop: "-50px",
    },
  },
  callEndButtonIcon: {
    fontSize: "50px",
    color: "#ffffff",
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
    },
  },
  actionButton: {
    height: "60px",
    width: "60px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
      width: "35px",
    },
  },
}));
