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
import image from "../../assets";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoCall = (props) => {
  const classes = useStyles();
  const [started, setStarted] = useState(true);
  const user = useSelector((state) => state.auth.user.data);
  const [muteVideo, setMuteVideo] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);

  const local = useRef();
  const remote = useRef();

  // agora config

  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: user.username,
    uid: null,
    token: null,
  };

  const localTracks = {
    audioTrack: null,
    videoTrack: null,
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
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();

    await client.publish(Object.values(localTracks));
    console.log("Successfully Published");
  };
  const leave = async () => {
    for (let trackName in localTracks) {
      let track = localTracks[trackName];
      console.log(track);
      if (track) {
        track.stop();
        track.close();
        localTracks[trackName] = undefined;
      }
    }
    await client.leave();
    console.log("Client successfuly left the channel");
  };

  const subscribe = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    console.log("Successfully Subscribes.");
    if (mediaType === "video") {
      if (user.uid === options.uid) {
        user.videoTrack.play(local.current);
      } else {
        user.videoTrack.play(remote.current);
      }
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
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
    // removePlayer();
  };

  const handleMuteAudio = () => {
    localTracks.audioTrack.setMuted(!muteAudio);
    setMuteAudio(!muteAudio);
  };

  const handleMuteVideo = () => {
    localTracks.videoTrack.setMuted(!muteVideo);
    setMuteVideo(!muteVideo);
  };

  useEffect(() => {
    console.log("running");
  }, []);
  return (
    <Grid container className={classes.container} direction="column">
      <Grid className={classes.videoContainer}>
        {started && (
          <Draggable defaultClassName={classes.dragable} bounds="parent">
            <Grid item container className={classes.remoterUserVideo}></Grid>
          </Draggable>
        )}

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
        <Typography className={classes.title}>video calling</Typography>
        <div />
      </Grid>
      <Grid item container className={classes.middle} justifyContent="center">
        {!started && (
          <Grid item className={classes.avatarContainer}>
            <Grid item container direction="column" alignItems="center">
              <Avatar src={image.img} className={classes.userImage} alt="" />
              <Typography className={classes.username}>Savannah</Typography>
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
            <VideocamOff className={classes.actionButtonIcons} />
          ) : (
            <Videocam className={classes.actionButtonIcons} />
          )}
        </IconButton>
        <IconButton className={classes.callEndButton}>
          <CallEnd className={classes.callEndButtonIcon} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={handleMuteAudio}
          className={classes.actionButton}
        >
          {muteAudio ? (
            <MicOff className={classes.actionButtonIcons} />
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
}));
