import React from "react";
import {
  makeStyles,
  Grid,
  Button,
  Typography,
  Dialog,
} from "@material-ui/core";
import { unblockUser, getUser } from "../../http";
import { useDispatch } from "react-redux";
import { submit } from "../../store/user";

const Unblock = ({ open, setOpen, user_id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleUnblock = async () => {
    try {
      await unblockUser(user_id);
      const res = await getUser();
      dispatch(submit(res.data));
      setOpen(false);
    } catch (err) {
      alert("Something went wrong");
      console.log(err.message);
    }
  };
  return (
    <Dialog open={open} className={classes.dialog}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        className={classes.container}
        justifyContent="space-between"
      >
        <Grid item container direction="column">
          <Typography className={classes.title}>User Blocked</Typography>
          <Typography className={classes.subtitle}>
            This user is in your block list. Unblock user to send message
          </Typography>
        </Grid>
        <Grid item container direction="column">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleUnblock}
          >
            Unblock
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={`${classes.button} ${classes.marginTop}`}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Unblock;

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      borderRadius: "10px",
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  container: {
    width: "320px",
    height: "350px",
    padding: "2rem",
  },
  title: {
    margin: 0,
    fontSize: "30px",
    background: "-webkit-linear-gradient(#654AAB, #E77783)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: "18px",
    color: "#000000",
    marginTop: "1.5rem",
  },
  button: {
    height: "50px",
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "30px",
    textTransform: "none",
    fontWeight: "700",
    fontSize: "16px",
    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  marginTop: {
    marginTop: "1rem",
  },
}));
