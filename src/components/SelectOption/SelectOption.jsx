import React, { useState } from "react";
// import { useStyles } from "./selectOptionStyle";
import { Grid, Typography, Select, MenuItem } from "@material-ui/core";
import { Checkbox } from "../Checkbox/Checkbox";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

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
    width: "456px",
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
      width: "300px",
      height: "40px",
      fontSize: "15px",
      marginBottom: "0px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: `2px solid ${theme.palette.primary.main}`,
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
    marginRight: "5px",
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
  ...rest
}) => {
  const classes = useStyles();
  const [age, setAge] = useState(1);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container spacing={2} direction="column">
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
        <Grid item className={classes.selectContainer}>
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
              <KeyboardArrowDownIcon className={classes.dropdownIcon} />
            )}
          >
            <MenuItem dense className={classes.menuItem} value={"0"}>
              <em className={classes.none}>{placeholder}</em>
            </MenuItem>
            {options.map((option, index) => (
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
        <Grid
          item
          container
          alignItems="center"
          justifyContent="flex-start"
          className={classes.switchContainer}
        >
          <span>Show on profile</span>
          <Checkbox
            variant={checkboxVaraint}
            name={name}
            show={show}
            handleShow={handleShow}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
