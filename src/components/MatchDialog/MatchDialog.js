import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Avatar,
  Dialog,
  Button,
} from "@material-ui/core";
import image from "../../assets/index";
import { AvatarGroup } from "@material-ui/lab";

const MatchDialog = ({
  open,
  setOpen,
  handleQuickMessage,
  handleDate,
  fromImg,
  toImg,
  onContinue,
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} className={classes.dialog}>
      <Grid
        container
        className={classes.dialogContainer}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <AvatarGroup className={classes.avatarGroup} spacing="small">
            <Avatar className={classes.dialogImage} src={fromImg} />
            <Avatar
              style={{ zIndex: 2 }}
              className={classes.dialogImage}
              src={toImg}
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
                <img src={image.date} className={classes.dialogIcon} alt="" />
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
            onClick={() => {
              if (onContinue) {
                onContinue();
              }
              setOpen(false);
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MatchDialog;

const useStyles = makeStyles((theme) => ({
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
  text: {
    fontSize: "12px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "10px",
    },
  },
}));
