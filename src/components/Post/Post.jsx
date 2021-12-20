import React, { useState } from "react";
import { useStyles } from "./postStyles";
import {
  Grid,
  Avatar,
  IconButton,
  Dialog,
  Typography,
  Button,
  Slider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction as Action,
  ListItemAvatar,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import image from "../../assets/index";
import { Favorite, Close } from "@material-ui/icons";
import { likeVideo, checkMatch, superLikeApi } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import { useHistory } from "react-router-dom";
import QuickMessage from "../quickMessage/QuickMessage";
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
    const [openDialog, setOpenDialog] = useState(false);
    const [quickMessage, setQuickMessage] = useState(false);
    const [date, setDate] = useState(false);
    const [sliderValue, setSliderValue] = useState([11, 23]);
    // eslint-disable-next-line
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [quickMessageValue, setQuickMessageValue] = useState("");
    const isMuted = useSelector((state) => state.video.muted);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(like);
    const [superLiked, setSuperLiked] = useState(superLike);

    const [openSuperDialog, setOpenSuperDialog] = useState(false);
    // eslint-disable-next-line
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const handleQuickMessage = () => {
      setOpenDialog(false);
      setQuickMessage(true);
    };
    const handleDate = () => {
      setOpenDialog(false);
      setDate(true);
    };
    const handleTime = (event, time) => {
      setSliderValue(time);
    };
    const handleValueLabel = (value) => {
      return `${value}o'clock`;
    };
    const handleLike = async () => {
      setIsLiked(!isLiked);
      const { data } = await likeVideo({ video_id });
      setOpenDialog(data.matched);
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
    };
    const quickMessageList = [
      `Hi ${username}, how are you doing?`,
      `Hi ${username}, how are you doing?`,
      `Hi ${username}, how are you doing?`,
      `Hi ${username}, how are you doing?`,
      `Hi ${username}, how are you doing?`,
    ];
    const handleSelectQuickMessage = (e) => {
      setQuickMessageValue(e.target.value);
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
        <Dialog open={openDialog} className={classes.dialog}>
          <Grid
            container
            className={classes.dialogContainer}
            direction="column"
            alignItems="center"
          >
            <Grid item>
              <AvatarGroup className={classes.avatarGroup} spacing="small">
                <Avatar className={classes.dialogImage} src={image.jhon} />
                <Avatar
                  style={{ zIndex: 2 }}
                  className={classes.dialogImage}
                  src={image.img}
                />
              </AvatarGroup>
            </Grid>
            <Grid item>
              <Typography className={classes.gradientText}>
                It's a Match!
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="flex-end"
              className={classes.dialogAction}
            >
              <Grid item>
                <Grid
                  container
                  style={{ cursor: "pointer" }}
                  onClick={handleDate}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      src={image.date}
                      className={classes.dialogIcon}
                      alt=""
                    />
                  </Grid>
                  <Grid item>
                    <span className={classes.text}>Date scheduler</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  style={{ cursor: "pointer" }}
                  onClick={handleQuickMessage}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      src={image.quickMessage}
                      className={classes.dialogIcon}
                      alt=""
                    />
                  </Grid>
                  <Grid item>
                    <span className={classes.text}>Quick Message</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                className={classes.outlinedButton}
                color="primary"
                onClick={() => setOpenDialog(false)}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Dialog>
        <Dialog className={classes.quickMessageDialog} open={quickMessage}>
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
          open={date}
          onClose={() => setDate(false)}
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
                    onClick={() => setDate(false)}
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
              <Grid item>
                <TextField
                  fullWidth
                  style={{ color: "#000" }}
                  classes={{ root: classes.dateRoot }}
                  inputProps={{ className: classes.date }}
                  type="date"
                />
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
                <Grid item>
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
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.continueButton}
                  onClick={() => setDate(false)}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Dialog>
        <Dialog
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
        </Dialog>
      </Grid>
    );
  }
);
