import React from "react";
// import { useStyles } from "./selectOptionStyle";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Checkbox } from "../Checkbox/Checkbox";
import image from "../../assets/index";
// import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  menuItem: {
    color: "#000",
    marginBottom: "5px",
    fontSize: "22px",
    "&:hover": {
      backgroundColor: "#e7e7e7",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  selectContainer: {
    width: "456px",
    [theme.breakpoints.down("lg")]: {
      width: "300px",
    },
  },
  select: {
    width: "100%",

    borderRadius: "34px",
    backgroundColor: "#fff",
    fontSize: "22px",
    marginBottom: "10px",
    height: "62px",
    textAlign: "left",
    paddingLeft: "0.4rem",
    "& .MuiSelect-selectMenu": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      // width: "300px",
      height: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      boxShadow: theme.shadows[2],
      border: "1px solid transparent",
      // border: `2px solid ${theme.palette.primary.main}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid transparent",
      // border: `2px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid transparent",
      // border: `2px solid ${theme.palette.primary.main}`,
    },
  },

  inputLabel: {
    marginLeft: "25px",
    padding: "none",
    fontWeight: "300",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
      marginLeft: "14px",
    },
  },
  switchRoot: {},
  switchContainer: {
    marginTop: "-10px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "0px",
    },
    width: "210px",
    "& span": {
      fontSize: "15px",
      marginRight: "20px",
      marginLeft: "15px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "12px",
        marginLeft: "10px",
        marginRight: "10px",
      },
    },
  },
  dropdownIcon: {
    fontSize: "2rem",
    marginRight: "15px",
    fontWeight: "700",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.7rem",
    },
  },
  none: {
    color: "rgba(112,112,112,0.5)",
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "1.3rem",
    marginLeft: "10px",
    marginTop: "5px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
    },
  },
  menu: {
    // backgroundColor: "red",
    "& .MuiMenu-paper": {
      maxHeight: "35vh",
    },
  },
}));
export const SelectOption = ({
  options,
  label,
  checkboxVaraint,
  placeholder,
  show,
  handleShow,
  name,
  onSelect,
  value,
  errorText,
  identify,
  noShow,
  height,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Grid
      container
      spacing={2}
      style={{
        paddingInline: identify ? "1rem 0.8rem" : "",
        marginBottom: identify ? (lgScreen ? "15px" : "30px") : "",
      }}
      direction="column"
    >
      <Grid item style={{ paddingBottom: "0" }}>
        <Typography className={classes.inputLabel} variant="h3">
          {label}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: "0.7rem" }}
      >
        <Grid
          item
          className={classes.selectContainer}
          style={{ minWidth: noShow ? "100%" : "" }}
        >
          <Select
            {...rest}
            value={`${value}`}
            onChange={onSelect}
            variant="outlined"
            className={classes.select}
            color="primary"
            name={name}
            MenuProps={{
              anchorOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
              className: classes.menu,
            }}
            // classes={{ root: classes.selectRoot }}
            inputProps={{
              classes: {
                root: classes.border,
              },
            }}
            IconComponent={() => (
              <img
                className={classes.dropdownIcon}
                src={image.downArrowBlue}
                alt=""
              />
            )}
          >
            <MenuItem dense className={classes.menuItem} value={"0"}>
              <span className={classes.none}>{placeholder}</span>
            </MenuItem>
            {options.map((option) => (
              <MenuItem
                key={option}
                className={classes.menuItem}
                value={`${option}`}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
          {errorText && <span className={classes.error}>{errorText}</span>}
        </Grid>
        {!noShow && !height && (
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-start"
            className={classes.switchContainer}
            style={{ marginLeft: identify ? "auto" : "" }}
          >
            <span>Show on profile</span>
            <Checkbox
              variant={checkboxVaraint}
              name={name}
              show={show}
              handleShow={handleShow}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
