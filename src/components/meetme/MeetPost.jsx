import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { useTransition, animated } from "react-spring";
import {
  Grid,
  Avatar,
  IconButton,
  Dialog,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction as Action,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import image from "../../assets/index";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleMute } from "../../store/videoSound";
import { useHistory } from "react-router-dom";
import { checkMatch, superLikeApi } from "../../http";
export const MeetPost = ({ allVideos, page, setPage, totalPage }) => {
  const classes = useStyles();
  const history = useHistory();
  // eslint-disable-next-line
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  // eslint-disable-next-line
  const [openSuperDialog, setOpenSuperDialog] = useState(false);
  const isMuted = useSelector((state) => state.video.muted);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(totalPage);
  // eslint-disable-next-line
  const [videos, setVideos] = useState(allVideos);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const transition = useTransition(animate, {
    from: { x: 500, opacity: 0 },
    enter: { x: 0, opacity: 1 },
  });
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

  const handleSuperLike = async (id) => {
    // eslint-disable-next-line
    try {
      const { data } = await superLikeApi({ video_id: id });
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
                      {/* <img src={image.post} className={classes.postAsset} alt="" /> */}
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
                              <IconButton className={classes.superIcon}>
                                <img src={image.dedicatedHeart} alt="" />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
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
            </animated.div>
          )
      )}
    </>
  );
};
