import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Hidden,
  IconButton,
  Button,
  Dialog,
} from "@material-ui/core";
import image from "../../assets/index";
import { useTransition, animated } from "react-spring";
import { Gems } from "../BottomSheetComponents/Gems/Gems";
import { Guest } from "../BottomSheetComponents/Guest/Guest";
import { Battle } from "../BottomSheetComponents/Battle/Battle";
// import { InstantBattle } from "../BottomSheetComponents/InstantBattle/InstantBattle";
// import { BatteryAlert } from "@material-ui/icons";
import { LiveLoop } from "../BottomSheetComponents/LiveLoop/LiveLoop";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "73%",
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "25px",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down(1680)]: {
      // height: "85%",
      width: "400px",
    },
  },
  headingContainer: {
    height: "73px",
    boxShadow: theme.shadows[3],
    borderRadius: "25px 25px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    // background: "red",
    borderBottom: "1px solid rgba(112,112,112,0.4)",
    [theme.breakpoints.down(1680)]: {
      height: "50px",
    },
    [theme.breakpoints.down("md")]: {
      height: "45px",
    },
  },
  heading: {
    fontSize: "1.75rem",
    textAlign: "center",
    [theme.breakpoints.down(1680)]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#FFF2EB",
    padding: "2rem 1.5rem",
    // overflowY: "scroll",
    position: "relative",
    [theme.breakpoints.down(1680)]: {
      padding: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
    },
  },
  bottomNavContainer: {
    backgroundColor: "#3E3E3E",
    height: "100px",
    borderRadius: "0 0 25px 25px",
    [theme.breakpoints.down(1680)]: {
      height: "60px",
    },
    [theme.breakpoints.down("md")]: {
      height: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "60px",
      borderRadius: "0",
      backgroundColor: "rgba(0,0,0,0.6)",
    },
  },
  tabs: {
    width: "100%",
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
      minWidth: "100%",
    },
  },
  tab: {
    minWidth: "30px",
    marginInline: "22px",
    opacity: 1,
    [theme.breakpoints.down(1680)]: {
      minWidth: "20px",
      marginInline: "11px",
    },
  },
  warningText: {
    fontWeight: 300,
    fontSize: "18px",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "18px",
    [theme.breakpoints.down(1680)]: {
      fontSize: "12px",
      padding: "0.75rem",
    },
  },
  warningIcons: {
    [theme.breakpoints.down(1680)]: {
      width: "2.5rem",
    },
  },
  tabIcon: {
    [theme.breakpoints.down(1680)]: {
      width: "1.7rem",
    },
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    zIndex: 2,
    borderRadius: "25px 25px 0 0",
  },
  sheetContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.palette.common.lightPink,
  },
  downButton: {
    // margin: "0.5rem 0",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& img": {
      [theme.breakpoints.down("lg")]: {
        width: "2rem",
      },
    },
  },
  sheetContent: {
    height: "100%",
    width: "100%",
  },
  secondSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: "25px 25px 0 0",
  },
  secondSheetContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "auto",
    borderRadius: "45px 45px 0 0",
    backgroundColor: theme.palette.common.lightPink,
  },
  skipButton: {
    width: "208px",
    height: "51px",
    borderRadius: "25px",
    backgroundColor: "#fff",
    fontSize: "25px",
    color: theme.palette.primary.main,
    textTransform: "none",
    [theme.breakpoints.down(1680)]: {
      width: "180px",
      height: "40px",
      fontSize: "20px",
    },
  },
  extendButton: {
    width: "208px",
    height: "51px",
    borderRadius: "25px",
    backgroundColor: theme.palette.common.darkPink,
    fontSize: "25px",
    color: "#fff",
    textTransform: "none",
    [theme.breakpoints.down(1680)]: {
      width: "180px",
      height: "40px",
      fontSize: "20px",
    },
  },
  stopwatchIcon: {
    [theme.breakpoints.down(1680)]: {
      width: "1.25rem",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
      borderRadius: "10px",
    },
  },
  dialogContainer: {
    width: "380px",
    height: "380px",
    padding: "3rem 1rem",
  },
  dialogTitle: {
    margin: 0,
    fontSize: "33px",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
  },
  dialogSubtitle: {
    margin: "0",
    fontSize: "18px",
    color: "#929292",
    marginTop: "15px",
    marginBottom: "51px",
  },
  dialogButtons: {
    width: "250px",
    height: "55px",
    borderRadius: "28px",
    textTransform: "none",
    fontSize: "20px",
    marginBlock: "10px",
  },
}));
export const StreamerBox = ({
  channelId,
  endStream,
  joinLiveLoop,
  roleChange,
  setCoHostUserId,
  liveloop,
  setIsWaiting,
  dateStarted,
  setDateStarted,
  // setRemainingTime,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(liveloop ? 2 : 0);
  const [liveLoop, setLiveLoop] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTab = (event, newTab) => {
    setTab(newTab);
  };
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [sheetVisible, setSheetVisible] = useState(false);
  const [isSecondSheet, setIsSecondSheet] = useState(liveloop ? true : false);
  const [secondSheetTab, setSecondSheetTab] = useState(0);
  const transition = useTransition(sheetVisible, {
    from: { height: "0%", opacity: 0 },
    enter: { height: "100%", opacity: 1 },
    leave: { height: "0%", opacity: 0 },
  });
  const secondSheet = useTransition(isSecondSheet, {
    from: { height: "0%", opacity: 0 },
    enter: { height: "100%", opacity: 1 },
    leave: { height: "0%", opacity: 0 },
  });
  const handleSheetClose = () => {
    setSheetVisible(false);
    setIsSecondSheet(false);
    setTab(0);
  };
  const handleVsClick = () => {
    setSheetVisible(false);
    setIsSecondSheet(true);
    setSecondSheetTab(1);
  };
  const handleLoopClick = () => {
    setSheetVisible(false);
    setIsSecondSheet(true);
    setSecondSheetTab(0);
    setOpenDialog(liveloop ? false : true);
  };
  const handleNotNow = () => {
    setOpenDialog(false);
    handleSheetClose();
  };
  const tabs = {
    0: Gems,
    1: Guest,
    2: Gems,
    3: Gems,
    4: Gems,
  };
  const secondSheetTabs = {
    0: LiveLoop,
    // 0: InstantBattle,
    1: Battle,
  };
  const TabComponent = tabs[tab];
  const SheetTab = secondSheetTabs[secondSheetTab];

  return (
    <Grid container direction="column" className={classes.container}>
      <div style={{ flexGrow: 1, position: "relative" }}>
        <Hidden smDown>
          <Grid item className={classes.headingContainer}>
            <Typography className={classes.heading} variant="h3">
              Messages
            </Typography>
          </Grid>
        </Hidden>
        <Grid item className={classes.content}>
          <Grid container direction="column" spacing={lgScreen ? 3 : 5}>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={2}>
                <img
                  src={image.warning}
                  alt="warning-icon"
                  className={classes.warningIcons}
                />
              </Grid>
              <Grid item xs={10} className={classes.warningTextContainer}>
                <Typography className={classes.warningText} variant="h3">
                  Let’s keep INTRO fun! Nudity or obscene behavior will result
                  in account deletion.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={2}>
                <img
                  src={image.modbot}
                  alt="mobot-icon"
                  className={classes.warningIcons}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography className={classes.warningText} variant="h3">
                  Modbot is watching to keep this stream clean!
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={2}>
                <img
                  src={image.idea}
                  alt="idea-icon"
                  className={classes.warningIcons}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography className={classes.warningText} variant="h3">
                  After a Viewer sends you a Gem, their name will be highlighted
                  in Purple! Show them some extra love!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {transition((style, item) =>
          item ? (
            <animated.div style={style} className={classes.bottomSheet}>
              <Grid
                container
                justifyContent="center"
                className={classes.sheetContainer}
              >
                <Grid item container justifyContent="center">
                  <IconButton
                    className={classes.downButton}
                    onClick={handleSheetClose}
                  >
                    <img
                      className={classes.downIcon}
                      src={image.downArrowBlue}
                      alt="down-arrow"
                    />
                  </IconButton>
                </Grid>
                <Grid item className={classes.sheetContent}>
                  <TabComponent
                    setLiveLoop={setLiveLoop}
                    roleChange={roleChange}
                    liveLoop={LiveLoop}
                    setCoHostId={setCoHostUserId}
                  />
                </Grid>
              </Grid>
            </animated.div>
          ) : (
            ""
          )
        )}
        {secondSheet((style, item) =>
          item ? (
            <animated.div style={style} className={classes.secondSheet}>
              <Grid container className={classes.secondSheetContent}>
                <Grid item container justifyContent="center">
                  <IconButton
                    disabled={liveloop}
                    onClick={handleSheetClose}
                    className={classes.downButton}
                  >
                    <img
                      className={classes.downIcon}
                      src={image.downArrowBlue}
                      alt="down-arrow"
                    />
                  </IconButton>
                  <SheetTab
                    handleSheetClose={handleSheetClose}
                    setLiveLoop={setLiveLoop}
                    setTab={setTab}
                    setSheetVisible={setSheetVisible}
                    channelId={channelId}
                    joinLiveLoop={joinLiveLoop}
                    setIsWaiting={setIsWaiting}
                    // setRemainingTime={setRemainingTime}
                  />
                </Grid>
              </Grid>
            </animated.div>
          ) : (
            ""
          )
        )}
      </div>

      <Grid
        item
        container
        alignItems="center"
        className={classes.bottomNavContainer}
      >
        {liveLoop ? (
          dateStarted && (
            <>
              {" "}
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.skipButton}
                    onClick={() => setLiveLoop(false)}
                  >
                    Skip
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className={classes.extendButton}
                    startIcon={
                      <img
                        src={image.stopwatch}
                        className={classes.stopwatchIcon}
                        alt=""
                      />
                    }
                  >
                    Extend
                  </Button>
                </Grid>
              </Grid>
            </>
          )
        ) : (
          <Tabs
            value={tab}
            onChange={handleTab}
            variant="fullWidth"
            style={{ display: liveloop ? "none" : "" }}
            classes={{ root: classes.tabs }}
          >
            <Tab
              className={classes.tab}
              disableRipple
              icon={
                <img
                  src={image.bulb}
                  alt="like-icon"
                  className={classes.tabIcon}
                />
              }
              onClick={() => setSheetVisible(true)}
            />
            <Tab
              className={classes.tab}
              disableRipple
              icon={
                <img
                  src={image.adduser}
                  alt="adduser-icon"
                  className={classes.tabIcon}
                />
              }
              onClick={() => setSheetVisible(true)}
            />
            <Tab
              className={classes.tab}
              disableRipple
              icon={
                <img
                  src={tab === 2 ? image.liveloopActive : image.stopwatch}
                  alt="liveloop-icon"
                  className={classes.tabIcon}
                />
              }
              onClick={handleLoopClick}
            />
            <Tab
              className={classes.tab}
              disableRipple
              icon={
                <img
                  src={tab === 3 ? image.vsRed : image.vsWhite}
                  alt="vs-icon"
                  className={classes.tabIcon}
                />
              }
              onClick={handleVsClick}
            />
          </Tabs>
        )}
      </Grid>
      <Dialog
        open={openDialog}
        className={classes.dialog}
        onClose={() => setOpenDialog(false)}
      >
        <Grid
          item
          container
          className={classes.dialogContainer}
          direction="column"
        >
          <Typography className={classes.dialogTitle}>Live Loop</Typography>
          <Typography className={classes.dialogSubtitle}>
            Please end stream to start Live Loop!
          </Typography>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.dialogButtons}
              onClick={() => {
                endStream();
                setOpenDialog(false);
              }}
            >
              End Stream
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.dialogButtons}
              onClick={handleNotNow}
            >
              Not Now
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
};
