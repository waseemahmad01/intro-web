import React from "react";
import {
  makeStyles,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  ListItemSecondaryAction as Action,
  Button,
  Typography,
} from "@material-ui/core";
import image from "../../assets/index";
import { Close } from "@material-ui/icons";

const InstantSpark = ({ open, setOpen }) => {
  const classes = useStyles();
  return (
    <Dialog
      className={classes.superDialog}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.superDialogContainer}
      >
        <Grid item container justifyContent="flex-end">
          <IconButton
            onClick={() => setOpen(false)}
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
  );
};

export default InstantSpark;

const useStyles = makeStyles((theme) => ({
  superDialog: {
    "& .MuiDialog-paper": {
      borderRadius: "47px",
    },
  },
  superDialogContainer: {
    backgroundColor: theme.palette.common.lightPink,
    padding: "1.5rem",
    width: "523px",
    [theme.breakpoints.down("lg")]: {
      width: "350px",
    },
  },
  superDialogTitle: {
    color: "#000",
    margin: "0",
    fontSize: "31px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "23px",
    },
  },
  superDialogSubtitle: {
    color: "#474747",
    margin: "0",
    fontSize: "19px",
    lineHeight: "10px",
    marginBottom: "1rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
      marginBottom: "0.5rem",
    },
  },
  listItem: {
    padding: "0.5rem 0",
    [theme.breakpoints.down("lg")]: {
      padding: "0",
    },
  },
  listItemText: {
    marginLeft: "0.5rem",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0",
    },
    "& .MuiListItemText-primary": {
      color: theme.palette.common.crimson,
      fontSize: "22px",
      textAlign: "left",
      [theme.breakpoints.down("lg")]: {
        fontSize: "15px",
      },
    },
    "& .MuiListItemText-secondary": {
      color: "#000",
      textAlign: "left",
      fontSize: "19px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "13px",
      },
    },
  },
  image: {
    width: "5rem",
    [theme.breakpoints.down("lg")]: {
      width: "3rem",
    },
  },
  button: {
    width: "108px",
    height: "38px",
    borderRadius: "38px",
    fontSize: "17px",
    textTransform: "none",
    [theme.breakpoints.down("lg")]: {
      width: "80px",
      height: "28px",
      fontSize: "13px",
    },
  },
  action: {
    borderRadius: "38px",
    boxShadow: "3px 3px 10px #000000",
  },
  superLikeActiveIcon: {
    width: "60px",
    marginBottom: "-14px",
    [theme.breakpoints.down("lg")]: {
      width: "40px",
      marginBottom: "-10px",
    },
  },
  superLikeIcon: {
    [theme.breakpoints.down("lg")]: {
      height: "2rem",
    },
  },
}));
