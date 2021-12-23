import React, { useState } from "react";
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
  InputBase,
  Dialog,
  Button,
} from "@material-ui/core";
import image from "../../assets/index";
import { useTransition, animated } from "react-spring";
// import { Gems } from "../BottomSheetComponents/Gems/Gems";
import { Guest } from "../BottomSheetComponents/Guest/Guest";
import { Refil } from "../BottomSheetComponents/Refill/Refil";
// import { BuyGems } from "../BottomSheetComponents/BuyGems/BuyGems";
import GemsAward from "../BottomSheetComponents/GemsAward/GemsAward";
import { makeGuestRequest } from "../../http";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "73%",
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "25px",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down(1680)]: {
      width: "80%",
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
    [theme.breakpoints.down("lg")]: {
      height: "50px",
    },
    [theme.breakpoints.down("md")]: {
      height: "45px",
    },
  },
  heading: {
    fontSize: "1.75rem",
    textAlign: "center",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.25rem",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#FFF2EB",
    padding: "2rem 1.5rem",
    position: "relative",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem",
    },
  },
  bottomNavContainer: {
    backgroundColor: "#3E3E3E",
    height: "100px",
    borderRadius: "0 0 25px 25px",
    padding: "0 1rem",
    [theme.breakpoints.down("lg")]: {
      height: "60px",
    },
  },

  name: {
    fontSize: "15px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "11px",
    },
  },
  warningText: {
    fontWeight: 300,
    fontSize: "18px",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "18px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "12px",
      padding: "0.75rem",
    },
  },
  warningIcons: {
    width: "3.5rem",
    height: "3.5rem",
    [theme.breakpoints.down("lg")]: {
      width: "2.5rem",
      height: "2.5rem",
    },
  },
  inputContainer: {
    backgroundColor: "white",
    height: "55px",
    borderRadius: "33px",
    [theme.breakpoints.down("lg")]: {
      height: "35px",
    },
  },
  inputBase: {
    width: "70%",
    margin: "auto 0",
    marginLeft: "25px",
    fontSize: "21px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginLeft: "15px",
    },
  },
  sendBtn: {
    width: "50px ",
    height: "50px",
    marginRight: "10px",
    [theme.breakpoints.down("lg")]: {
      width: "30px",
      height: "30px",
    },
  },
  sendButtonIcon: {
    [theme.breakpoints.down("lg")]: {
      width: "1.75rem",
    },
  },
  tabs: {
    marginLeft: "0.5rem",
    width: "100%",
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
      width: "100%",
    },
  },
  tab: {
    minWidth: 8,
    marginInline: "0px",
    [theme.breakpoints.down("lg")]: {
      minWidth: "10px",
      width: "25px",
      marginInline: "10px",
    },
  },
  tabIcons: {
    width: "2rem",
    [theme.breakpoints.down("lg")]: {
      width: "1.5rem",
    },
  },
  bottomSheet: {
    position: "absolute",
    bottom: "0px",
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
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  downButton: {
    margin: "0.5rem 0",
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
    height: "530px",
    [theme.breakpoints.down(1680)]: {
      height: "380px",
    },
    width: "100%",
    backgroundColor: theme.palette.common.lightPink,
    overflowY: "scroll",
  },
  sheetInner: {
    marginTop: "5rem",
    backgroundColor: theme.palette.common.lightPink,
    borderRadius: "47px 47px 0 0",
    [theme.breakpoints.down("lg")]: {
      marginTop: "3.5rem",
    },
  },
  requestDialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
      borderRadius: "10px",
    },
  },
  dialogContainer: {
    width: "380px",
    height: "350px",
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
  dialogButton: {
    width: "250px",
    height: "55px",
    borderRadius: "28px",
    textTransform: "none",
    fontSize: "20px",
    marginBlock: "10px",
  },
}));

export const ViewerBox = ({ streamId, streamer, setCoHostId }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const user = useSelector((state) => state.auth.user.data);

  const handleTab = (event, newTab) => {
    setTab(newTab);
  };
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [sheetVisible, setSheetVisible] = useState(false);
  // eslint-disable-next-line
  const [requested, setRequested] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const transition = useTransition(sheetVisible, {
    from: { height: "0%", opacity: 0 },
    enter: { height: "100%", opacity: 1 },
    leave: { height: "0%", opacity: 0 },
  });
  const handleRequest = async () => {
    try {
      const apiData = {
        user: {
          username: user.username,
          userId: user._id,
          image: user.profile_image,
        },
        id: streamId,
        type: "request",
      };
      // eslint-disable-next-line
      const { data } = await makeGuestRequest(apiData);
      setOpenDialog(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const tabs = {
    0: Guest,
    1: Refil,
    // 2: BuyGems,
    2: GemsAward,
  };
  const TabComponent = tabs[tab];
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
            <Grid item contianer>
              <Grid item container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <span className={classes.name}>Katie Young</span>
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
                    src={image.img}
                    alt="warning-icon"
                    className={classes.warningIcons}
                  />
                </Grid>
                <Grid item xs={10} className={classes.warningTextContainer}>
                  <Typography className={classes.warningText} variant="h3">
                    Hi, how is it going?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item contianer>
              <Grid item container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                  <span className={classes.name}>Amanda Winters</span>
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
                    src={image.img}
                    alt="warning-icon"
                    className={classes.warningIcons}
                  />
                </Grid>
                <Grid item xs={10} className={classes.warningTextContainer}>
                  <Typography className={classes.warningText} variant="h3">
                    This seems interesting!
                  </Typography>
                </Grid>
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
                <Grid item container className={classes.sheetInner}>
                  <Grid item container justifyContent="center">
                    <IconButton
                      onClick={() => setSheetVisible(false)}
                      className={classes.downButton}
                    >
                      <img
                        className={classes.downIcon}
                        src={image.downArrowBlue}
                        alt="down-arrow"
                      />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.sheetContent}>
                    <TabComponent setCoHostId={setCoHostId} />
                  </Grid>
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
        <Grid
          item
          container
          className={classes.inputContainer}
          style={{ width: "60%" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <InputBase
            className={classes.inputBase}
            placeholder="Say Something"
          />
          <Grid item>
            <IconButton className={classes.sendBtn}>
              <img
                src={image.sendBlue}
                className={classes.sendButtonIcon}
                alt=""
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item style={{ width: "40%" }}>
          <Tabs className={classes.tabs} value={tab} onChange={handleTab}>
            <Tab
              onClick={() => setOpenDialog(true)}
              className={classes.tab}
              icon={
                <img src={image.adduser} className={classes.tabIcons} alt="" />
              }
            />
            <Tab
              onClick={() => setSheetVisible(true)}
              className={classes.tab}
              icon={
                <img src={image.likebn} className={classes.tabIcons} alt="" />
              }
            />
            <Tab
              onClick={() => setSheetVisible(true)}
              className={classes.tab}
              icon={<img src={image.gem} className={classes.tabIcons} alt="" />}
            />
          </Tabs>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        className={classes.requestDialog}
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          className={classes.dialogContainer}
        >
          <Typography className={classes.dialogTitle}>
            Join as a Guest
          </Typography>
          <Typography className={classes.dialogSubtitle}>
            Let {streamer} know you would like to join the fun!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.dialogButton}
            onClick={handleRequest}
          >
            Request
          </Button>
        </Grid>
      </Dialog>
    </Grid>
  );
};
