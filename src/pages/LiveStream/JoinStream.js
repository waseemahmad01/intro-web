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
import {
  Block,
  ReportProblemOutlined as WarningIcon,
} from "@material-ui/icons";
import { useStyles } from "./streamStyles";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import image from "../../assets/index";
import { ViewerBox } from "../../components/ViewBox/ViewerBox";
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { removeCoHost } from "../../http";
import { SocketContext } from "../../http/socket";
import { Gift } from "../../components/Gift/Gift";
import { onMessageListener } from "../../firebaseInit";
import { Battle } from "../Battle/Battle";

const JoinStream = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const channelName = props.history.location.state.username;
  const streamId = props.history.location.state.id;
  const hostUid = props.history.location.state.hostUid;
  const user = useSelector((state) => state.auth.user.data);
  //   const username = user.username;
  const liveRef = useRef();
  const guest = useRef();
  const liveStreamId = useRef(streamId);
  const coHostRef = useRef();
  const socket = useContext(SocketContext);
  const [guestWindow, setGuestWindow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [removeGuest, setRemoveGuest] = useState(false);
  const [members, setMembers] = useState(0);
  const [coHostUserId, setCoHostUserId] = useState("");
  const [userUid, setUserUid] = useState(null);
  const [closeStream, setCloseStream] = useState(false);
  const faceOffData = useRef({
    host: "",
    client: "",
    hostUid: "",
    clientUid: "",
    channelId: "",
    tag: "",
  });
  const [faceoff, setFaceoff] = useState(false);
  const faceoffChannel = useRef("");
  // Agora setUp
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ref = {
    ref1: useRef(),
    ref2: useRef(),
  };
  var localTracks = useRef({
    videoTrack: null,
    audioTrack: null,
  });

  let remoteUsers = {};
  //   const remoteUser = useRef();
  const options = {
    appId: process.env.REACT_APP_AGORA_APPID,
    channel: channelName,
    uid: null,
    token: null,
    accountName: null,
    role: "audience",
  };

  let client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

  const join = async () => {
    client.setClientRole(options.role);
    options.uid = await client.join(
      options.appId,
      faceoffChannel.current ? faceoffChannel.current : options.channel,
      options.token || null,
      options.uid || null
    );
    setUserUid(options.uid);
    if (options.role === "host") {
      localTracks.current.audioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      localTracks.current.videoTrack = await AgoraRTC.createCameraVideoTrack();
      await client.publish(Object.values(localTracks.current));
      console.log("Successfully Published");
    }
    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client.on("connection-state-change", (currState, revState, reason) => {
      console.log("connection-state-change");
      console.log(currState, revState, reason);
      // alert("connection-state-change");
    });
  };

  const leave = async () => {
    console.log("user leaving");
    console.log(localTracks.current);
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
    if (
      localTracks.current.audioTrack !== null &&
      localTracks.current.videoTrack !== null
    ) {
      client
        .unpublish()
        .then((data) => console.log(data, "unpublish success"))
        .catch((err) => console.log(err.message));
    }
    await client.leave();
    console.log("Client successfuly left the channel");
  };

  const RTMJoin = async () => {
    clientRTM
      .login({
        uid: user._id,
      })
      .then(() => {
        console.log("AgoraRTM client login success. username : " + user._id);
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
              channel.on("AttributesUpdated", (attributes) => {
                console.log("======= Logging attributes =====");
                console.log(attributes);
              });

              channel.on("MemberJoined", () => {
                // get all members in RTM channel
                const data = {
                  id: liveStreamId.current,
                  count: 1,
                };
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
                socket.emit("livestreamcount", data);
                channel.getMembers().then((memberNames) => {
                  setMembers(memberNames.length);
                });
              });
              channel.on("ChannelMessage", (msg, id) => {
                console.log(msg.text);
                if (msg.text === "introStartBattle090078601introStartBattle") {
                } else if (
                  msg.text.indexOf(
                    "introStartBattleSwitch090078601introStartBattleSwitch_"
                  ) > -1
                ) {
                  // console.log(msg.text.split("_")[1]);
                  const [first, ...rest] = msg.text.split("_");
                  const remainder = rest.join("_");
                  console.log(remainder);
                  const battleData = JSON.parse(remainder);
                  faceOffData.current = battleData;
                  faceoffChannel.current = battleData.channelId;
                  leave().then(() => {
                    setFaceoff(true);
                    join();
                  });
                }
              });
            });
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  const subscribe = async (user, mediaType) => {
    try {
      const uid = user.uid;
      await client.subscribe(user, mediaType);
      console.log("Successfully Subscribes.");
      if (faceoffChannel.current) {
        if (mediaType === "video") {
          console.log("uid", uid, faceOffData.current.hostUid);
          if (uid !== faceOffData.current.hostUid) {
            console.log(ref.ref2);
            user.videoTrack.play(ref.ref2.current);
          } else {
            console.log(ref.ref1);
            user.videoTrack.play(ref.ref1.current);
          }
        }
      } else {
        if (mediaType === "video") {
          if (uid === hostUid) {
            user.videoTrack.play(liveRef.current);
          } else if (!coHostRef.current) {
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
    console.log("Id compare => ", options.uid, user.uid);
    if (options.uid == user.uid) {
      // console.log("alert");
      clientRTM.addOrUpdateChannelAttributes(
        channelName,
        { channel: String(userUid) },
        true
      );
    }
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  };

  const handleUserLeft = (user) => {
    // console.log("client role changed");
    // alert("user-left");
    const id = user.uid;
    const uid = localStorage.getItem("uid");
    if (user.uid == uid) {
      setGuestWindow(false);
    }
    delete remoteUsers[id];
    // removePlayer();
  };

  const handleClientRoleChanged = (e) => {
    console.log("client role changed");
    console.log(e);
  };

  const roleChange = async (data) => {
    if (data.type === "0") {
      leave();
      options.role = "host";
      join();
    } else if (data.type === "1") {
      console.log("Notification====> changing role to audience");
      client.setClientRole("audience");
      clientRTM.addOrUpdateChannelAttributes(
        channelName,
        { channel: "0" },
        true
      );
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

  const rtmSetup = () => {
    RTMJoin();
  };

  // let clientRTM;
  const clientRTM = AgoraRTM.createInstance(options.appId, {
    enableLogUpload: false,
  });
  let channel;

  const RTMLeave = async () => {
    await clientRTM.logout();
    console.log("Client logged out of RTM");
  };
  useEffect(() => {
    join();
    rtmSetup();
    return () => {
      (async () => {
        // options.role = "audience";
        await leave();
        RTMLeave();
        // window.location.reload();
      })();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      if (data.topic === `${user._id}_joinlive`) {
        console.log(data);
        roleChange(data);
      } else if (data.topic === "delliveuser") {
        props.history.goBack();
      }
    });
  });
  return (
    <>
      {faceoff ? (
        <Battle ref={ref} battle={faceOffData} />
      ) : (
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
        >
          <Grid item container direction="column" className={classes.left}>
            <Grid item>
              <Typography className={classes.username} variant="h4">
                {channelName}
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
                {/* {!audience && (
            <IconButton
              onClick={() => setCloseStream(true)}
              className={classes.endStreamButton}
            >
              <Close className={classes.endStreamIcon} />
            </IconButton>
          )} */}
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
                      {options.uid === hostUid && (
                        <IconButton
                          onClick={() => setRemoveGuest(true)}
                          className={classes.closeButton}
                        >
                          <Close className={classes.closeIcon} />
                        </IconButton>
                      )}

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
                <IconButton
                  style={{ zIndex: 1 }}
                  onClick={() => setOpenDialog(true)}
                  className={classes.warningButton}
                >
                  <WarningIcon className={classes.warningIcon} />
                </IconButton>
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
              </div>
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              className={classes.warningContainer}
            >
              <>
                <Block className={classes.block} />
                <Typography className={classes.warning} variant="h4">
                  Don’t stream nudity or obscene/violent behavior. ever stream
                  while driving or under unsafe conditions.
                </Typography>
              </>
            </Grid>
          </Grid>
          <Grid
            item
            container
            alignItems={smScreen ? undefined : "flex-end"}
            justifyContent={"flex-start"}
            className={classes.utilityContainer}
          >
            <Gift />
            <ViewerBox
              streamId={streamId}
              coHostRef={coHostRef}
              streamer={channelName}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default JoinStream;
