import React, { useState, useRef, useEffect } from "react";
import { useStyles } from "./streamStyles";
import AgoraRTC from "agora-rtc-sdk-ng";
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
import { Close } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { goLive, deleteLiveUser } from "../../http";

export const Stream = (props) => {
  const { audience } = props;
  const channelName = props.match.params.id;
  const user = useSelector((state) => state.auth.user.data);
  const classes = useStyles();
  const liveRef = useRef();
  // eslint-disable-next-line
  const [guestWindow, setGuestWindow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [exit, setExit] = useState(false);
  const [blueWindow, setBlueWindow] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down(1680));

  // Agora setUp

  let rtc = {
    // For the local audio and video tracks.
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };
  let options = {
    appId: "eb25ec81a8bc477ebb4673ba983ceb13",
    channel: audience ? channelName : user.username,
    role: audience ? "audience" : "host",
    token: null,
    uid: null,
  };
  let clientRoleOptions = {
    level: 1,
  };

  rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
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
  const joinLiveStream = async () => {
    rtc.client.on("user-published", handleRemote);
    rtc.client.setClientRole(options.role);
    if (options.role === "host") {
      try {
        [options.uid, rtc.localAudioTrack, rtc.localVideoTrack] =
          await Promise.all([
            rtc.client.join(
              options.appId,
              options.channel,
              options.token,
              options.uid
            ),
            AgoraRTC.createMicrophoneAudioTrack(),
            AgoraRTC.createCameraVideoTrack(),
          ]);

        rtc.localVideoTrack.play(liveRef.current);
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        const goLiveData = {
          username: user.username,
          userId: user._id,
          image: user.profile_image,
          channelId: options.uid,
          gender: getGender(),
          userStatus: user.current_status,
          location: {
            coordinates: [user.location.lon, user.location.lat],
          },
        };
        await goLive(goLiveData);
      } catch (err) {
        console.log(err.message);
      }
    } else if (options.role === "audience") {
      rtc.client.setClientRole(options.role, clientRoleOptions);
      await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
    }
  };
  const handleRemote = async (user, mediaType) => {
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack;

      remoteVideoTrack.play(liveRef.current);
    }
    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack;
      remoteAudioTrack.play();
    }
  };
  const handleHostLeft = async () => {
    try {
      if (rtc.localAudioTrack && rtc.localVideoTrack) {
        rtc.localVideoTrack.stop();
        rtc.localAudioTrack.stop();
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
      }
      await rtc.client.leave();
      const data = {
        username: user.username,
      };
      await deleteLiveUser(data);
      props.history.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    joinLiveStream();
    // eslint-disable-next-line
  }, []);
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
                <span className={classes.count}>558</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.streamContainer} ref={liveRef}>
            <IconButton
              onClick={handleHostLeft}
              className={classes.endStreamButton}
            >
              <Close className={classes.endStreamIcon} />
            </IconButton>
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
                  onClick={() => setIsStarted(true)}
                >
                  Start
                </Button>
              </div>
            )}
            {guestWindow ? (
              <div className={classes.guestBox}>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    backgroundImage: `url('image.actor')`,
                  }}
                >
                  <IconButton className={classes.closeButton}>
                    <Close className={classes.closeIcon} />
                  </IconButton>
                  {/* <img src={image.actor} alt="" /> */}
                </div>
              </div>
            ) : undefined}
            <IconButton
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
        justifyContent={lgScreen ? "center" : "flex-start"}
        className={classes.utilityContainer}
      >
        <StreamerBox />
        {/* <Gift /> */}
        {/* <ViewerBox /> */}
      </Grid>
    </Grid>
  );
};
