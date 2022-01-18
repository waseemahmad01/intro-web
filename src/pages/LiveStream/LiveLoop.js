import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Dialog,
} from "@material-ui/core";
import { Block } from "@material-ui/icons";
import { useStyles } from "./streamStyles";
import AgoraRTC from "agora-rtc-sdk-ng";
import image from "../../assets/index";
import { StreamerBox } from "../../components/ViewBox/StreamerBox";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { SocketContext } from "../../http/socket";
import { onMessageListener } from "../../firebaseInit";
import Draggable from "react-draggable";
import { wait } from "../../utils/waitFunction";
import Countdown from "react-countdown";
import { queryLiveLoop } from "../../http";

const LiveLoop = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down(1680));
  const { audience } = props;
  const filters = useSelector((state) => state.utils.liveloop.filters);
  // const channelName = audience ? props.history.location.state.username : null;
  const streamId = audience ? props.history.location.state.id : null;
  const hostUid = audience ? props.history.location.state.hostUid : null;
  const user = useSelector((state) => state.auth.user.data);
  const username = user.username;
  const liveRef = useRef();
  const guest = useRef();
  const liveStreamId = useRef(streamId);
  const coHostRef = useRef();
  const socket = useContext(SocketContext);
  const [guestWindow, setGuestWindow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [started, setStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [removeGuest, setRemoveGuest] = useState(false);
  const [exit, setExit] = useState(false);
  const [blueWindow, setBlueWindow] = useState(false);
  const [members, setMembers] = useState(0);
  const [coHostUserId, setCoHostUserId] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [location, setLocation] = useState({
    lon: "",
    lat: "",
  });
  const [closeStream, setCloseStream] = useState(false);
  const channelName = useRef("");
  const localTracks = useRef({
    audioTrack: null,
    videoTrack: null,
  });
  const getGender = () => {
    const gender = user.identify.gender;
    if (gender.toLowerCase() === "male") {
      return 1;
    } else if (gender.toLowerCase() === "female") {
      return 0;
    } else {
      return 2;
    }
  };
  // Agora setUp
  let client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  // eslint-disable-next-line

  let remoteUsers = {};
  // eslint-disable-next-line
  // const remoteUser = useRef();
  // Agora client options

  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: audience ? channelName : user.username,
    uid: null,
    token: null,
    accountName: null,
    //   role: "host",
  };

  const join = async () => {
    options.uid = await client.join(
      options.appId,
      channelName.current,
      options.token || null,
      options.uid || null
    );
    setUserUid(options.uid);
    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client.on("user-unpublished", handleUserUnpublish);
    localTracks.current.audioTrack =
      await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.current.videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.current.videoTrack.play(liveRef.current);
    await client.publish(Object.values(localTracks.current));
    setStarted(true);
    setIsWaiting(false);
    console.log("Successfully Published");
  };

  const handleUserUnpublish = (user, mediaType) => {
    console.log("user unpublish");
  };

  const leave = async () => {
    console.log("user leaving");
    for (let trackName in localTracks.current) {
      let track = localTracks.current[trackName];
      console.log(track);
      if (track) {
        track.stop();
        track.close();
        localTracks.current[trackName] = undefined;
      }
    }
    remoteUsers = {};
    await client.leave();
  };

  const subscribe = async (user, mediaType) => {
    try {
      // eslint-disable-next-line
      const uid = user.uid;
      await client.subscribe(user, mediaType);
      console.log("Successfully Subscribes.");

      if (mediaType === "video") {
        if (uid === hostUid) {
          user.videoTrack.play(liveRef.current);
        } else {
          console.log("Date user added");
          user.videoTrack.play(guest.current);
          localStorage.setItem("uid", uid);
        }
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    } catch (err) {
      console.log(err);
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
    setBlueWindow(true);
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  };

  const handleUserLeft = (user) => {
    const id = user.uid;
    const uid = localStorage.getItem("uid");
    if (user.uid == uid) {
      setGuestWindow(false);
    }
    delete remoteUsers[id];
    // removePlayer();
  };
  const handleComplete = async () => {
    leave();
    setIsWaiting(true);
    setBlueWindow(false);
    const str = `age=${filters.age[0]}&age=${filters.age[1]}&long=${filters.location.coordinates[0]}&lat=${filters.location.coordinates[1]}&distance=${filters.distance}&gender_identifier=${filters.gender_identifier}`;
    console.log(str);
    const { data } = await queryLiveLoop(str);
    console.log(data);
  };
  // eslint-disable-next-line
  const startLiveLoop = async () => {};
  useEffect(() => {
    // join();
    // rtmSetup();
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
    //     setLocation({ lon: pos.coords.longitude, lat: pos.coords.latitude });
    //   });
    // }
    return () => {
      (async () => {
        if (started) {
          await leave();
        }
        // options.role = "audience";
        // RTMLeave();
      })();
    };
    // eslint - disable - next - line;
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      if (data.topic === `${user._id}_liveloop`) {
        console.log(data);
        channelName.current = data.channelname;
        let status = data.status;
        const doc = JSON.parse(data.data);
        console.log(doc);
        let str = channelName.current.split("_");
        if (str[0] === user.username) {
          (async () => {
            await wait(1000);
            join();
          })();
        } else {
          (async () => {
            await wait(1500);
            join();
          })();
        }
      }
    });
  });
  return (
    <Grid
      container
      className={classes.mainContainer}
      justifyContent="space-between"
    >
      <Grid item container direction="column" className={classes.left}>
        <Grid item>
          <Typography className={classes.username} variant="h4">
            {audience ? channelName : user.username}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item container>
            <Grid item>
              <div className={classes.statsContainer}>
                <img
                  src={image.gem}
                  className={classes.gemIcon}
                  alt="eye-icon"
                />
                <span className={classes.count}>3.4k</span>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.statsContainer}>
                <img
                  src={image.eyeBlue}
                  className={classes.eyeIcon}
                  alt="eye-icon"
                />
                <span className={classes.count}>
                  {members === 0 ? 0 : members - 1}
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.streamContainer} ref={liveRef}>
            <IconButton
              onClick={() => {
                if (started) {
                  setCloseStream(true);
                } else {
                  props.history.replace("/live");
                }
              }}
              className={classes.endStreamButton}
            >
              <Close className={classes.endStreamIcon} />
            </IconButton>
            <Dialog
              className={classes.endStreamDialog}
              open={closeStream}
              onClose={() => setCloseStream(false)}
            >
              <Grid
                container
                alignItems="center"
                className={classes.endStreamContainer}
                direction="column"
                justifyContent="space-between"
              >
                <Grid item container direction="column">
                  <Grid item>
                    <Typography className={classes.endTitle}>
                      Are you sure?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.endSubtitle}>
                      This will end your stream.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container alignItems="center" direction="column">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.endStreamButtons}
                    style={{ marginBottom: "1rem" }}
                    onClick={() => {
                      if (started) {
                        props.history.replace("/live");
                        leave();
                      }
                    }}
                  >
                    End Stream
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.endStreamButtons}
                    onClick={() => setCloseStream(false)}
                  >
                    Not Now
                  </Button>
                </Grid>
              </Grid>
            </Dialog>

            <Dialog open={openDialog} className={classes.dialog}>
              <Grid
                container
                direction="column"
                alignItems="center"
                className={classes.dialogContent}
              >
                <Grid item>
                  <Typography className={classes.dialogTitle}>
                    Report Stream
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.dialogSubtitle}>
                    Are you sure you want to report this stream?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.reportButton}
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(false)}
                  >
                    Report
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.cancelButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Dialog>
            {/* waiting overlay */}
            {isWaiting ? (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
                className={classes.waitingOverly}
              >
                <Typography className={classes.overlyTitle}>
                  Wait Please
                </Typography>
                <Typography className={classes.overlySubtitle}>
                  You will be able to see the user's video once it is your turn
                </Typography>
              </Grid>
            ) : undefined}
            {blueWindow ? (
              <Draggable
                bounds="parent"
                defaultClassName={classes.dragableBlueWindow}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  className={classes.blueWindow}
                >
                  <IconButton className={classes.closeButton}>
                    <Close className={classes.closeIcon} />
                  </IconButton>
                  <Typography className={classes.blueWindowText}>
                    Ask your viewers to play!
                  </Typography>
                  <Countdown
                    onComplete={handleComplete}
                    date={Date.now() + 180000}
                    renderer={({ hours, minutes, seconds, completed }) => {
                      if (completed) {
                        // Render a completed state
                        // return <Completionist />;
                        return "";
                      } else {
                        // Render a countdown
                        return (
                          <span className={classes.timer}>
                            {minutes}:{seconds}
                          </span>
                        );
                      }
                    }}
                  />
                  <Grid
                    className={classes.loopVideoContainer}
                    ref={guest}
                  ></Grid>
                </Grid>
              </Draggable>
            ) : undefined}
          </div>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          className={classes.warningContainer}
        >
          {isWaiting ? (
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography className={classes.waitTitle}>
                {exit ? "Are you sure?" : "Wait Please"}
              </Typography>
              <Typography className={classes.waitSubtitle}>
                {exit
                  ? "Do you really want to get out of line?"
                  : "You are in line for the next|date with silkysilk_00. Wait for	your turn to have fun with the user."}
              </Typography>
              <Grid item>
                {exit ? (
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        className={classes.exitSecondaryButton}
                        variant="outlined"
                        color="primary"
                        onClick={() => setIsWaiting(false)}
                      >
                        Leave the line
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.exitSecondaryButton}
                        variant="outlined"
                        color="primary"
                        onClick={() => setExit(false)}
                      >
                        Keep Waiting
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Button
                    className={classes.exitButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => setExit(true)}
                  >
                    EXIT
                  </Button>
                )}
              </Grid>
            </Grid>
          ) : (
            <>
              <Block className={classes.block} />
              <Typography className={classes.warning} variant="h4">
                Don’t stream nudity or obscene/violent behavior. ever stream
                while driving or under unsafe conditions.
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems={smScreen ? undefined : "flex-end"}
        justifyContent={lgScreen ? "center" : "flex-start"}
        className={classes.utilityContainer}
      >
        <StreamerBox
          // joinLiveLoop={loopJoin}
          //   endStream={handleEndStream}
          // channelId={userUid}
          //   roleChange={roleChange}
          // streamId={streamId}
          // setCoHostUserId={setCoHostUserId}
          setIsWaiting={setIsWaiting}
          liveloop={true}
        />
      </Grid>
    </Grid>
  );
};

export default LiveLoop;
