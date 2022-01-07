import React, { useState, useEffect, useRef, useContext } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  Grid,
  InputBase,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  IconButton,
  Slider,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import image from "../../../assets/index";
import { Video } from "../../../components/video/Video";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../http/socket";
import DatePicker from "../../../components/datePicker/DatePicker";
import {
  getUserById,
  visitedUser,
  otherUserVideos,
  likeVideo,
  getMatchById,
} from "../../../http";
import axios from "axios";
import QuickMessage from "../../../components/quickMessage/QuickMessage";
import { db } from "../../../firebaseInit";

export const ProfileMatched = (props) => {
  const id = props.match.params.id;
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const socket = useContext(SocketContext);
  const [user, setUser] = useState({
    phonenumber: "",
    socialMedia_id: "",
    step: "/dob",
    date_of_birth: { dob: "", age: 0 },
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    identify: { gender: "", visible: false },
    date_preference: { interested_gender: "", interested_audience: "" },
    height: { height: 0.0, visible: false },
    body_type: { type: "", visible: false },
    ethnicity: {
      country_list: [],
      c_visible: false,
      race: "",
      r_visible: false,
    },
    location: { lat: "", lon: "", geoHash: "", visible: false },
    home_town: {
      live_with: "",
      home_town: "",
      live_with_visible: false,
      visible: false,
    },
    education: {
      school: "",
      s_visible: false,
      degree: "",
      d_visible: false,
    },
    profession: {
      company: { company: "", c_visible: false },
      job_title: { job_title: "", j_visible: false },
      occupation: { occupation: "", o_visible: false },
    },
    religion: { religion: "", visible: false },
    vices: {
      drink: { drink: "", d_visible: false },
      smoke: { smoke: "", s_visible: false },
      weed: { weed: "", w_visible: false },
      drugs: { drugs: "", dr_visible: false },
    },
    profile_image: "",
    children: { have_children: "", want_children: "", visible: false },
    prompt: [{ question: "", url: "" }],
  });
  const [tab, setTab] = useState(4);
  const currentUser = useSelector((state) => state.auth.user.data);
  const [quickMessage, setQuickMessage] = useState(false);
  const [quickMessageValue, setQuickMessageValue] = useState("");
  const [videos, setVideos] = useState([]);
  const [chatId, setChatId] = useState("");
  const [sliderValue, setSliderValue] = useState([11, 23]);
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState({
    month: null,
    day: null,
    year: null,
  });
  const videosRef = useRef([]);
  videosRef.current = [];
  // eslint-disable-next-line
  const handleTime = (event, time) => {
    setSliderValue(time);
  };
  const handleValueLabel = (value) => {
    let x = value;
    if (x > 12) {
      x = x - 12;
      return `${x}pm`;
    } else if (x === 12) {
      return `${x}pm`;
    } else {
      return `${x}am`;
    }
  };
  const handleLike = async (id) => {
    // eslint-disable-next-line
    const { data } = await likeVideo(id);
  };
  const handleSelectQuickMessage = (e) => {
    setQuickMessageValue(e.target.value);
  };
  const handleSendQuickMessage = () => {
    const docId = new Date(Date.now()).getTime().toString();
    let timestamp = new Date(Date.now()).toISOString();
    const doc = {
      content: quickMessageValue,
      filename: "",
      idFrom: currentUser._id,
      idTo: user._id,
      thumb: 0,
      timestamp: timestamp,
      type: 0,
    };
    let messages = [];
    setQuickMessageValue("");
    db.collection("messages")
      .doc(chatId)
      .collection(chatId)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => messages.push(doc.data()));
      });
    db.collection("messages")
      .doc(chatId)
      .collection(chatId)
      .doc(docId.toString())
      .set(doc);

    socket.emit("lastmessage", {
      msg: quickMessageValue,
      chatId: chatId,
      userId: currentUser._id,
      firstMsg: messages.length === 0 ? currentUser._id : user._id,
      lastmsgTime: timestamp,
    });
  };
  const handleTab = (e, tab) => {
    setTab(tab);
  };
  const toFeet = (cm) => {
    const realFeets = (cm * 0.3937) / 12;
    let feets = Math.floor(realFeets);
    let inches = Math.round((realFeets - feets) * 12);
    if (inches === 12) {
      feets = feets + 1;
      inches = 0;
    }
    return `${feets}'${inches}"`;
  };
  const username = user.username;
  const quickMessageList = [
    `Hi ${username}, how are you?🖐`,
    `Hey there! Any luck meeting someone off of Intro yet?`,
    `How it is going ${username}?`,
    `Hey ${username}? How is your night going?`,
    `Hi ${username}? How is your day going?`,
    `Hi ${username}! Any fun plans coming up?`,
    `Hi ${username}, hope you've having a nice day?`,
    `How are you doing ${username} ?`,
  ];
  const handleScroll = () => {
    const boundry = {
      top: {
        upper: lgScreen ? -147 : -370,
        lower: lgScreen ? 382 : 530,
      },
      bottom: {
        upper: lgScreen ? 385 : 540,
        lower: lgScreen ? 912 : 1441,
      },
    };
    // eslint-disable-next-line
    videosRef.current.map((item) => {
      const top = item.getBoundingClientRect().top;
      const bottom = item.getBoundingClientRect().bottom;
      if (
        top > boundry.top.upper &&
        top < boundry.top.lower &&
        bottom > boundry.bottom.upper &&
        bottom < boundry.bottom.lower
      ) {
        if (item.readyState >= 2) {
          item.play();
        }
        // console.log(video.readyState);
      } else {
        item.pause();
      }
    });
  };
  const addToRef = (e) => {
    if (e && !videosRef.current.includes(e) && !null) videosRef.current.push(e);
  };
  useEffect(() => {
    (async function () {
      await axios
        .all([
          getUserById(id),
          visitedUser(id),
          otherUserVideos(id),
          getMatchById(id),
        ])
        .then(
          axios.spread((res1, res2, res3, res4) => {
            setUser(res1.data.data);
            setVideos(res3.data.data);
            setChatId(res4.data.data.chatId);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    })();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (videosRef.current.length > 0) {
      videosRef.current[0].play();
    }
  });
  useEffect(() => {
    const currentDate = new Date(Date.now());
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    if (month === date.month && day === date.day && year === date.year) {
      const startHour = currentDate.getHours();
      setSliderValue([startHour + 1, startHour + 2]);
    } else setSliderValue([8, 22]);
  }, [date]);
  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        className={classes.left}
      >
        <Grid item className={classes.userInfo}>
          <Grid container direction="column" spacing={2}>
            <Grid item className={classes.avatarContainer}>
              <Avatar className={classes.avatar} src={user.profile_image} />
              <Typography className={classes.anchor}>
                @{user.username}
              </Typography>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography className={classes.userName}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography className={classes.userAge}>
                  {user.date_of_birth.age}
                </Typography>
              </div>
              <Typography className={classes.userCity}>New York</Typography>
              <Typography className={classes.subtitle}>2 mi</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          className={classes.tagsConainer}
        >
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>
              {toFeet(user.height.height)}
            </Typography>
            <Typography className={classes.tags}>
              {user.religion.religion}
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Typography className={classes.tags}>
              {user.vices.smoke.smoke}
            </Typography>
            <Typography className={classes.tags}>
              {user.education.degree}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.seeMore}>See more</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        className={classes.middle}
      >
        <Grid
          item
          container
          onScroll={handleScroll}
          className={classes.scrollDiv}
        >
          {videos.map((video, index) => (
            <Video
              key={index}
              video_url={video.video_url}
              like={video.like}
              video_title={video.video_title}
              ref={addToRef}
              video_id={video._id}
              match={true}
              cover={video.cover}
              superLike={video.superLike}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item container direction="column" className={classes.right}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          className={classes.messageBoxContainer}
        >
          <Typography className={classes.messageBoxTitle}>
            Quick Message
          </Typography>
          <Grid item container>
            <Typography className={classes.message}>
              To send a personalized message, subscribe to our premium services
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-between"
            className={classes.input}
          >
            <Grid item style={{ flexGrow: 1 }}>
              <InputBase
                className={classes.inputBase}
                placeholder="Select a Message"
                inputProps={{ className: classes.inputEl }}
                value={quickMessageValue}
                onClick={() => setQuickMessage(true)}
              />
            </Grid>
            <Grid
              item
              style={{ cursor: "pointer" }}
              onClick={handleSendQuickMessage}
            >
              <img
                className={classes.sendIcon}
                src={image.blueSendButton}
                alt=""
              />
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          // scroll="body"
          className={classes.quickMessageDialog}
          open={quickMessage}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.quickMessageDialogContent}
          >
            <Grid item>
              <Typography className={classes.quickMessageTitle}>
                Quick Message
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              wrap="nowrap"
              className={classes.quickMessageContainer}
            >
              {quickMessageList.map((item, index) => (
                <QuickMessage
                  label={item}
                  name="origin"
                  id={index}
                  key={index}
                  value={item}
                  handleShow={handleSelectQuickMessage}
                />
              ))}
            </Grid>
            <Grid item>
              <Button
                className={classes.quickMessageButton}
                variant="contained"
                color="primary"
                onClick={() => setQuickMessage(false)}
              >
                Select
              </Button>
            </Grid>
          </Grid>
        </Dialog>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          className={classes.dateDialog}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.dateDialogContainer}
          >
            <Grid item container>
              <Grid item container justifyContent="space-between">
                <Grid item>
                  <Typography className={classes.dateDialogTitle}>
                    Date Scheduler
                    <img
                      src={image.dotedwatchblue}
                      className={classes.watchblue}
                      alt=""
                    />
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => setOpenDialog(false)}
                    className={classes.closeButton}
                  >
                    <Close className={classes.closeIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              className={classes.innerContainer}
            >
              <Grid item>
                <Typography className={classes.availableText}>
                  I am available
                </Typography>
              </Grid>
              <Grid item container className={classes.datePicker}>
                <DatePicker setDate={setDate} />
              </Grid>
              <Grid item container>
                <Slider
                  onChange={handleTime}
                  value={sliderValue}
                  defaultValue={[11, 23]}
                  min={1}
                  max={24}
                  valueLabelDisplay="on"
                  classes={{ root: classes.sliderRoot }}
                  valueLabelFormat={handleValueLabel}
                />
              </Grid>

              <Grid
                item
                container
                justifyContent="space-between"
                className={classes.dialogIconContainer}
              >
                <Tabs onChange={handleTab} value={tab} className={classes.tabs}>
                  <Tab
                    disableRipple
                    className={classes.tab}
                    icon={
                      <img
                        src={image.phoneBlue}
                        className={classes.iconImage1}
                        alt=""
                      />
                    }
                  />
                  <Tab
                    disableRipple
                    className={classes.tab}
                    icon={
                      <img
                        src={image.videoBlue}
                        className={classes.iconImage1}
                        alt=""
                      />
                    }
                  />
                  <Tab
                    disableRipple
                    className={classes.tab}
                    icon={
                      <img
                        src={image.message}
                        className={classes.iconImage1}
                        alt=""
                      />
                    }
                  />
                </Tabs>
                {/* <Grid item>
                  <img
                    src={image.phoneBlue}
                    className={classes.iconImage1}
                    alt=""
                  />
                </Grid>
                <Grid item>
                  <img
                    src={image.videoBlue}
                    className={classes.iconImage}
                    alt=""
                  />
                </Grid>
                <Grid item>
                  <img
                    src={image.message}
                    className={classes.iconImage1}
                    alt=""
                  />
                </Grid> */}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.continueButton}
                  onClick={() => setOpenDialog(false)}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Grid item>
          <Button
            onClick={() => setOpenDialog(true)}
            className={classes.dateButton}
            startIcon={
              <img
                className={classes.dotedwatch}
                src={image.dotedwatch}
                alt=""
              />
            }
            variant="contained"
            endIcon={
              <img
                style={{ visibility: "hidden" }}
                src={image.stopwatch}
                alt=""
              />
            }
          >
            Date Scheduler
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "0rem 3rem",
  },
  left: {
    width: "29.62%",
    boxSizing: "border-box",
    paddingTop: "4rem",
    paddingInline: "2.5rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
      width: "40%",
    },
  },
  middle: {
    width: "39.23%",
    backgroundColor: "#fbfbfb",
    boxSizing: "border-box",
    border: "1px solid rgba(112, 112, 112, 0.17)",
  },
  right: {
    width: "31.15%",
    boxSizing: "border-box",
    padding: "3rem",
    paddingTop: "4rem",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "1.5rem",
      paddingTop: "1.5rem",
    },
  },
  userName: {
    fontSize: "29px",
    fontWeight: 700,
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  userCity: {
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: 0,
    margin: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },
  userAge: {
    fontSize: "29px",
    marginBottom: "0",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: 0,
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },
  avatar: {
    height: "202px",
    width: "202px",
    marginInline: "auto",
    [theme.breakpoints.down("lg")]: {
      height: "150px",
      width: "150px",
    },
    [theme.breakpoints.down("md")]: {
      height: "120px",
      width: "120px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100px",
      width: "100px",
    },
  },
  anchor: {
    fontSize: "20px",
    color: theme.palette.primary.main,
    margin: 0,
    fontWeight: 700,
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0.5rem",
      fontSize: "15px",
    },
  },
  userInfo: {
    width: "100%",
    padding: "0 2.5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 1.5rem",
    },
  },
  tagsConainer: {
    backgroundColor: "#fbfbfb",
    width: "100%",
    boxShadow: theme.shadows[3],
    borderRadius: "30px",
    marginTop: "1.5rem",
    boxSizing: "border-box",
    paddingInline: "1rem",
    paddingTop: "3rem",
    height: "226px",
    [theme.breakpoints.down("lg")]: {
      paddingTop: "1.5rem",
      height: "140px",
      marginTop: "0.75rem",
    },
    [theme.breakpoints.down("md")]: {
      height: "140px",
      marginTop: "0.75rem",
    },
  },
  tags: {
    backgroundColor: theme.palette.primary.main,
    width: "155px",
    height: "52px",
    lineHeight: "52px",
    borderRadius: "26px",
    fontSize: "22px",
    fontWeight: "500",
    margin: 0,
    marginBottom: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      width: "100px",
      height: "30px",
      lineHeight: "30px",
      fontSize: "12px",
      borderRadius: "22px",
    },
    [theme.breakpoints.down("md")]: {
      width: "90px",
      borderRadius: "18px",
    },
  },
  seeMore: {
    color: "#000",
    margin: "0",
    textDecoration: "underline",
    fontSize: "22px",
    marginTop: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  messageBoxContainer: {
    width: "100%",
    backgroundColor: "#fbfbfb",
    height: "570px",
    borderRadius: "26px 26px 33px 33px",
    padding: "1rem",
    boxSizing: "border-box",
    boxShadow: theme.shadows[3],
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      height: "320px",
    },
    [theme.breakpoints.down("md")]: {
      height: "280px",
    },
  },
  messageBoxTitle: {
    color: "#000",
    margin: "1rem 0",
    fontSize: "27px",
    [theme.breakpoints.down("lg")]: {
      margin: "0.5rem",
      fontSize: "18px",
    },
  },
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "33px",
    height: "71px",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: `1px 1px 5px ${theme.palette.primary.main}`,
    backgroundColor: "#fff",
    [theme.breakpoints.down("lg")]: {
      height: "45px",
    },
  },
  inputBase: {
    margin: "auto 0",
    marginLeft: "31px",
    fontSize: "21px",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      marginLeft: "20px",
    },
  },
  inputEl: {
    "&::placeholder": {
      color: "#000",
      opacity: 1,
    },
  },
  sendIcon: {
    marginRight: "15px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "25px",
    },
  },
  message: {
    fontSize: "16px",
    backgroundColor: "rgba(254, 133, 140, 0.13)",
    color: "#000",
    padding: "1rem",
    paddingRight: "3rem",
    paddingBottom: "5rem",
    borderRadius: "22px 22px 22px 0px",
    marginRight: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "9px",
      marginRight: "1.5rem",
      paddingRight: "2rem",
      paddingBottom: "3rem",
    },
  },
  dateButton: {
    width: "100%",
    marginTop: "2rem",
    borderRadius: "29px",
    textTransform: "none",
    fontSize: "22px",
    color: "#fff",
    backgroundColor: theme.palette.common.darkPink,
    height: "57px",
    "&:first-child": {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
    },
    [theme.breakpoints.down(1400)]: {
      fontSize: "16px",
      height: "45px",
      marginTop: "1rem",
    },
  },
  dotedwatch: {
    [theme.breakpoints.down(1400)]: {
      width: "1.5rem",
    },
  },
  scrollDiv: {
    height: "880px",
    padding: "2rem",
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
      height: "580px",
    },
  },
  quickMessageDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  quickMessageDialogContent: {
    paddingBlock: "23px",
    height: "570px",
    width: "410px",
    boxSizing: "border-box",
  },
  quickMessageTitle: {
    margin: "0",
    color: "#000000",
    fontSize: "27px",
    fontWeight: "600",
    marginBottom: "16px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  quickMessageContainer: {
    // backgroundColor: "red",
    paddingInline: "45px",
    maxHeight: "340px",
    overflowY: "scroll",
    // height: "340px",
    // overflowY: "auto",
    // paddingInline: "45px",
    // [theme.breakpoints.down(1680)]: {
    //   paddingInline: "0.75rem",
    // },
  },
  quickMessageButton: {
    width: "275px",
    height: "46px",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: "29px",
    marginTop: "5rem",
    [theme.breakpoints.down(1680)]: {
      width: "220px",
      height: "36px",
      fontSize: "13px",
    },
  },
  dateDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "39px",
    },
  },
  dateDialogContainer: {
    padding: "2rem",
    width: "600px",
    [theme.breakpoints.down("lg")]: {
      width: "480px",
    },
    backgroundColor: theme.palette.common.lightPink,
  },
  dateDialogTitle: {
    margin: 0,
    color: theme.palette.primary.main,
    fontSize: "22px",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
    },
  },
  watchblue: {
    marginLeft: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "1.25rem",
      marginLeft: "1.5rem",
    },
  },
  closeButton: {
    height: "30px",
    width: "30px",
    [theme.breakpoints.down("lg")]: {
      height: "20px",
      width: "20px",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  closeIcon: {
    fontSize: "2.5rem",
    color: "#ACACAC",
    [theme.breakpoints.down("lg")]: {
      fontSize: "2rem",
    },
  },
  availableText: {
    margin: 0,
    color: "#000",
    fontSize: "22px",
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginTop: "1.5rem",
    },
  },
  sliderRoot: {
    color: theme.palette.primary.main,
    height: "2px",
    width: "80%",
    marginInline: "auto",
    marginTop: "1rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0rem",
      width: "100%",
    },
    "& .MuiSlider-thumb": {
      height: "17px",
      width: "17px",
      backgroundColor: "#fff",
      boxShadow: theme.shadows[3],
      marginTop: "-8.5px",
      marginLeft: "-8.5px",
    },
    "& 	.MuiSlider-valueLabel": {
      // left: "calc(-50% + 12px)",
      left: "-50%",
      top: "-18px",
      "& *": {
        background: "transparent",
        color: "#000",
        fontSize: "13px",
      },
    },
  },
  continueButton: {
    width: "369px",
    height: "57px",
    borderRadius: "29px",
    textTransform: "none",
    fontSize: "16px",
    // marginTop: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
      height: "45px",
      fontSize: "13px",
    },
  },
  dialogIconContainer: {
    margin: "3rem 0",
    [theme.breakpoints.down("lg")]: {
      margin: "2rem 0",
    },
  },
  dialogIcon: {
    [theme.breakpoints.down("lg")]: {
      height: "1.8rem",
    },
  },
  text: {
    fontSize: "12px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "10px",
    },
  },

  dateRoot: {
    marginTop: "2rem",
    "& .MuiInput-underline::before": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  innerContainer: {
    padding: "0rem 3rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
    },
  },
  iconImage: {
    [theme.breakpoints.down("lg")]: {
      width: "3.4rem",
    },
  },
  iconImage1: {
    [theme.breakpoints.down("lg")]: {
      width: "2.5rem",
    },
  },
  datePicker: {
    marginBlock: "30px",
    [theme.breakpoints.down("lg")]: {
      marginBlock: "15px",
    },
  },
  tabs: {
    width: "90%",
    marginInline: "auto",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
  },
  tab: {
    minWidth: "0",
    opacity: "0.5",
    "&.Mui-selected": {},
  },
}));
