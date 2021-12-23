import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  IconButton,
  Dialog,
  Button,
  Avatar,
  Chip,
  Slider,
  TextField,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Favorite, Close } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import image from "../../assets";
import { likeVideo, superLikeApi } from "../../http";

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
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  dialogContainer: {
    padding: "2rem 3.5rem",
    backgroundColor: theme.palette.common.lightPink,
    [theme.breakpoints.down(1680)]: {
      padding: "1rem 2.5rem",
    },
  },
  avatarGroup: {
    marginTop: "2rem",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
    },
  },
  dialogImage: {
    height: "107px",
    width: "107px",
    border: `2px solid ${theme.palette.common.lightPink}`,
    [theme.breakpoints.down(1680)]: {
      height: "85px",
      width: "85px",
    },
  },
  gradientText: {
    margin: "0",
    fontSize: "24px",
    fontWeight: 700,
    marginTop: "0.5rem",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
    },
  },
  text: {
    fontSize: "12px",
  },
  dialogAction: {
    marginTop: "2rem",
    marginBottom: "3rem",
    width: "70%",
    marginInline: "auto",
    [theme.breakpoints.down(1680)]: {
      marginTop: "1rem",
      marginBottom: "1.5rem",
    },
  },
  outlinedButton: {
    width: "274px",
    height: "52px",
    borderRadius: "38px",
    fontSize: "17px",
    border: `2px solid ${theme.palette.primary.main}`,
    fontWeight: 700,
    [theme.breakpoints.down(1680)]: {
      width: "240px",
      height: "45.5px",
    },
  },
  // quick message
  quickMessageDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
    },
  },
  quickMessageDialogContent: {
    padding: "1.5rem",
    [theme.breakpoints.down(1680)]: {
      padding: "0.75rem",
    },
  },
  quickMessageTitle: {
    margin: "0",
    color: "#000",
    fontSize: "27px",
    fontWeight: 500,
    [theme.breakpoints.down(1680)]: {
      fontSize: "20px",
    },
  },
  chip: {
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "18px 18px 18px 0px",
    height: "53px",
    margin: "0.5rem 0",
    width: "317px",
    fontSize: "18px",
    [theme.breakpoints.down(1680)]: {
      width: "250px",
      height: "42px",
      fontSize: "13px",
    },
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

  // date dialog
  dateDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "39px",
    },
  },
  dateDialogContainer: {
    padding: "2rem",
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
  },
  datePicker: {
    marginTop: "3rem",
    minWidth: "100%",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1.5rem",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiInput-root": {
      color: theme.palette.primary.main,
      width: "100%",
      "& .MuiInputBase-input": {
        color: "#000",
      },
    },
  },
  date: {
    width: "300px",
    color: "#000000",
    fontSize: "20px",
  },
  dateRoot: {
    marginTop: "2rem",
    "& .MuiInput-underline::before": {
      borderBottom: `2px solid ${theme.palette.primary.light}`,
    },
  },
  superlike: {
    transition: "0.6s ease",
  },
}));

export const Video = React.forwardRef(
  ({ video_title, video_url, like, video_id, match, superLike }, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mutedState = useSelector((state) => state.video.muted);
    const [openDialog, setOpenDialog] = useState(false);
    const [quickMessage, setQuickMessage] = useState(false);
    // eslint-disable-next-line
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(false);
    const [isLiked, setIsLiked] = useState(like);

    const [sliderValue, setSliderValue] = useState([11, 23]);
    const [superLiked, setSuperLiked] = useState(superLike);
    const handleSuperLike = async () => {
      console.log(video_id);
      const { data } = await superLikeApi({ video_id });
      console.log(data);
      setSuperLiked(!superLiked);
    };
    const handleLike = async () => {
      setIsLiked(!isLiked);
      const { data } = await likeVideo({ video_id });
      setOpenDialog(data.matched);
    };
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
    const handleValueLabel = (value) => {
      return `${value}o'clock`;
    };
    const handleTime = (event, time) => {
      setSliderValue(time);
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
      </>
    );
  }
);
