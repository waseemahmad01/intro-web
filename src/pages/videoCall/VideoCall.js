import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  Grid,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  ChevronLeft,
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd,
} from "@material-ui/icons";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";
import useTimer from "../../hooks/useTimer";
import { useHistory } from "react-router-dom";

const VideoCall = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [started, setStarted] = useState(false);
  const { start, stop, time } = useTimer();
  const { chatId, userImg, username } = history.location.state;
  const user = useSelector((state) => state.auth.user.data);
  const [muteVideo, setMuteVideo] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);
  const localTracks = useRef({
    audioTrack: null,
    videoTrack: null,
  });

  const local = useRef();
  const remote = useRef();

  // agora config

  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: chatId,
    uid: null,
    token: null,
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
    let videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.current = { audioTrack: audioTrack, videoTrack: videoTrack };
    localTracks.current.videoTrack.play(local.current);
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
        user.videoTrack.play(local.current);
      } else {
        user.videoTrack.play(remote.current);
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

  const handleMuteAudio = async () => {
    console.log(localTracks);
    const audioTrack = localTracks.current.audioTrack;
    audioTrack.setMuted(!muteAudio);
    setMuteAudio(!muteAudio);
  };

  const handleMuteVideo = () => {
    console.log(localTracks);
    const videoTrack = localTracks.current.videoTrack;
    videoTrack.setMuted(!muteVideo);
    setMuteVideo(!muteVideo);
  };

  useEffect(() => {
    join();
    return () => {
      leave();
      stop();
    };
  }, []);
  return (
    <Grid container className={classes.container} direction="column">
      <Grid
        ref={remote}
        style={{ zIndex: "1" }}
        className={classes.videoContainer}
      ></Grid>
      <Grid id="main" className={classes.videoContainer}>
        <Draggable
          defaultClassName={`${classes.dragable} ${
            started ? "" : classes.hidden
          }`}
          bounds="parent"
        >
          <Grid
            item
            ref={local}
            container
            className={classes.remoterUserVideo}
          ></Grid>
        </Draggable>
        <img
          src={
            "https://tipsforwomens.org/wp-content/uploads/2020/08/Can-Yaman-reveals-what-is-really-between-him-and-Demet-1024x584.jpeg"
          }
          alt=""
        />
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.top}
      >
        <IconButton className={classes.prevButton}>
          <ChevronLeft className={classes.icon} />
        </IconButton>
        <Typography className={classes.title}>
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
        <div />
      </Grid>
      <Grid item container className={classes.middle} justifyContent="center">
        {!started && (
          <Grid item className={classes.avatarContainer}>
            <Grid item container direction="column" alignItems="center">
              <Avatar src={userImg} className={classes.userImage} alt="" />
              <Typography className={classes.username}>{username}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.bottom}
      >
        <IconButton
          disableRipple
          onClick={handleMuteVideo}
          className={classes.actionButton}
        >
          {muteVideo ? (
            <VideocamOff
              style={{ color: "#FE858C" }}
              className={classes.actionButtonIcons}
            />
          ) : (
            <Videocam className={classes.actionButtonIcons} />
          )}
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
  );
};

export default VideoCall;

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    position: "relative",
  },
  top: {
    marginTop: "5rem",
    paddingInline: "5rem",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
      paddingInline: "1rem",
    },
  },
  middle: {
    flexGrow: 1,
    background: "blue",
  },
  bottom: {
    height: "6rem",
    paddingInline: "30%",
    zIndex: 1,
    background: "#55355Fb3",
    [theme.breakpoints.down("lg")]: {
      height: "3rem",
    },
  },
  title: {
    margin: "0",
    fontSize: "28px",
    textTransform: "capitalize",
    textShadow: "1px 1px 10px #000000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
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
  avatarContainer: {
    marginTop: "2rem",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
    },
  },
  userImage: {
    height: "200px",
    width: "200px",
    [theme.breakpoints.down("lg")]: {
      height: "100px",
      width: "100px",
    },
  },
  username: {
    fontSize: "30px",
    margin: "0px",
    textShadow: "1px 1px 10px #000000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  remoterUserVideo: {
    height: "350px",
    width: "300px",
    background: "red",
    borderRadius: "20px",
    overflow: "hidden",
    [theme.breakpoints.down("lg")]: {
      height: "200px",
      width: "185px",
      borderRadius: "12px",
    },
  },
  dragable: {
    position: "absolute",
    right: "100px",
    top: "100px",
    zIndex: 10,
    cursor: "move",
    [theme.breakpoints.down("lg")]: {
      top: "50px",
      right: "50px",
    },
  },
  hidden: {
    visibility: "hidden",
  },
}));
