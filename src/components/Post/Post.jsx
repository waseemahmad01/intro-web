import React, { useState, useContext } from "react";
import { useStyles } from "./postStyles";
import { Grid, Avatar, IconButton } from "@material-ui/core";
import image from "../../assets/index";
import { Favorite } from "@material-ui/icons";
import { likeVideo, checkMatch, superLikeApi } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import { useHistory } from "react-router-dom";
import { db } from "../../firebaseInit";
import { SocketContext } from "../../http/socket";
import QuickMessageDialog from "../quickMessageDialog/QuickMessageDialog";
import DateScheduler from "../dateSchedular/DateScheduler";
import { onMessage } from "../../utils/firestoreFunctions";
import MatchDialog from "../MatchDialog/MatchDialog";
import InstantSpark from "../InstantSpark/InstantSpark";
export const Post = React.forwardRef(
  (
    {
      username,
      profile_img,
      video_url,
      video_id,
      title,
      like,
      user_id,
      cover,
      superLike,
    },
    ref
  ) => {
    const classes = useStyles();
    const history = useHistory();
    const socket = useContext(SocketContext);
    const [quickMessage, setQuickMessage] = useState(false);
    const [matchData, setMatchData] = useState({
      liked_by: "",
      liked_by_name: "",
      liked_by_profile_image: "",
      liked_to: "",
      liked_to_name: "",
      liked_to_profile_image: "",
    });
    const [quickMessageValue, setQuickMessageValue] = useState("");
    const isMuted = useSelector((state) => state.video.muted);
    const currentUser = useSelector((state) => state.auth.user.data);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(like);
    const [superLiked, setSuperLiked] = useState(superLike);
    const [chatId, setChatId] = useState("");
    const [otherUser, setOtherUser] = useState("");
    const [openSuperDialog, setOpenSuperDialog] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [date, setDate] = useState(false);

    const handleQuickMessage = () => {
      setOpenDialog(false);
      setQuickMessage(true);
    };
    const handleDate = () => {
      setOpenDialog(false);
      setDate(true);
    };

    const handleLike = async () => {
      setIsLiked(!isLiked);
      const { data } = await likeVideo({ video_id });
      setMatchData(data.data);
      if (data.matched) {
        setOpenDialog(data.matched);
        setChatId(data.chatId);
        setOtherUser(data.data.liked_to);
      }
    };

    const handleProfileClick = async (id) => {
      const { data } = await checkMatch(id);
      if (data.data) {
        history.push(`/home/match/${id}`);
      } else {
        history.push(`/home/unmatch/${id}`);
      }
    };
    const handleSuperLike = async () => {
      setSuperLiked(!superLiked);
      const { data } = await superLikeApi({ video_id });
      setMatchData(data.data);
      if (data.matched) {
        setOpenDialog(data.matched);
        setChatId(data.chatId);
        setOtherUser(data.data.liked_to);
      }
    };

    const handleSendQuickMessage = () => {
      if (quickMessageValue === "") {
        return;
      } else {
        const doc = {
          content: quickMessageValue,
          filename: "",
          idFrom: currentUser._id,
          idTo: otherUser,
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
          messages.length === 0 ? currentUser._id : otherUser
        );
      }
    };
    return (
      <Grid
        item
        container
        alignItems="flex-start"
        className={classes.postContainer}
        ref={ref}
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
              <Grid item container direction="column" alignItems="center">
                <Avatar
                  onClick={() => handleProfileClick(user_id)}
                  src={profile_img}
                  className={classes.postAvatar}
                />

                <p className={classes.postAvatarText}>{username}</p>
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
        >
          <Grid item>
            <h2 className={classes.postTitle}>{title}</h2>
          </Grid>
          <Grid item>
            <div
              className={classes.imageContianer}
              style={{
                overflow: "hidden",
              }}
            >
              <video
                playsInline
                autoPlay={false}
                loop
                muted={isMuted}
                src={video_url}
                className={classes.postAsset}
                poster={cover}
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
                  <Grid item>
                    <IconButton onClick={handleSuperLike}>
                      <img
                        src={superLiked ? image.superLikePink : image.superlike}
                        className={
                          superLiked
                            ? classes.superLikeActiveIcon
                            : classes.superLikeIcon
                        }
                        alt=""
                      />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleLike}>
                      <Favorite
                        style={{ color: isLiked ? "red" : "" }}
                        className={classes.likeIcon}
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
        <InstantSpark open={openSuperDialog} setOpen={setOpenSuperDialog} />
        {/* <Dialog
          className={classes.superDialog}
          open={openSuperDialog}
          onClose={() => setOpenSuperDialog(false)}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.superDialogContainer}
          >
            <Grid item container justifyContent="flex-end">
              <IconButton
                onClick={() => setOpenSuperDialog(false)}
                className={classes.closeButton}
              >
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography className={classes.superDialogTitle}>
                Get Instant Spark
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.superDialogSubtitle}>
                Buy instant spark to get their attention
              </Typography>
            </Grid>
            <Grid item container>
              <List dense style={{ width: "90%", marginInline: "auto" }}>
                <ListItem divider className={classes.listItem}>
                  <ListItemAvatar>
                    <img
                      className={classes.image}
                      src={image.superLikePink}
                      alt=""
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listItemText}
                    primary="500"
                    secondary="$4.99"
                  />
                  <Action className={classes.action}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Select
                    </Button>
                  </Action>
                </ListItem>
                <ListItem className={classes.listItem} divider>
                  <ListItemAvatar>
                    <img
                      className={classes.image}
                      src={image.superLikePink}
                      alt=""
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listItemText}
                    primary="500"
                    secondary="$4.99"
                  />
                  <Action className={classes.action}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Select
                    </Button>
                  </Action>
                </ListItem>
                <ListItem className={classes.listItem} divider>
                  <ListItemAvatar>
                    <img
                      className={classes.image}
                      src={image.superLikePink}
                      alt=""
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listItemText}
                    primary="500"
                    secondary="$4.99"
                  />
                  <Action className={classes.action}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Select
                    </Button>
                  </Action>
                </ListItem>
                <ListItem className={classes.listItem} divider>
                  <ListItemAvatar>
                    <img
                      className={classes.image}
                      src={image.superLikePink}
                      alt=""
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.listItemText}
                    primary="500"
                    secondary="$4.99"
                  />
                  <Action className={classes.action}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Select
                    </Button>
                  </Action>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Dialog> */}
      </Grid>
    );
  }
);
