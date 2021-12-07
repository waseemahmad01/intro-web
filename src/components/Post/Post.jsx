import React, { useState } from "react";
import { useStyles } from "./postStyles";
import { Link } from "react-router-dom";
import {
  Grid,
  Avatar,
  IconButton,
  Dialog,
  Typography,
  Button,
  Chip,
  Slider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction as Action,
  TextField,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import AvatarGroup from "@material-ui/lab/AvatarGroup";
import image from "../../assets/index";
import { Favorite, Close } from "@material-ui/icons";
import { likeVideo } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../store/videoSound";
export const Post = React.forwardRef(
  (
    { meetMe, username, profile_img, video_url, video_id, title, like },
    ref
  ) => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [quickMessage, setQuickMessage] = useState(false);
    const [date, setDate] = useState(false);
    const [sliderValue, setSliderValue] = useState([11, 23]);
    // eslint-disable-next-line
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openSuperDialog, setOpenSuperDialog] = useState(false);
    const isMuted = useSelector((state) => state.video.muted);
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(like);
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
      console.log(data);
      setOpenDialog(data.matched);
    };
    const theme = useTheme();
    const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
    // console.log(ref);
    return (
      <Grid
        item
        container
        alignItems="flex-start"
        className={classes.postContainer}
        ref={ref}
        style={{
          marginBottom: meetMe ? (lgScreen ? undefined : "0.75rem") : undefined,
          height: meetMe ? (lgScreen ? "485px" : "730px") : undefined,
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
              <Avatar
                component={Link}
                to={meetMe ? "/home/match" : "/home/profile"}
                src={meetMe ? image.img : profile_img}
                className={classes.postAvatar}
              />

              <p className={classes.postAvatarText}>
                {meetMe ? "@username" : username}
              </p>
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
          style={{ paddingLeft: meetMe ? "4.5rem" : undefined }}
        >
          <Grid item>
            <h2 className={classes.postTitle}>
              {meetMe ? "Worst Idea I ever had?" : title}
            </h2>
          </Grid>
          <Grid item>
            <div
              className={classes.imageContianer}
              style={{
                height: meetMe ? (lgScreen ? "420px" : "667px") : undefined,
                width: meetMe ? (lgScreen ? "295px" : "447px") : undefined,
                marginBottom: meetMe
                  ? lgScreen
                    ? "0.2rem"
                    : "3rem"
                  : undefined,
                borderRadius: meetMe ? (lgScreen ? "22px" : "35px") : undefined,
                overflow: "hidden",
              }}
            >
              {/* <img src={image.post} className={classes.postAsset} alt="" /> */}
              <video
                playsInline
                autoPlay={meetMe ? true : false}
                loop
                muted={isMuted}
                src={meetMe ? image.video : video_url}
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
                  <Grid item>
                    {meetMe ? undefined : (
                      <IconButton onClick={handleLike}>
                        <Favorite
                          style={{ color: isLiked ? "red" : "" }}
                          className={classes.likeIcon}
                        />
                      </IconButton>
                    )}
                  </Grid>
                  {meetMe ? (
                    <Grid
                      container
                      justifyContent={lgScreen ? "center" : "space-evenly"}
                      className={classes.superIcons}
                    >
                      <Grid item>
                        <IconButton className={classes.superIcon}>
                          <img src={image.noButton} alt="" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => setOpenSuperDialog(true)}
                          className={classes.superIcon}
                        >
                          <img src={image.superLikePink} alt="" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton className={classes.superIcon}>
                          <img src={image.dedicatedHeart} alt="" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ) : undefined}
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
            <Grid item>
              <Grid item>
                <Chip
                  className={classes.chip}
                  label="Hi <Username>, how are you doing?"
                />
              </Grid>
              <Grid item>
                <Chip
                  className={classes.chip}
                  label="Hi <Username>, how are you doing?"
                />
              </Grid>
              <Grid item>
                <Chip
                  className={classes.chip}
                  label="Hi <Username>, how are you doing?"
                />
              </Grid>
              <Grid item>
                <Chip
                  className={classes.chip}
                  label="Hi <Username>, how are you doing?"
                />
              </Grid>
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
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider> */}
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
              <List
                dense
                disableGutters
                style={{ width: "90%", marginInline: "auto" }}
              >
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
