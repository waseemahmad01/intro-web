import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Dialog,
  Button,
} from "@material-ui/core";
import QuickMessage from "../quickMessage/QuickMessage";

const QuickMessageDialog = ({
  open,
  setOpen,
  username,
  setQuickMessage,
  sendMessage,
}) => {
  const classes = useStyles();
  const quickMessageList = [
    `Hi ${username}, how are you?🖐`,
    `Hey there! Any luck meeting someone off of Intro yet?`,
    `How it is going ${username}?`,
    `Hey ${username}? How is your night going?`,
    `Hi ${username}? How is your day going?`,
    `Hi ${username}! Any fun plans coming up?`,
    `Hi ${username}, hope you've having a nice day?`,
    `How are you doing ${username} ?`,
  ];
  const handleSelectQuickMessage = (e) => {
    setQuickMessage(e.target.value);
  };
  return (
    <Dialog open={open} className={classes.dialog}>
      <Grid container direction="column" className={classes.container}>
        <Typography className={classes.title}>Quick Message</Typography>
        <Grid
          item
          direction="column"
          container
          wrap="nowrap"
          className={classes.quickMessageContainer}
        >
          {quickMessageList.map((item, index) => (
            <QuickMessage
              label={item}
              name="msg"
              id={index}
              key={index}
              value={item}
              handleShow={handleSelectQuickMessage}
            />
          ))}
        </Grid>
        <Grid item container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={sendMessage ? sendMessage : () => setOpen(false)}
          >
            Select
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default QuickMessageDialog;

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "30px",
      backgroundColor: "#ffffff",
    },
  },
  container: {
    paddingBlock: "23px",
    width: "410px",
    height: "570px",
  },
  title: {
    color: "#000000",
    margin: 0,
    fontSize: "27px",
    fontWeight: "600",
    marginBottom: "16px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "20px",
    },
  },
  quickMessageContainer: {
    display: "flex",
    paddingInline: "2rem",
    height: "380px",
    overflowY: "scroll",
  },
  button: {
    width: "275px",
    height: "46px",
    textTransform: "none",
    fontSize: "19px",
    borderRadius: "29px",
    marginTop: "2rem",
    [theme.breakpoints.down(1680)]: {
      width: "220px",
      height: "36px",
      fontSize: "13px",
    },
  },
}));
