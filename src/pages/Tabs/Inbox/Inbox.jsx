import React, { useState, useRef, useEffect, useContext } from "react";
import { useStyles } from "./InboxStyles";
import {
  Grid,
  InputBase,
  Button,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme,
  useMediaQuery,
  Collapse,
  CircularProgress,
  Dialog,
} from "@material-ui/core";
import {
  ExpandMore,
  Mic,
  EmojiEmotionsSharp as Emoji,
  GifSharp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import image from "../../../assets/index";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import GifPicker from "react-giphy-picker";
import Audio from "../../../components/audio/Audio";
import Video from "../../../components/videoPlayer/Video";
import { getUserById } from "../../../http";
import { db, cloudStorage } from "../../../firebaseInit";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../http/socket";
import GifImage from "../../../components/GifImage/GifImage";
import VideoRecorder from "react-video-recorder";

export const Inbox = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const currentUser = useSelector((state) => state.auth.user.data);
  const { chats } = props;
  const socket = useContext(SocketContext);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [active, setActive] = useState(-1);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [showRecorder, setShowRecorder] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
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
    _id: "",
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
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [activeChat, setActiveChat] = useState({
    chatId: "",
    userId: "",
  });
  const scroll = useRef();
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0,
    },
  });
  const refOne = useRef();
  const refTwo = useRef();
  const handleOpenVideoDialog = () => {
    setOpenVideoDialog(true);
  };
  const onEmojiClick = (e, emoji) => {
    setMessage(message + emoji.emoji);
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleOne = () => {
    setOne(!one);
    setTwo(false);
    refTwo.current.classList.remove(`${classes.rotate}`);
    refOne.current.classList.toggle(`${classes.rotate}`);
  };
  const handleTwo = () => {
    setTwo(!two);
    setOne(false);
    refOne.current.classList.remove(`${classes.rotate}`);
    refTwo.current.classList.toggle(`${classes.rotate}`);
  };
  const handleChatClick = (index, chatId, uId) => {
    setActive(index);
    setActiveChat({
      chatId: chatId,
      userId: uId,
    });
    setChat([]);
    setUser({
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
      _id: "",
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
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };

  const handleVideoUpload = async () => {
    const { chatId, userId } = activeChat;
    const docId = new Date(Date.now()).getTime().toString();
    let timestamp = new Date(Date.now()).toISOString();
    const docRef = cloudStorage.ref();
    const fileRef = docRef.child(`${docId}.mp4`);
    const doc = {
      content: "pending",
      filename: `${timestamp}.mp4`,
      idFrom: currentUser._id,
      idTo: userId,
      thumb: 0,
      timestamp: timestamp,
      type: 1,
    };
    setOpenVideoDialog(false);
    const ref = db
      .collection("messages")
      .doc(chatId)
      .collection(chatId)
      .doc(docId.toString());
    ref.set(doc);
    setShowRecorder(false);
    await fileRef.put(recordedVideo);
    setRecordedVideo(null);
    const downloadURL = await fileRef.getDownloadURL();
    ref.update({ content: downloadURL });
    socket.emit("lastmessage", {
      msg: "📹",
      chatId: chatId,
      userId: currentUser._id,
      firstMsg: chat.length === 0 ? currentUser._id : userId,
      lastmsgTime: timestamp,
    });
  };

  const handleAudioUpload = async (file) => {
    const { chatId, userId } = activeChat;
    const docId = new Date(Date.now()).getTime().toString();
    let timestamp = new Date(Date.now()).toISOString();
    const docRef = cloudStorage.ref();
    const fileRef = docRef.child(`${docId}.acc`);
    const doc = {
      content: "pending",
      filename: `${timestamp}.acc`,
      idFrom: currentUser._id,
      idTo: userId,
      thumb: 0,
      timestamp: timestamp,
      type: 2,
    };
    const ref = db
      .collection("messages")
      .doc(chatId)
      .collection(chatId)
      .doc(docId.toString());
    ref.set(doc);
    setShowRecorder(false);
    await fileRef.put(file);
    const downloadURL = await fileRef.getDownloadURL();
    ref.update({ content: downloadURL });
    socket.emit("lastmessage", {
      msg: "🎤",
      chatId: chatId,
      userId: currentUser._id,
      firstMsg: chat.length === 0 ? currentUser._id : userId,
      lastmsgTime: timestamp,
    });
  };

  const handleCountDown = (data) => {
    // console.log(data);
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setAudioDetails(reset);
  };

  const handleSendMessage = () => {
    const { chatId, userId } = activeChat;
    // const date = new Date();
    const docId = new Date(Date.now()).getTime().toString();
    let timestamp = new Date(Date.now()).toISOString();
    const doc = {
      content: message,
      filename: "",
      idFrom: currentUser._id,
      idTo: userId,
      thumb: 0,
      timestamp: timestamp,
      type: 0,
    };
    db.collection("messages")
      .doc(chatId)
      .collection(chatId)
      .doc(docId)
      .set(doc);
    setMessage("");
    setShowEmoji(false);
    socket.emit("lastmessage", {
      msg: message,
      chatId: chatId,
      userId: currentUser._id,
      firstMsg: chat.length === 0 ? currentUser._id : userId,
      lastmsgTime: timestamp,
    });
  };

  const handleGif = (gif) => {
    const { chatId, userId } = activeChat;
    const docId = new Date(Date.now()).getTime().toString();
    let timestamp = new Date(Date.now()).toISOString();
    const doc = {
      content: gif.original.webp,
      filename: "",
      idFrom: currentUser._id,
      idTo: userId,
      thumb: 0,
      timestamp: timestamp,
      type: 3,
    };
    db.collection("messages")
      .doc(chatId)
      .collection(chatId)
      .doc(docId.toString())
      .set(doc);
    socket.emit("lastmessage", {
      msg: "🖼",
      chatId: chatId,
      userId: currentUser._id,
      firstMsg: chat.length === 0 ? currentUser._id : userId,
      lastmsgTime: timestamp,
    });
    setMessage("");
    setShowGif(false);
  };

  useEffect(() => {
    const { chatId, userId } = activeChat;
    if (chatId !== "" && userId !== "") {
      socket.emit("chatStatus", {
        chatId: chatId,
        userId: currentUser._id,
        userTo: userId,
        userStatus: 1,
      });

      (async () => {
        const { data } = await getUserById(userId);
        setUser(data.data);
        db.collection("messages")
          .doc(chatId)
          .collection(chatId)
          .onSnapshot((snapshot) => {
            let messages = [];
            snapshot.docs.forEach((doc) => messages.push(doc.data()));
            setChat(messages);
            if (scroll.current)
              scroll.current.scrollIntoView({ behavior: "smooth" });
          });
      })();
    }
  }, [activeChat]);
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography className={classes.title}>Inbox</Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="stretch"
        spacing={2}
        className={classes.chatContainer}
      >
        <Grid item className={classes.left}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.inboxUserInfo}
          >
            <Grid item className={classes.userInfoContainer}>
              <Grid item className={classes.avatarContainer}>
                <Avatar className={classes.avatar} src={user.profile_image} />
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
              <Grid item container justifyContent="center">
                <Button
                  component={Link}
                  to={`/home/match/${user._id}`}
                  className={classes.viewProfileButton}
                  variant="contained"
                >
                  View Profile
                </Button>
              </Grid>
            </Grid>
            <Grid item container className={classes.collapseContainer}>
              <Grid
                onClick={handleOne}
                item
                container
                justifyContent="space-between"
              >
                <Typography className={classes.childAccordionHeading}>
                  Shared Media
                </Typography>
                <IconButton
                  className={classes.collapseButton}
                  // onClick={handleOne}
                >
                  <ExpandMore
                    ref={refOne}
                    className={classes.childAccordionIcon}
                  />
                </IconButton>
              </Grid>
              <Collapse in={one} timeout="auto" unmountOnExit>
                <Grid
                  container
                  className={classes.collapseInner}
                  direction="column"
                >
                  <Typography className={classes.accordionDetailsLink}>
                    Unmatch
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Block & Report
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Delete Chat
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Help Center
                  </Typography>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item container className={classes.collapseContainer}>
              <Grid
                item
                onClick={handleTwo}
                container
                justifyContent="space-between"
              >
                <Typography className={classes.childAccordionHeading}>
                  Support
                </Typography>
                <IconButton
                  className={classes.collapseButton}
                  // onClick={handleTwo}
                >
                  <ExpandMore
                    ref={refTwo}
                    className={classes.childAccordionIcon}
                  />
                </IconButton>
              </Grid>
              <Collapse in={two} timeout="auto" unmountOnExit>
                <Grid
                  container
                  className={classes.collapseInner}
                  direction="column"
                >
                  <Typography className={classes.accordionDetailsLink}>
                    Unmatch
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Block & Report
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Delete Chat
                  </Typography>
                  <Typography className={classes.accordionDetailsLink}>
                    Help Center
                  </Typography>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.middle}>
          <Grid container direction="column" className={classes.messageBox}>
            <Grid item container>
              <Grid style={{ width: "70%" }} item container alignItems="center">
                <Avatar
                  className={classes.chatTitleAvatar}
                  src={user.profile_image}
                />
                <h3 className={classes.chatTitle}>
                  {user.first_name} {user.last_name}
                </h3>
              </Grid>
              <Grid
                style={{ width: "30%" }}
                item
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <IconButton className={classes.callButton}>
                  <img
                    src={image.blackWatch}
                    className={classes.watchIcon}
                    alt=""
                  />
                </IconButton>
                <IconButton className={classes.callButton}>
                  <img src={image.phone} className={classes.callIcon} alt="" />
                </IconButton>
                <IconButton className={classes.callButton}>
                  <img
                    src={image.videoIcon}
                    className={classes.callIcon}
                    alt=""
                  />
                </IconButton>
              </Grid>
            </Grid>
            <div className={classes.containerDiv}>
              {chat.map(({ content, idFrom, type, timestamp }, index) => {
                let showProfile;
                if (index > 0) {
                  showProfile = chat[index - 1].idFrom !== chat[index].idFrom;
                } else {
                  showProfile = true;
                }
                if (type === 0) {
                  return (
                    <Grid
                      key={index}
                      alignItems="flex-start"
                      container
                      direction={
                        idFrom === activeChat.userId ? "row" : "row-reverse"
                      }
                      justifyContent={
                        idFrom === activeChat.userId
                          ? "flex-start"
                          : "flex-start"
                      }
                      className={classes.messageContainer}
                    >
                      {showProfile ? (
                        <Avatar
                          src={
                            idFrom === activeChat.userId
                              ? user.profile_image
                              : currentUser.profile_image
                          }
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      ) : (
                        <div
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      )}

                      <Typography
                        style={{ maxWidth: "70%" }}
                        className={
                          idFrom === activeChat.userId
                            ? classes.incomingMessage
                            : classes.outgoingMessage
                        }
                      >
                        {content}
                      </Typography>
                    </Grid>
                  );
                } else if (type === 2) {
                  return (
                    <Grid
                      key={index}
                      alignItems="flex-start"
                      container
                      direction={
                        idFrom === activeChat.userId ? "row" : "row-reverse"
                      }
                      justifyContent={
                        idFrom === activeChat.userId
                          ? "flex-start"
                          : "flex-start"
                      }
                      className={classes.messageContainer}
                    >
                      {showProfile ? (
                        <Avatar
                          src={
                            idFrom === activeChat.userId
                              ? user.profile_image
                              : currentUser.profile_image
                          }
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      ) : (
                        <div
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      )}
                      {content === "pending" ? (
                        <CircularProgress
                          color={
                            idFrom === activeChat.userId
                              ? "secondary"
                              : "primary"
                          }
                        />
                      ) : (
                        <Audio
                          src={content}
                          fromMe={idFrom === activeChat.userId ? false : true}
                        />
                      )}
                    </Grid>
                  );
                } else if (type === 1) {
                  return (
                    <Grid
                      key={index}
                      alignItems="flex-start"
                      container
                      direction={
                        idFrom === activeChat.userId ? "row" : "row-reverse"
                      }
                      justifyContent={
                        idFrom === activeChat.userId
                          ? "flex-start"
                          : "flex-start"
                      }
                      className={classes.messageContainer}
                    >
                      {showProfile ? (
                        <Avatar
                          src={
                            idFrom === activeChat.userId
                              ? user.profile_image
                              : currentUser.profile_image
                          }
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      ) : (
                        <div
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      )}
                      {content === "pending" ? (
                        <CircularProgress
                          color={
                            idFrom === activeChat.userId
                              ? "secondary"
                              : "primary"
                          }
                        />
                      ) : (
                        <Video
                          src={content}
                          fromMe={idFrom === activeChat.userId ? false : true}
                        />
                      )}
                    </Grid>
                  );
                } else if (type === 3) {
                  return (
                    <Grid
                      key={index}
                      alignItems="flex-start"
                      container
                      direction={
                        idFrom === activeChat.userId ? "row" : "row-reverse"
                      }
                      justifyContent={
                        idFrom === activeChat.userId
                          ? "flex-start"
                          : "flex-start"
                      }
                      className={classes.messageContainer}
                    >
                      {showProfile ? (
                        <Avatar
                          src={
                            idFrom === activeChat.userId
                              ? user.profile_image
                              : currentUser.profile_image
                          }
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      ) : (
                        <div
                          className={
                            idFrom === activeChat.userId
                              ? classes.messageAvatar
                              : classes.messageAvatar2
                          }
                        />
                      )}
                      <GifImage
                        src={content}
                        fromMe={idFrom === activeChat.userId ? false : true}
                      />
                    </Grid>
                  );
                }
              })}
              <div ref={scroll} />
            </div>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="space-between"
              className={classes.messageInputBox}
              style={{ paddingInline: "1rem" }}
            >
              <Grid item style={{ width: "90%", position: "relative" }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className={classes.chatInput}
                >
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setShowEmoji(!showEmoji);
                        setShowGif(false);
                      }}
                      className={classes.iconButton}
                    >
                      <Emoji className={classes.emojiIcon} />
                    </IconButton>
                  </Grid>
                  <InputBase
                    value={message}
                    onKeyUp={handleKeyUp}
                    onChange={handleMessage}
                    className={classes.inputBase}
                    placeholder="Write a message..."
                    inputProps={{ className: classes.inputProps }}
                    onFocus={() => {
                      setShowEmoji(false);
                      setShowGif(false);
                    }}
                  />

                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setShowGif(!showGif);
                        setShowEmoji(false);
                      }}
                      className={classes.iconButton}
                    >
                      <GifSharp className={classes.gifIcon} />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setShowRecorder(!showRecorder);
                        setShowEmoji(false);
                        setShowGif(false);
                      }}
                      style={{
                        marginRight: lgScreen ? "3px" : "10px",
                        marginLeft: lgScreen ? "0px" : "5px",
                      }}
                      className={classes.iconButton}
                    >
                      <Mic className={classes.icons} />
                    </IconButton>
                    <IconButton
                      onClick={handleOpenVideoDialog}
                      style={{ marginRight: "15px" }}
                      className={classes.iconButton}
                    >
                      <img
                        src={image.recordDot}
                        style={{ width: lgScreen ? "2rem" : undefined }}
                        alt=""
                      />
                    </IconButton>
                    <Dialog open={openVideoDialog} className={classes.dialog}>
                      <Grid
                        item
                        container
                        direction="column"
                        className={classes.videoRecorderContainer}
                      >
                        <div className={classes.videoDiv}>
                          <VideoRecorder
                            onRecordingComplete={(videoBlob) => {
                              setRecordedVideo(videoBlob);
                              console.log("videoBlob", videoBlob);
                            }}
                          />
                        </div>
                        <Button
                          disabled={recordedVideo === null ? true : false}
                          variant="contained"
                          color="primary"
                          onClick={handleVideoUpload}
                          className={classes.uploadButton}
                        >
                          Upload video
                        </Button>
                      </Grid>
                    </Dialog>
                  </Grid>
                </Grid>
                {showGif && (
                  <div className={classes.gifPicker}>
                    <GifPicker onSelected={handleGif} />
                  </div>
                )}
                {showRecorder && (
                  <div className={classes.recorder}>
                    <Recorder
                      record={true}
                      title={"New recording"}
                      audioURL={audioDetails.url}
                      showUIAudio
                      handleAudioStop={(data) => handleAudioStop(data)}
                      handleAudioUpload={(data) => handleAudioUpload(data)}
                      handleCountDown={(data) => handleCountDown(data)}
                      handleReset={() => handleReset()}
                      mimeTypeToUseWhenRecording={`audio/webm`}
                    />
                  </div>
                )}

                {showEmoji && (
                  <div className={classes.emojiContainer}>
                    <Picker
                      pickerStyle={{ width: "100%", height: "250px" }}
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      skinTone={SKIN_TONE_MEDIUM_DARK}
                      groupNames={{ smileys_people: "PEOPLE" }}
                      native
                    />
                  </div>
                )}
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handleSendMessage}
                  className={classes.sendButton}
                >
                  <img
                    src={image.send}
                    className={classes.sendButtonIcon}
                    alt=""
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.right}>
          <Grid container direction="column" className={classes.chats}>
            <Typography className={classes.chatsTitle}>Chats</Typography>
            <List classes={{ root: classes.list }}>
              {chats.map((chat, index) => {
                if (index === 0) {
                  return (
                    <ListItem
                      selected={active === index}
                      key={chat.chatId}
                      disableGutters
                      dense
                      alignItems="center"
                      classes={{ root: classes.listItemRoot }}
                      onClick={() =>
                        handleChatClick(index, chat.chatId, chat.matched_ids.to)
                      }
                    >
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <Avatar
                          className={classes.listImage}
                          src={chat.matched_images.to}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        classes={{ root: classes.listItemTextRoot }}
                        primary={chat.matched_username.to}
                        secondary={chat.msg}
                      />

                      <Typography className={classes.lastSeen}>
                        {chat.unreadCount}
                      </Typography>
                    </ListItem>
                  );
                } else {
                  return (
                    <ListItem
                      selected={active === index}
                      key={chat.chatId}
                      disableGutters
                      dense
                      alignItems="center"
                      classes={{ root: classes.listItemRoot }}
                      onClick={() =>
                        handleChatClick(index, chat.chatId, chat.matched_ids.to)
                      }
                    >
                      <ListItemAvatar className={classes.listItemAvatar}>
                        <Avatar
                          className={classes.listImage}
                          src={chat.matched_images.to}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        classes={{ root: classes.listItemTextRoot }}
                        primary={chat.matched_username.to}
                        secondary={chat.msg}
                      />

                      <Typography className={classes.lastSeen}>
                        {chat.unreadCount}
                      </Typography>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
