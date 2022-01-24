import React, { useState, useRef, useEffect, useContext } from "react";
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
import {
  Block,
  // ReportProblemOutlined as WarningIcon,
} from "@material-ui/icons";
import { useStyles } from "./streamStyles";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import image from "../../assets/index";
import { StreamerBox } from "../../components/ViewBox/StreamerBox";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { goLive, removeCoHost } from "../../http";
import api from "../../http";
import { SocketContext } from "../../http/socket";
import { onMessageListener, messaging } from "../../firebaseInit";
import { Battle } from "../Battle/Battle";

export const Stream = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down(1680));
  const { audience } = props;
  const channelName = audience ? props.history.location.state.username : null;
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
  const [isWaiting, setIsWaiting] = useState(false);
  const [removeGuest, setRemoveGuest] = useState(false);
  const [exit, setExit] = useState(false);
  const [blueWindow, setBlueWindow] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [members, setMembers] = useState(0);
  const [coHostUserId, setCoHostUserId] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [location, setLocation] = useState({
    lon: "",
    lat: "",
  });
  const [faceOff, setFaceOff] = useState(false);
  const [closeStream, setCloseStream] = useState(false);
  const faceoff = useRef(false);
  const battle = useRef({
    client: "",
    clientUid: null,
    host: "",
    hostUid: null,
    tag: "",
  });
  const [hostFirst, setHostFirst] = useState(false);
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
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let localTracks = {
    videoTrack: null,
    audioTrack: null,
  };

  let remoteUsers = {};
  const remoteUser = useRef();
  // Agora client options

  const ref = {
    ref1: useRef(),
    ref2: useRef(),
  };
  const rtmChannel = useRef(null);
  const faceoffChannel = useRef("");

  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: audience ? channelName : user.username,
    uid: null,
    token: null,
    accountName: null,
    role: "host",
  };

  const rtmSetup = () => {
    RTMJoin();
  };

  const join = async () => {
    client.setClientRole(options.role);
    alert(faceoffChannel.current);
    options.uid = await client.join(
      options.appId,
      faceoff.current ? faceoffChannel.current : options.channel,
      options.token || null,
      options.uid || null
    );
    setUserUid(options.uid);
    console.log("running ======> host");
    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client.on("user-unpublished", handleUserUnpublish);
    // client.on("client-role-changed", handleClientRoleChanged);
    localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    if (faceoff.current) {
      localTracks.videoTrack.play(ref.ref1.current);
    } else if (userUid === hostUid) {
      localTracks.videoTrack.play(liveRef.current);
    }

    await client.publish(Object.values(localTracks));
    console.log("Successfully Published");
  };

  const handleUserUnpublish = (user, mediaType) => {
    console.log("user unpublish");
  };
  const handleClientRoleChanged = (event) => {
    console.log("client role changed");
    console.log(event);
  };

  const leave = async () => {
    console.log("user leaving");
    console.log(localTracks);
    for (let trackName in localTracks) {
      let track = localTracks[trackName];
      console.log(track);
      if (track) {
        track.stop();
        track.close();
        localTracks[trackName] = undefined;
      }
    }
    remoteUsers = {};
    // await client.unpublish(Object.values(localTracks));
    await client.leave();
    await client.unpublish();
    console.log("Client successfuly left the channel");
    if (!faceoff.current) {
      try {
        // eslint-disable-next-line
        const res = await api.delete("/api/deleteliveuser", {
          data: {
            username: username,
          },
        });
      } catch (err) {
        console.log(err.msg);
      }
    }
  };

  const subscribe = async (user, mediaType) => {
    try {
      // eslint-disable-next-line
      const uid = user.uid;
      await client.subscribe(user, mediaType);
      console.log("Successfully Subscribes.");
      if (faceoff.current) {
        if (mediaType === "video") {
          if (uid !== battle.hostUid) {
            user.videoTrack.play(ref.ref2.current);
          } else {
            setHostFirst(true);
            user.videoTrack.play(ref.ref1.current);
          }
        }
      } else {
        if (mediaType === "video") {
          if (uid === hostUid) {
            user.videoTrack.play(liveRef.current);
          } else {
            setGuestWindow(true);
            console.log("guest user added");
            user.videoTrack.play(guest.current);
            localStorage.setItem("uid", uid);
          }
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

  // let clientRTM;
  const clientRTM = AgoraRTM.createInstance(options.appId, {
    enableLogUpload: false,
  });
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
        rtmChannel.current = clientRTM.createChannel(channelName);
        rtmChannel.current
          .join()
          .then(() => {
            console.log("AgoraRTM client channel join success");
            setIsLoggedIn(true);
            // get all members in RTM channel
            rtmChannel.current.getMembers().then((memberNames) => {
              setMembers(memberNames.length);
              rtmChannel.current.on("AttributesUpdated", (attributes) => {
                console.log("======= Logging attributes =====");
                console.log(attributes);
              });
              rtmChannel.current.on("MemberJoined", () => {
                // get all members in RTM channel
                const data = {
                  id: liveStreamId.current,
                  count: 1,
                };
                socket.emit("livestreamcount", data);
                rtmChannel.current.getMembers().then((memberNames) => {
                  setMembers(memberNames.length);
                });
              });
              rtmChannel.current.on("MemberLeft", () => {
                const data = {
                  id: liveStreamId.current,
                  count: -1,
                };
                socket.emit("livestreamcount", data);
                rtmChannel.current.getMembers().then((memberNames) => {
                  setMembers(memberNames.length);
                });
              });
            });
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  const roleChange = async (data) => {
    if (data.type === "0") {
      leave();
      options.role = "host";
      join();
    } else if (data.type === "1") {
      console.log("Notification====> changing role to audience");
      leave();
      options.role = "audience";
      join();
    }
  };
  const handleRemoveCoHost = async () => {
    try {
      const apiData = {
        userId: coHostUserId,
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
    props.history.replace("/liveloop");
  };
  // eslint-disable-next-line
  const startLiveLoop = async () => {};
  useEffect(() => {
    join();
    rtmSetup();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lon: pos.coords.longitude, lat: pos.coords.latitude });
      });
    }
    return () => {
      (async () => {
        options.role = "audience";
        await leave();
        RTMLeave();
      })();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      console.log("running", data);
      if (data.topic === `${user._id}_joinlive`) {
        // console.log(data);
        roleChange(data);
      } else if (data.topic === "delliveuser") {
        props.history.goBack();
      }
    });
  });
  useEffect(() => {
    messaging.onMessage((payload) => {
      const { data } = payload;
      if (data.topic === `${user._id}_faceoff`) {
        const faceoffData = JSON.parse(data.data);
        console.log("faceoff data", faceoffData);
        faceoffChannel.current = faceoffData.channelId;
        battle.current = {
          client: faceoffData.client,
          clientUid: faceoffData.clientUid,
          clientUserId: faceoffData.clientUserId,
          host: faceoffData.host,
          hostUid: faceoffData.hostUid,
          hostUserId: faceoffData.hostUserId,
          tag: `#${faceoffData.tag}`,
        };
        faceoff.current = true;
        setFaceOff(true);
        leave();
        join();
        // props.history.push({
        //   pathname: "/faceoff",
        //   state: {
        //     // rtm: clientRTM,
        //     id: "12233",
        //   },
        // });
      }
    });
  });
  return (
    <>
      {faceOff ? (
        <Battle ref={ref} battle={battle} hostFirst={hostFirst} />
      ) : (
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
                  onClick={() => setCloseStream(true)}
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
                {isStarted ? undefined : (
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
                      You will be able to see the user's video once it is your
                      turn
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
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
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
              endStream={handleEndStream}
              channelId={userUid}
              roleChange={roleChange}
              streamId={streamId}
              setCoHostUserId={setCoHostUserId}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
