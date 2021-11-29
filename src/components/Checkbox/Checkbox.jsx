import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  switch: {
    "-webkit-apperance": "none",
    appearance: "none",
    height: "28px",
    width: "59px",
    backgroundColor: "#fff",
    border: `1px solid #707070`,
    borderRadius: "20px",
    cursor: "pointer",
    position: "relative",

    [theme.breakpoints.down(1680)]: {
      height: "20px",
      width: "40px",
    },
    [theme.breakpoints.down("md")]: {
      height: "15px",
      width: "30px",
    },
    "&:before": {
      content: '""',
      height: "22px",
      width: "22px",
      backgroundColor: "#636363",
      position: "absolute",
      borderRadius: "50%",
      left: "2px",
      top: "2px",
      transition: "0.3s ease",
      [theme.breakpoints.down(1680)]: {
        height: "16px",
        width: "16px",
        left: "1px",
        top: "1px",
      },
      [theme.breakpoints.down("md")]: {
        height: "11px",
        width: "11px",
      },
    },
    "&:checked": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    "&:checked:before": {
      content: '""',
      height: "22px",
      width: "22px",
      backgroundColor: "#fff",
      position: "absolute",
      borderRadius: "50%",
      left: "32px",
      top: "2px",
      transition: "0.3s ease",
      [theme.breakpoints.down(1680)]: {
        height: "16px",
        width: "16px",
        left: "21px",
        top: "1px",
      },
      [theme.breakpoints.down("md")]: {
        height: "11px",
        width: "11px",
        left: "16.5px",
      },
    },
  },
  circle: {
    appearance: "none",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    border: "2px solid #cecece",
    position: "relative",
    transition: "0.3s ease",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      width: "21px",
      height: "21px",
    },
    "&:checked": {
      borderColor: theme.palette.primary.main,
    },
    "&:checked:before": {
      content: '""',
      height: "14px",
      width: "14px",
      backgroundColor: theme.palette.primary.main,
      position: "absolute",
      borderRadius: "50%",
      left: "4px",
      top: "4px",
      transition: "0.3s ease",
      [theme.breakpoints.down("lg")]: {
        height: "11px",
        width: "11px",
        left: "3px",
        top: "3px",
      },
    },
  },
}));

export const Checkbox = ({ variant, style, show, handleShow, name }) => {
  const classes = useStyles();
  return (
    <input
      type="checkbox"
      style={style}
      className={classes[variant]}
      name=""
      id=""
      checked={show}
      name={name}
      onChange={handleShow}
    />
  );
};
