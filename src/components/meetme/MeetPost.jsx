import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./styles";
import { useTransition, animated } from "react-spring";
import {
  Grid,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import image from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import { useHistory } from "react-router-dom";
import { checkMatch, superLikeApi, likeVideo } from "../../http";
import InstantSpark from "../InstantSpark/InstantSpark";
import MatchDialog from "../MatchDialog/MatchDialog";
import QuickMessageDialog from "../quickMessageDialog/QuickMessageDialog";
import DateScheduler from "../dateSchedular/DateScheduler";
import { onMessage } from "../../utils/firestoreFunctions";
import { SocketContext } from "../../http/socket";
import { db } from "../../firebaseInit";

export const MeetPost = ({ allVideos, page, setPage, totalPage }) => {
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const socket = useContext(SocketContext);
  // eslint-disable-next-line
  const [openSuperDialog, setOpenSuperDialog] = useState(false);
  const isMuted = useSelector((state) => state.video.muted);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(totalPage);
  const [date, setDate] = useState(false);
  const [openMatch, setOpenMatch] = useState(false);
  const [quickMessage, setQuickMessage] = useState(false);
  const [quickMessageValue, setQuickMessageValue] = useState("");
  const [username, setUsername] = useState("");
  const [chatId, setChatId] = useState("");
  const [matchData, setMatchData] = useState({
    liked_by: "",
    liked_by_name: "",
    liked_by_profile_image: "",
    liked_to: "",
    liked_to_name: "",
    liked_to_profile_image: "",
  });
  // eslint-disable-next-line
  const [videos, setVideos] = useState(allVideos);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const transition = useTransition(animate, {
    from: { x: 450, opacity: 0 },
    enter: { x: 0, opacity: 1 },
  });
  const handleQuickMessage = () => {
    setOpenMatch(false);
    setQuickMessage(true);
  };
  const handleDate = () => {
    setOpenMatch(false);
    setDate(true);
  };
  const handleCloseButton = () => {
    if (index === videos.length - 1 && page < totalPages) {
      setPage(page + 1);
      setAnimate(!animate);
      setIndex(0);
    } else if (index === videos.length - 1 && page === totalPages) {
      return;
    } else {
      setAnimate(!animate);
      setIndex(index + 1);
    }
  };

  const handleImageClick = async (id) => {
    const { data } = await checkMatch(id);
    if (data.data) {
      history.push(`/home/match/${id}`);
    } else {
      history.push(`/home/unmatch/${id}`);
    }
  };
  const handleContinue = () => {
    if (index === videos.length - 1 && page < totalPages) {
      setPage(page + 1);
      setAnimate(!animate);
      setIndex(0);
    } else if (index === videos.length - 1 && page === totalPages) {
      return;
    } else {
      setAnimate(!animate);
      setIndex(index + 1);
    }
  };
  const handleSendMessage = () => {
    if (quickMessageValue === "") {
      return;
    } else {
      const doc = {
        content: quickMessageValue,
        filename: "",
        idFrom: matchData.liked_by,
        idTo: matchData.liked_to,
        thumb: 0,
        type: 0,
      };
      setQuickMessage(false);
      let messages = [];
      db.collection("messages")
        .doc(chatId)
        .collection(chatId)
        .onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => messages.push(doc.data()));
        });
      onMessage(
        doc,
        chatId,
        socket,
        matchData.liked_by,
        messages.length === 0 ? matchData.liked_by : matchData.liked_to
      );
      handleContinue();
    }
  };
  const handleLikeVideo = async (id) => {
    try {
      const { data } = await likeVideo({ video_id: id });
      setMatchData(data.data);
      console.log(data);
      if (data.matched) {
        setChatId(data.chatId);
        setUsername(data.data.liked_to_name);
        setOpenMatch(true);
      } else {
        if (index === videos.length - 1 && page < totalPages) {
          setPage(page + 1);
          setAnimate(!animate);
          setIndex(0);
        } else if (index === videos.length - 1 && page === totalPages) {
          return;
        } else {
          setAnimate(!animate);
          setIndex(index + 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSuperLike = async (id) => {
    try {
      const { data } = await superLikeApi({ video_id: id });
      setMatchData(data.data);
      console.log(data);
      if (data.matched) {
        setChatId(data.chatId);
        setUsername(data.data.liked_to_name);
        setOpenMatch(true);
      } else {
        if (index === videos.length - 1 && page < totalPages) {
          setPage(page + 1);
          setAnimate(!animate);
          setIndex(0);
        } else if (index === videos.length - 1 && page === totalPages) {
          return;
        } else {
          setAnimate(!animate);
          setIndex(index + 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (videos.length !== 0) setAnimate(true);
  }, [index]);
  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <Grid
                item
                container
                alignItems="flex-start"
                className={classes.postContainer}
                style={{
                  marginBottom: lgScreen ? undefined : "0.75rem",
                  height: lgScreen ? "485px" : "730px",
                }}
              >
                <Grid
                  item
                  container
                  className={classes.postAvatarContainer}
                  sm={2}
                  xs={12}
                >
                  <Grid item container style={{ padding: "0.5rem" }}>
                    <Grid item>
                      <Grid
                        item
                        container
                        direction="column"
                        alignItems="center"
                      >
                        <Avatar
                          onClick={() =>
                            handleImageClick(videos[index].user_id)
                          }
                          src={
                            videos.length !== 0
                              ? videos[index].profile_image
                              : ""
                          }
                          className={classes.postAvatar}
                        />

                        <p className={classes.postAvatarText}>
                          {videos.length !== 0 ? videos[index].user_name : ""}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  sm={10}
                  xs={12}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  item
                  direction="column"
                  className={classes.postAssetContainer}
                  style={{ paddingLeft: "4.5rem" }}
                >
                  <Grid item>
                    <h2 className={classes.postTitle}>
                      {videos.length !== 0 ? videos[index].video_title : ""}
                    </h2>
                  </Grid>
                  <Grid item>
                    <div
                      className={classes.imageContianer}
                      style={{
                        height: lgScreen ? "420px" : "667px",
                        width: lgScreen ? "295px" : "447px",
                        marginBottom: lgScreen ? "0.2rem" : "3rem",
                        borderRadius: lgScreen ? "22px" : "35px",
                        overflow: "hidden",
                      }}
                    >
                      <video
                        playsInline
                        autoPlay
                        loop
                        poster={
                          videos.length !== 0
                            ? `${process.env.REACT_APP_API_URL}/${videos[index].cover}`
                            : ""
                        }
                        muted={isMuted}
                        src={
                          videos.length !== 0
                            ? `${process.env.REACT_APP_API_URL}/${videos[index].video_url}`
                            : ""
                        }
                        className={classes.postAsset}
                      ></video>
                      <div className={classes.iconContainer}>
                        <Grid
                          container
                          className={classes.icons}
                          justifyContent="space-between"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <IconButton
                              style={{ zIndex: 2 }}
                              onClick={() => dispatch(toggleMute())}
                            >
                              <img
                                src={isMuted ? image.mute : image.unMute}
                                className={classes.muteIcon}
                                alt=""
                              />
                            </IconButton>
                          </Grid>

                          <Grid
                            container
                            justifyContent={
                              lgScreen ? "center" : "space-evenly"
                            }
                            className={classes.superIcons}
                          >
                            <Grid item>
                              <IconButton
                                onClick={handleCloseButton}
                                className={classes.superIcon}
                              >
                                <img src={image.noButton} alt="" />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  handleSuperLike(videos[index]._id)
                                }
                                // onClick={() => setOpenSuperDialog(true)}
                                className={classes.superIcon}
                              >
                                <img src={image.superLikePink} alt="" />
                              </IconButton>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  handleLikeVideo(videos[index]._id)
                                }
                                className={classes.superIcon}
                              >
                                <img src={image.dedicatedHeart} alt="" />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </animated.div>
          )
      )}
      <MatchDialog
        open={openMatch}
        setOpen={setOpenMatch}
        handleDate={handleDate}
        handleQuickMessage={handleQuickMessage}
        fromImg={matchData.liked_by_profile_image}
        toImg={matchData.liked_to_profile_image}
        onContinue={handleContinue}
      />
      <QuickMessageDialog
        open={quickMessage}
        setOpen={setQuickMessage}
        setQuickMessage={setQuickMessageValue}
        username={username}
        sendMessage={handleSendMessage}
      />
      <DateScheduler
        username={matchData.liked_to_name}
        userId={matchData.liked_to}
        open={date}
        setOpen={setDate}
        onContinue={handleContinue}
      />
      <InstantSpark
        open={openSuperDialog}
        setOpen={setOpenSuperDialog}
        onContinue={handleContinue}
      />
    </>
  );
};
