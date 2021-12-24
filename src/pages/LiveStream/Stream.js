import React, { useState, useRef, useEffect, useContext } from "react";
import { useStyles } from "./streamStyles";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import {
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Dialog,
} from "@material-ui/core";
import image from "../../assets/index";
import {
  Block,
  ReportProblemOutlined as WarningIcon,
} from "@material-ui/icons";
import { StreamerBox } from "../../components/ViewBox/StreamerBox";
import { ViewerBox } from "../../components/ViewBox/ViewerBox";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { goLive } from "../../http";
import api from "../../http";
import { SocketContext } from "../../http/socket";
import { Gift } from "../../components/Gift/Gift";
import { onMessageListener } from "../../firebaseInit";
import { removeCoHost, agoraToken } from "../../http";

export const Stream = (props) => {
  console.log(props.history);
  const { audience } = props;
  const channelName = audience ? props.history.location.state.username : null;
  const streamId = audience ? props.history.location.state.id : null;
  const hostUid = audience ? props.history.location.state.hostUid : null;
  console.log(hostUid);
  const user = useSelector((state) => state.auth.user.data);
  const classes = useStyles();
  const liveRef = useRef();
  const guest = useRef();
  const username = user.username;
  const socket = useContext(SocketContext);
  // eslint-disable-next-line
  const remoteTracks = {
    audioTrack: null,
    videoTrack: null,
  };
  // const [liveStreamId, setLiveStreamId] = useState("hello");
  const liveStreamId = useRef("");
  const [guestWindow, setGuestWindow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [removeGuest, setRemoveGuest] = useState(false);
  const [exit, setExit] = useState(false);
  const [blueWindow, setBlueWindow] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [members, setMembers] = useState(0);
  const [coHostId, setCoHostId] = useState("");
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down(1680));
  const [userUid, setUserUid] = useState(null);
  const [location, setLocation] = useState({
    lon: "",
    lat: "",
  });
  const [closeStream, setCloseStream] = useState(false);
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

  let client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  let loopClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [roleUpdated, setRoleUpdated] = useState(false);

  let localTracks = {
    videoTrack: null,
    audioTrack: null,
  };

  let remoteUserTracks = {
    videoTrack: null,
    audioTrack: null,
  };
  let remoteUserUid = "";

  let remoteUsers = {};
  const remoteUser = useRef();
  // Agora client options

  const options = {
    appId: "eb25ec81a8bc477ebb4673ba983ceb13",
    // appId: process.env.REACT_APP_AGORA_APPID,
    channel: audience ? channelName : user.username,
    uid: null,
    token: null,
    accountName: null,
    role: audience ? "audience" : "host",
    // rtmToken: null,
    // rtmUid: null,
  };

  const rtmSetup = () => {
    RTMJoin();
  };

  const join = async () => {
    client.setClientRole(options.role);
    if (options.role === "audience") {
      console.log("running ======> audience");
      client.on("user-published", handleUserPublished);
      client.on("user-joined", handleUserJoined);
      client.on("user-left", handleUserLeft);
    }
    options.uid = await client.join(
      options.appId,
      options.channel,
      options.token || null,
      options.uid || null
    );
    setUserUid(options.uid);
    if (options.role === "host") {
      console.log("running ======> host");
      client.on("user-published", handleUserPublished);
      client.on("user-joined", handleUserJoined);
      client.on("user-left", handleUserLeft);
      localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
      localTracks.videoTrack.play(liveRef.current);
      await client.publish(Object.values(localTracks));
      console.log("Successfully Published");
    }
  };
  const leave = async () => {
    console.log("user leaving");
    for (let trackName in localTracks) {
      let track = localTracks[trackName];
      if (track) {
        track.stop();
        track.close();
        localTracks[trackName] = undefined;
      }
    }
    remoteUsers = {};
    await client.leave();
    if (options.role === "host") {
      console.log("Client successfuly left the channel");
      // eslint-disable-next-line
      const res = await api.delete("/api/deleteliveuser", {
        data: {
          username: username,
        },
      });
    }
    // if (coHostId) {
    //   for (let trackName in remoteUserTracks) {
    //     let track = localTracks[trackName];
    //     if (track) {
    //       track.stop();
    //       track.close();
    //     }
    //     delete remoteUsers[remoteUserUid];
    //     await client.leave();
    //   }
    // } else {

    // }
  };

  const loopJoin = async () => {
    options.uid = await loopClient.join(
      options.appId,
      options.channel,
      options.token || null,
      options.uid || null
    );
    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleLoopUserJoined);
    client.on("user-left", handleUserLeft);
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    localTracks.videoTrack.play(liveRef.current);
    await client.publish(Object.values(localTracks));
  };

  const subscribe = async (user, mediaType) => {
    try {
      // eslint-disable-next-line
      const uid = user.uid;
      await client.subscribe(user, mediaType);
      console.log("Successfully Subscribes.");

      if (mediaType === "video") {
        if (localTracks.videoTrack && !coHostId) {
          setGuestWindow(true);
          console.log("guest user added");
          remoteUserTracks.videoTrack = user.videoTrack;
          remoteUserTracks.audioTrack = user.videoTrack;
          user.videoTrack.play(guest.current);
          remoteUserUid = user.uid;
        } else {
          user.videoTrack.play(liveRef.current);
        }
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoopUserJoined = async (user, mediaType) => {
    const uid = user.uid;
    remoteUsers[uid] = user;
    await loopClient.subscribe(user, mediaType);
    console.log("Successfully Subscribes.");
    if (mediaType === "video") {
      user.videoTrack.play(remoteUser.current);
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

  // let clientRTM;
  const clientRTM = AgoraRTM.createInstance(options.appId, {
    enableLogUpload: false,
  });
  let channel;
  const RTMJoin = async () => {
    clientRTM
      .login({
        uid: username,
      })
      .then(() => {
        console.log("AgoraRTM client login success. username : " + username);
        console.log("267 login");
        // RTM channel join
        let channelName = options.channel;
        channel = clientRTM.createChannel(channelName);
        channel
          .join()
          .then(() => {
            console.log("AgoraRTM client channel join success");
            setIsLoggedIn(true);
            // get all members in RTM channel
            channel.getMembers().then((memberNames) => {
              setMembers(memberNames.length);
              channel.on("MemberJoined", () => {
                // get all members in RTM channel
                const data = {
                  id: liveStreamId.current,
                  count: 1,
                };
                console.log(liveStreamId.current);
                socket.emit("livestreamcount", data);
                channel.getMembers().then((memberNames) => {
                  setMembers(memberNames.length);
                });
              });
              channel.on("MemberLeft", () => {
                const data = {
                  id: liveStreamId.current,
                  count: -1,
                };
                console.log(liveStreamId.current);
                socket.emit("livestreamcount", data);
                channel.getMembers().then((memberNames) => {
                  setMembers(memberNames.length);
                });
              });
            });
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };
  const roleChange = (data) => {
    if (data.type === "0") {
      leave();
      // RTMLeave();
      options.role = "host";
      join();
      // RTMJoin();
    } else if (data.type === "1") {
      console.log("Notification====> changing role to audience");
      RTMLeave();
      leave();
      options.role = "audience";
      join();
      RTMJoin();
    }
  };
  const handleRemoveCoHost = async () => {
    try {
      const apiData = {
        userId: coHostId,
        id: streamId,
      };
      // eslint-disable-last-line
      const { data } = await removeCoHost(apiData);
      setRemoveGuest(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleStreamStarted = async () => {
    try {
      const goLiveData = {
        username: user.username,
        userId: user._id,
        image: user.profile_image,
        channelId: userUid,
        gender: getGender(),
        userStatus: user.current_status,
        rtcToken: "this is a string",
        location: {
          coordinates: [
            location.lon || user.location.lon,
            location.lat || user.location.lat,
          ],
        },
      };
      const { data } = await goLive(goLiveData);
      liveStreamId.current = data.id;
      console.log("Api res ==>", data.id);
      setIsStarted(true);
    } catch (err) {
      console.log("Something went wrong");
      props.history.goBack();
    }
  };
  // eslint-disable-next-line
  const handleHostLeft = () => {
    props.history.goBack();
  };
  const RTMLeave = async () => {
    await clientRTM.logout();
    console.log("Client logged out of RTM");
  };
  const handleEndStream = () => {
    leave();
  };
  // eslint-disable-next-line
  const startLiveLoop = async () => {};
  useEffect(() => {
    // (async () => {
    //   const apiData = {
    //     isPublisher: audience ? false : true,
    //     // isPublisher: false,
    //     channel: options.channel,
    //     uid: user._id,
    //   };
    //   const { data } = await agoraToken(apiData);
    //   options.token = audience ? token : data.rtcToken;
    //   options.uid = data.rtcUid;
    //   options.rtmToken = data.rtmToken;
    //   options.rtmUid = data.rtmUid;
    //   // console.log(data);
    //   // console.log(options);
    // })();
    join();
    rtmSetup();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lon: pos.coords.longitude, lat: pos.coords.latitude });
      });
    }
    return () => {
      RTMLeave();
      leave();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      if (data.topic === `${user._id}_joinlive`) {
        console.log(data);
        roleChange(data);
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
            {!audience && (
              <IconButton
                onClick={() => setCloseStream(true)}
                className={classes.endStreamButton}
              >
                <Close className={classes.endStreamIcon} />
              </IconButton>
            )}
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
                    onClick={() => props.history.goBack()}
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
            {isStarted || audience ? undefined : (
              <div style={{ zIndex: 1 }} className={classes.description}>
                <TextField
                  classes={{ root: classes.fieldRoot }}
                  variant="standard"
                  className={classes.textField}
                  placeholder="Add Description"
                  inputProps={{ className: classes.input }}
                />
                <Button
                  className={classes.startButton}
                  variant="contained"
                  color="primary"
                  onClick={handleStreamStarted}
                >
                  Start
                </Button>
              </div>
            )}
            {guestWindow ? (
              <div className={classes.guestBox} style={{ zIndex: 3 }}>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    zIndex: 2,
                  }}
                >
                  <IconButton
                    onClick={() => setRemoveGuest(true)}
                    className={classes.closeButton}
                  >
                    <Close className={classes.closeIcon} />
                  </IconButton>
                  {/* <img src={image.actor} alt="" /> */}
                </div>
                <div className={classes.guestVideo} ref={guest}></div>
              </div>
            ) : undefined}
            <Dialog open={removeGuest} className={classes.guestUserDialog}>
              <Grid
                item
                container
                className={classes.guestDialogContainer}
                alignItems="center"
                direction="column"
                // justifyContent="space-between"
              >
                <Typography className={classes.guestTitle}>
                  Are you sure?
                </Typography>
                <Typography className={classes.guestSubTitle}>
                  You are removing current livestream guest
                </Typography>
                <Grid
                  item
                  container
                  style={{ marginTop: "auto" }}
                  alignItems="center"
                  direction="column"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.endStreamButtons}
                    style={{ marginBottom: "0.75rem" }}
                    onClick={handleRemoveCoHost}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.endStreamButtons}
                    onClick={() => setRemoveGuest(false)}
                  >
                    Not Now
                  </Button>
                </Grid>
              </Grid>
            </Dialog>
            {audience ? (
              <IconButton
                style={{ zIndex: 1 }}
                onClick={() => setOpenDialog(true)}
                className={classes.warningButton}
              >
                <WarningIcon className={classes.warningIcon} />
              </IconButton>
            ) : (
              <></>
            )}

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
                containaer
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
              <Grid
                container
                direction="column"
                alignItems="center"
                className={classes.blueWindow}
              >
                <Grid item container>
                  <IconButton
                    onClick={() => setBlueWindow(false)}
                    className={classes.closeButton}
                  >
                    <Close className={classes.closeIcon} />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
                  <Typography className={classes.blueWindowText}>
                    Ask your viewers to play!
                  </Typography>
                </Grid>
              </Grid>
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
        justifyContent={
          lgScreen ? (audience ? "flex-start" : "center") : "flex-start"
        }
        className={classes.utilityContainer}
      >
        {/* <ViewerBox /> */}
        {audience && <Gift />}
        {audience ? (
          <ViewerBox
            streamId={streamId}
            setCoHostId={setCoHostId}
            streamer={channelName}
          />
        ) : (
          <StreamerBox
            joinLiveLoop={loopJoin}
            endStream={handleEndStream}
            channelId={userUid}
            roleChange={roleChange}
            streamId={streamId}
            setCoHostId={setCoHostId}
          />
        )}
      </Grid>
    </Grid>
  );
};
