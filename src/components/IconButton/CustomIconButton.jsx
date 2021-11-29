import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import image from "../../assets/index";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    width: "134px",
    height: "85px",
    borderRadius: "43px",
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down("lg")]: {
      width: "80px",
      height: "50px",
      marginTop: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50px",
      height: "35px",
    },
    "&:disabled": {
      backgroundColor: "grey",
    },
  },
  iconImg: {
    [theme.breakpoints.down("lg")]: {
      height: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "20px",
    },
  },
}));

export const CustomIconButton = ({ onClick, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      {...rest}
      onClick={onClick}
      disableRipple
      className={classes.iconButton}
    >
      <img src={image.send} className={classes.iconImg} alt="button-icon" />
    </Button>
  );
};
