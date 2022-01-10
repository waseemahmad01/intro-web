import React, { useState, useContext } from "react";
import { makeStyles, Grid, Typography, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import image from "../../assets";
import { likeVideo, superLikeApi } from "../../http";
import { db } from "../../firebaseInit";
import { SocketContext } from "../../http/socket";
import MatchDialog from "../MatchDialog/MatchDialog";
import QuickMessageDialog from "../quickMessageDialog/QuickMessageDialog";
import DateScheduler from "../dateSchedular/DateScheduler";
import { onMessage } from "../../utils/firestoreFunctions";

export const Video = React.forwardRef(
  (
    {
      video_title,
      video_url,
      like,
      video_id,
      match,
      superLike,
      username,
      user_id,
    },
    ref
  ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const mutedState = useSelector((state) => state.video.muted);
    const currentUser = useSelector((state) => state.auth.user.data);
    const [openDialog, setOpenDialog] = useState(false);
    const [quickMessage, setQuickMessage] = useState(false);
    const [date, setDate] = useState(false);
    const [isLiked, setIsLiked] = useState(like);
    const [chatId, setChatId] = useState("");
    const [matchData, setMatchData] = useState({
      liked_by: "",
      liked_by_name: "",
      liked_by_profile_image: "",
      liked_to: "",
      liked_to_name: "",
      liked_to_profile_image: "",
    });
    const [superLiked, setSuperLiked] = useState(superLike);
    const [quickMessageValue, setQuickMessageValue] = useState("");

    const handleSuperLike = async () => {
      console.log(video_id);
      const { data } = await superLikeApi({ video_id });
      console.log(data);
      setSuperLiked(!superLiked);
    };
    const handleLike = async () => {
      setIsLiked(!isLiked);
      const { data } = await likeVideo({ video_id });
      setMatchData(data.data);
      if (data.matched) {
        setChatId(data.chatId);
        setOpenDialog(data.matched);
      }
    };

    const handleQuickMessage = () => {
      setOpenDialog(false);
      setQuickMessage(true);
    };
    const handleDate = () => {
      setOpenDialog(false);
      setDate(true);
    };
    const handleSendQuickMessage = () => {
      if (quickMessageValue === "") {
        return;
      } else {
        const doc = {
          content: quickMessageValue,
          filename: "",
          idFrom: currentUser._id,
          idTo: user_id,
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
          currentUser._id,
          messages.length === 0 ? currentUser._id : user_id
        );
      }
    };
    return (
      <>
        <Grid
          item
          container
          className={classes.post}
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <Typography className={classes.postTitle}>{video_title}</Typography>
            <div className={classes.postContainer}>
              <video
                ref={ref}
                playsInline
                loop
                muted={mutedState}
                className={classes.video}
                src={`${process.env.REACT_APP_API_URL}/${video_url}`}
              ></video>
              <div className={classes.iconContainer}>
                <Grid
                  container
                  className={classes.icons}
                  justifyContent="space-between"
                  alignItems="flex-end"
                >
                  <Grid item>
                    <IconButton onClick={() => dispatch(toggleMute())}>
                      <img
                        src={mutedState ? image.mute : image.unMute}
                        className={classes.muteIcon}
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  {match ? (
                    <Grid item>
                      <IconButton onClick={handleSuperLike}>
                        <img
                          className={classes.superlike}
                          src={superLiked ? image.sparkActive : image.superlike}
                          alt=""
                        />
                      </IconButton>
                    </Grid>
                  ) : undefined}
                  <Grid item>
                    <IconButton onClick={handleLike}>
                      <Favorite
                        style={{ transition: "0.5s ease" }}
                        className={
                          isLiked ? classes.likeFilled : classes.likeIcon
                        }
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
        <MatchDialog
          handleDate={handleDate}
          handleQuickMessage={handleQuickMessage}
          fromImg={matchData.liked_by_profile_image}
          toImg={matchData.liked_to_profile_image}
          open={openDialog}
          setOpen={setOpenDialog}
        />
        <QuickMessageDialog
          open={quickMessage}
          setOpen={setQuickMessage}
          username={username}
          setQuickMessage={setQuickMessageValue}
          sendMessage={handleSendQuickMessage}
        />
        <DateScheduler open={date} setOpen={setDate} />
      </>
    );
  }
);
const useStyles = makeStyles((theme) => ({
  postTitle: {
    color: "#000",
    margin: "0",
    fontSize: "20px",
    textAlign: "left",
    width: "100%",
    marginBottom: "10px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  postContainer: {
    width: "338px",
    height: "596px",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
    "& video": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    [theme.breakpoints.down("lg")]: {
      width: "220px",
      height: "380px",
    },
  },
  iconContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 15,
    borderRadius: "16px",
    display: "flex",
    alignItems: "flex-end",
    [theme.breakpoints.down("lg")]: {
      bottom: 5,
    },
  },
  icons: {
    height: "80px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      paddingInline: "0.25rem",
      padding: "0",
      height: "50px",
    },
  },
  likeIcon: {
    color: "#fbfbfb",
    fontSize: "2.8rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
  },
  muteIcon: {
    maxWidth: "45px",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "28px",
    },
  },
  post: {
    marginTop: "3rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1rem",
    },
  },
  likeFilled: {
    fontSize: "3.25rem",
    color: "red",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.8rem",
    },
  },
  // dialog: {
  //   "& .MuiDialog-paper": {
  //     borderRadius: "30px",
  //   },
  // },
  // dialogContainer: {
  //   padding: "2rem 3.5rem",
  //   backgroundColor: theme.palette.common.lightPink,
  //   [theme.breakpoints.down(1680)]: {
  //     padding: "1rem 2.5rem",
  //   },
  // },
  // avatarGroup: {
  //   marginTop: "2rem",
  //   [theme.breakpoints.down(1680)]: {
  //     marginTop: "1rem",
  //   },
  // },
  // dialogImage: {
  //   height: "107px",
  //   width: "107px",
  //   border: `2px solid ${theme.palette.common.lightPink}`,
  //   [theme.breakpoints.down(1680)]: {
  //     height: "85px",
  //     width: "85px",
  //   },
  // },
  // gradientText: {
  //   margin: "0",
  //   fontSize: "24px",
  //   fontWeight: 700,
  //   marginTop: "0.5rem",
  //   background: "-webkit-linear-gradient(#654AAB, #E77783)",
  //   "-webkit-background-clip": "text",
  //   "-webkit-text-fill-color": "transparent",
  //   [theme.breakpoints.down(1680)]: {
  //     fontSize: "20px",
  //   },
  // },
  // text: {
  //   fontSize: "12px",
  // },
  // dialogAction: {
  //   marginTop: "2rem",
  //   marginBottom: "3rem",
  //   width: "70%",
  //   marginInline: "auto",
  //   [theme.breakpoints.down(1680)]: {
  //     marginTop: "1rem",
  //     marginBottom: "1.5rem",
  //   },
  // },
  // outlinedButton: {
  //   width: "274px",
  //   height: "52px",
  //   borderRadius: "38px",
  //   fontSize: "17px",
  //   border: `2px solid ${theme.palette.primary.main}`,
  //   fontWeight: 700,
  //   [theme.breakpoints.down(1680)]: {
  //     width: "240px",
  //     height: "45.5px",
  //   },
  // },
  // // quick message
  // quickMessageDialog: {
  //   "& .MuiDialog-paper": {
  //     borderRadius: "30px",
  //   },
  // },
  // quickMessageDialogContent: {
  //   padding: "1.5rem",
  //   [theme.breakpoints.down(1680)]: {
  //     padding: "0.75rem",
  //   },
  // },
  // quickMessageTitle: {
  //   margin: "0",
  //   color: "#000",
  //   fontSize: "27px",
  //   fontWeight: 500,
  //   [theme.breakpoints.down(1680)]: {
  //     fontSize: "20px",
  //   },
  // },
  // chip: {
  //   backgroundColor: theme.palette.common.lightPink,
  //   borderRadius: "18px 18px 18px 0px",
  //   height: "53px",
  //   margin: "0.5rem 0",
  //   width: "317px",
  //   fontSize: "18px",
  //   [theme.breakpoints.down(1680)]: {
  //     width: "250px",
  //     height: "42px",
  //     fontSize: "13px",
  //   },
  // },
  // quickMessageButton: {
  //   width: "275px",
  //   height: "46px",
  //   textTransform: "none",
  //   fontSize: "19px",
  //   borderRadius: "29px",
  //   marginTop: "5rem",
  //   [theme.breakpoints.down(1680)]: {
  //     width: "220px",
  //     height: "36px",
  //     fontSize: "13px",
  //   },
  // },

  // // date dialog
  // dateDialog: {
  //   "& .MuiDialog-paper": {
  //     borderRadius: "39px",
  //   },
  // },
  // dateDialogContainer: {
  //   padding: "2rem",
  //   backgroundColor: theme.palette.common.lightPink,
  // },
  // dateDialogTitle: {
  //   margin: 0,
  //   color: theme.palette.primary.main,
  //   fontSize: "22px",
  //   alignItems: "center",
  //   [theme.breakpoints.down("lg")]: {
  //     fontSize: "18px",
  //   },
  // },
  // watchblue: {
  //   marginLeft: "2rem",
  //   [theme.breakpoints.down("lg")]: {
  //     width: "1.25rem",
  //     marginLeft: "1.5rem",
  //   },
  // },
  // closeButton: {
  //   height: "30px",
  //   width: "30px",
  //   [theme.breakpoints.down("lg")]: {
  //     height: "20px",
  //     width: "20px",
  //   },
  //   "&:hover": {
  //     backgroundColor: "transparent",
  //   },
  // },
  // closeIcon: {
  //   fontSize: "2.5rem",
  //   color: "#ACACAC",
  //   [theme.breakpoints.down("lg")]: {
  //     fontSize: "2rem",
  //   },
  // },
  // availableText: {
  //   margin: 0,
  //   color: "#000",
  //   fontSize: "22px",
  //   marginTop: "3rem",
  //   [theme.breakpoints.down("lg")]: {
  //     fontSize: "18px",
  //     marginTop: "1.5rem",
  //   },
  // },
  // sliderRoot: {
  //   color: theme.palette.primary.main,
  //   height: "2px",
  //   width: "80%",
  //   marginInline: "auto",
  //   marginTop: "1rem",
  //   [theme.breakpoints.down("lg")]: {
  //     marginTop: "0rem",
  //     width: "100%",
  //   },
  //   "& .MuiSlider-thumb": {
  //     height: "17px",
  //     width: "17px",
  //     backgroundColor: "#fff",
  //     boxShadow: theme.shadows[3],
  //     marginTop: "-8.5px",
  //     marginLeft: "-8.5px",
  //   },
  //   "& 	.MuiSlider-valueLabel": {
  //     // left: "calc(-50% + 12px)",
  //     left: "-50%",
  //     top: "-18px",
  //     "& *": {
  //       background: "transparent",
  //       color: "#000",
  //       fontSize: "13px",
  //     },
  //   },
  // },
  // continueButton: {
  //   width: "369px",
  //   height: "57px",
  //   borderRadius: "29px",
  //   textTransform: "none",
  //   fontSize: "16px",
  //   // marginTop: "2rem",
  //   [theme.breakpoints.down("lg")]: {
  //     width: "300px",
  //     height: "45px",
  //     fontSize: "13px",
  //   },
  // },
  // dialogIconContainer: {
  //   margin: "3rem 0",
  // },
  // datePicker: {
  //   marginTop: "3rem",
  //   minWidth: "100%",
  //   [theme.breakpoints.down("lg")]: {
  //     marginTop: "1.5rem",
  //   },
  //   "& .MuiFormControl-root": {
  //     width: "100%",
  //   },
  //   "& .MuiInputLabel-root": {
  //     color: theme.palette.primary.main,
  //   },
  //   "& .MuiInput-root": {
  //     color: theme.palette.primary.main,
  //     width: "100%",
  //     "& .MuiInputBase-input": {
  //       color: "#000",
  //     },
  //   },
  // },
  // date: {
  //   width: "300px",
  //   color: "#000000",
  //   fontSize: "20px",
  // },
  // dateRoot: {
  //   marginTop: "2rem",
  //   "& .MuiInput-underline::before": {
  //     borderBottom: `2px solid ${theme.palette.primary.light}`,
  //   },
  // },
  // superlike: {
  //   transition: "0.6s ease",
  //   [theme.breakpoints.down("lg")]: {
  //     height: "2rem",
  //   },
  // },
}));
