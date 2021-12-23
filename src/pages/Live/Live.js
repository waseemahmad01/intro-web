import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Close,
  Block,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@material-ui/icons";
import { TopBar } from "../../components/TopBar/TopBar";
import { LiveFilter } from "../../components/LiveFilter/LiveFilter";
import { liveStreamUsers } from "../../http/index";
import { useSelector } from "react-redux";
import { onMessageListener } from "../../firebaseInit";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.common.lightPink,
    padding: "0rem",
  },
  topbarContainer: {
    width: "100%",
  },
  hero: {
    backgroundColor: "#fff",
    borderRadius: "54px",
    boxShadow: theme.shadows[5],
    marginBottom: "5px",
    padding: "2rem 0rem 0rem 0rem",
    height: "calc(100vh - 128px)",
    [theme.breakpoints.down("lg")]: {
      borderRadius: "33px",
      height: "calc(100vh - 90px)",
      padding: "1rem 0rem 0rem 0rem",
    },
  },
  tabs: {
    justifyContent: "center",
    "& .MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    "& .MuiTab-textColorSecondary": {
      color: theme.palette.primary.main,
    },
    "& .MuiTab-textColorSecondary.Mui-selected": {
      color: "#fff",
    },
    // height: "70px",
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
      height: "60px",
      [theme.breakpoints.down("lg")]: {
        height: "40px",
      },
    },
  },
  tab: {
    backgroundColor: "#FBFBFB",

    borderRadius: "27px",
    marginTop: "3px",
    boxShadow: theme.shadows[3],
    margin: "0 1rem",
    textTransform: "none",
    fontSize: "23px",
    fontWeight: "500",
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "18px",
      marginInline: "0.5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px",
      marginInline: "0.37rem",
    },
  },
  tabsRoot: {
    minWidth: "40px",
    minHeight: "20px",
    width: "162px",
    height: "53px",
    [theme.breakpoints.down("lg")]: {
      height: "40px",
      width: "120px",
    },
    [theme.breakpoints.down("md")]: {
      height: "35px",
      width: "100px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "30px",
      width: "80px",
    },
  },
  tabsContainer: {
    width: "100%",
  },
  padding: {
    padding: "0rem 10rem",
  },
  goLiveButton: {
    position: "fixed",
    bottom: 40,
    backgroundColor: theme.palette.primary.main,
    textTransform: "none",
    color: "#fff",
    width: "231px",
    height: "68px",
    borderRadius: "36px",
    fontSize: "36px",
    fontWeight: 700,
    boxShadow: theme.shadows[5],
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down(1579)]: {
      width: "140px",
      height: "50px",
      fontSize: "24px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90px",
      height: "40px",
      fontSize: "15px",
    },
  },
  dialog: {
    "& .MuiDialog-paper": {
      padding: "none",
      borderRadius: "20px",
    },
  },
  contentContainer: {
    backgroundColor: theme.palette.common.lightPink,
    marginInline: "auto",
    paddingBottom: "4.5rem",
    borderRadius: "20px",
    [theme.breakpoints.down("lg")]: {
      paddingBottom: "2rem",
      width: "500px",
    },
  },
  dialogContent: {
    padding: "0",
    "&:first-child": {
      paddingTop: "0",
    },
  },

  dialogTitle: {
    fontSize: "2rem",
    textTransform: "none",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
      marginBottom: "0.25rem",
    },
  },
  dialogSubtitle: {
    fontSize: "1.25rem",
    width: "32ch",
    textAlign: "center",
    fontWeight: "300",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  innerContent: {
    boxSizing: "border-box",
    width: "100%",
  },
  warningContainer: {
    width: "230px",
    [theme.breakpoints.down("lg")]: {
      width: "180px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "160px",
    },
  },
  warning: {
    fontSize: "1.125rem",
    marginLeft: "0.5rem",
    marginBottom: "0.5rem",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.9rem",
      marginBottom: "0.25rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  blockIcon: {
    color: "#FF6464",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1rem",
      marginBottom: "0.25rem",
    },
  },
  checkbox: {
    height: "1.1rem",
    width: "1.1rem",
    backgroundColor: "#fff",
    borderRadius: "4px",
    marginTop: "0.25rem",
    "&:hover": {
      backgroundColor: "#fff",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "0.8rem",
      minWidth: "0.8rem",
    },
  },
  checkboxChecked: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  checkboxUncheck: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  policyContainer: {
    marginTop: "2rem",
    [theme.breakpoints.down("lg")]: {
      marginTop: "1.5rem",
      width: "95%",
    },
  },
  policy: {
    fontSize: "0.75rem",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.65rem",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.5rem",
      marginLeft: "5px",
    },
  },
  gotItButton: {
    width: "265px",
    height: "63px",
    borderRadius: "38px",
    marginTop: "1rem",
    fontSize: "1.375rem",
    textTransform: "none",
    [theme.breakpoints.down("lg")]: {
      height: "45px",
      width: "180px",
      fontSize: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "35px",
      width: "120px",
      fontSize: "0.8rem",
    },
  },
  closeIconButton: {
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      marginRight: "0.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0rem",
    },
  },
  closeButton: {
    fontWeight: 700,
    fontSize: "2.5rem",
    color: "#000",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.75rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  internalContainer: {
    padding: "0 2rem",
    [theme.breakpoints.down("lg")]: {
      padding: "0 6rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0 5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 3rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },
  overflowContainer: {
    paddingTop: "1rem",
    marginTop: "1rem",
    maxHeight: "calc(100% - 100px)",
    overflowY: "auto",
    overflowX: "hidden",
    [theme.breakpoints.down("lg")]: {
      paddingTop: "1rem",
      // maxHeight: "calc(100% - 64px)",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      maxHeight: "50%",
      height: "50%",
    },
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.common.darkPink,
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-button ": {
      width: "14px", //for horizontal scrollbar
      height: "14px", //for vertical scrollbar
    },
  },
}));
export const Live = () => {
  const classes = useStyles();
  const [liveUsers, setLiveUsers] = useState([]);
  const user = useSelector((state) => state.auth.user.data);
  let preference = user.date_preference.interested_gender;
  const getPreference = () => {
    if (preference === "men") {
      return 1;
    } else if (preference === "women") {
      return 0;
    } else {
      return 2;
    }
  };

  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState(`?trending=${true}`);
  const [openDialog, setOpenDialog] = useState(false);
  const [fetchQuery, setFetchQuery] = useState(false);
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleTabs = (event, newTab) => {
    setTab(newTab);
  };
  const fetchData = async (query) => {
    try {
      const { data } = await liveStreamUsers(query);
      setLiveUsers(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const tabs = {
    0: LiveFilter,
    1: LiveFilter,
    2: LiveFilter,
    3: LiveFilter,
    4: LiveFilter,
  };
  const Component = tabs[tab];
  useEffect(() => {
    fetchData(query);
  }, [query]);
  useEffect(() => {
    onMessageListener().then((message) => {
      fetchData(query);
      setFetchQuery(!fetchQuery);
    });
    // eslint-disable-next-line
  }, [fetchQuery]);
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.topbarContainer}>
        <TopBar live />
        <Grid item className={classes.padding}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.hero}
          >
            <Grid item className={classes.tabsContainer}>
              <Tabs
                onChange={handleTabs}
                value={tab}
                textColor="secondary"
                className={classes.tabs}
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab
                  onClick={() => setQuery(`?trending=${true}`)}
                  label="Trending"
                  className={classes.tab}
                  classes={{ root: classes.tabsRoot }}
                />
                <Tab
                  onClick={() => setQuery(`?date=${getPreference()}`)}
                  label="Date"
                  className={classes.tab}
                  classes={{ root: classes.tabsRoot }}
                />
                <Tab
                  onClick={() =>
                    setQuery(
                      `?nearby=${true}&lat=${user.location.lat}&long=${
                        user.location.lon
                      }&distance=10`
                    )
                  }
                  label="Nearby"
                  className={classes.tab}
                  classes={{ root: classes.tabsRoot }}
                />

                <Tab
                  onClick={() => setQuery(`?status=${true}`)}
                  label="New"
                  classes={{ root: classes.tabsRoot }}
                  className={classes.tab}
                />
                <Tab
                  onClick={() => setQuery(`?favorites=${true}`)}
                  label="Favourite"
                  className={classes.tab}
                  classes={{ root: classes.tabsRoot }}
                />
              </Tabs>
            </Grid>
            <Grid
              item
              container
              style={{ flexGrow: 1 }}
              className={classes.overflowContainer}
            >
              <Component liveUsers={liveUsers} />
            </Grid>
            <Dialog
              classes={{ root: classes.dialog }}
              open={openDialog}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogContent className={classes.dialogContent}>
                <Grid container className={classes.contentContainer}>
                  <Grid item container justifyContent="flex-end">
                    <IconButton
                      className={classes.closeIconButton}
                      onClick={toggleDialog}
                    >
                      <Close className={classes.closeButton} />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    container
                    className={classes.internalContainer}
                    direction="column"
                    alignItems="center"
                  >
                    <Typography className={classes.dialogTitle} variant="h3">
                      Let's get livestreaming!
                    </Typography>
                    <Typography
                      className={classes.dialogSubtitle}
                      variant="subtitle1"
                      paragraph
                    >
                      Introduce the real you and get a date, but don't stream
                    </Typography>
                    <Grid
                      item
                      container
                      className={classes.warningContainer}
                      direction="column"
                    >
                      <Grid item container>
                        <span>
                          <Block className={classes.blockIcon} />
                        </span>
                        <Typography className={classes.warning} variant="h5">
                          Nudity or Pornography
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <span>
                          <Block className={classes.blockIcon} />
                        </span>
                        <Typography className={classes.warning} variant="h5">
                          Hate speech or bullying
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <span>
                          <Block className={classes.blockIcon} />
                        </span>
                        <Typography className={classes.warning} variant="h5">
                          Illegal activity
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <span>
                          <Block className={classes.blockIcon} />
                        </span>
                        <Typography className={classes.warning} variant="h5">
                          Minors
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      className={classes.policyContainer}
                    >
                      <Grid item style={{ marginRight: "1rem" }}>
                        <Checkbox
                          className={classes.checkbox}
                          onChange={handleChange}
                          checked={checked}
                          icon={
                            <CheckBoxOutlineBlankIcon
                              className={classes.checkboxUncheck}
                            />
                          }
                          checkedIcon={
                            <CheckBoxIcon className={classes.checkboxChecked} />
                          }
                          name="checkbox"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.policy} variant="h5">
                          agree to the INTRO Terms of Service and the INTRO{" "}
                          <br />
                          Content & Conduct Policy and understand the <br />{" "}
                          breaking the rules may results in account removal.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        className={classes.gotItButton}
                        color="primary"
                        onClick={toggleDialog}
                        component={Link}
                        to={`/stream`}
                        disabled={!checked}
                      >
                        Got it
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            <Button
              onClick={toggleDialog}
              variant="contained"
              className={classes.goLiveButton}
            >
              Go Live!
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
