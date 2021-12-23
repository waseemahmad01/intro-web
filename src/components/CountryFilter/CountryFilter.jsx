import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  Dialog,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import image from "../../assets";

import * as allCounrtry from "country-flag-emoji-json";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBlock: "27px",
    width: "480px",
  },
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: theme.palette.common.lightPink,
    },
  },
  titleContainer: {
    paddingInline: "24px",
  },
  header: {
    margin: 0,
    color: "#828282",
    fontSize: "18px",
    lineHeight: "45px",
    width: "100%",
    borderBottom: "1px solid #828282",
    "& span": {
      fontSize: "13px",
      paddingLeft: "5px",
    },
  },
  optionContainer: {
    paddingInline: "24px",
    marginBlock: "24px",
    maxHeight: "65vh",
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
      maxHeight: "55vh",
    },
  },
  formControll: {
    width: "100%",
    marginLeft: "0",
    marginBlock: "10px",
    justifyContent: "space-between",
    "& .MuiFormControlLabel-label": {
      marginBottom: "0",
    },
  },
  option: {
    color: "#000000",
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  buttonsContainer: {
    paddingInline: "24px",
    marginTop: "80px",
    [theme.breakpoints.down("lg")]: {
      marginTop: "30px",
    },
  },
  setButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
  },
  cancelButton: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    marginRight: "0.75rem",
  },
  img: {
    width: "30px",
    marginRight: "10px",
  },
  div: {
    display: "flex",
    alignItems: "center",
  },
}));

export const CountryFilter = ({
  setValue,
  open,
  onClose,
  update,
  setUpdate,
  setIsAnyOpen,
}) => {
  const classes = useStyles();
  let obj = {};
  //   console.log(allCounrtry.default);
  allCounrtry.default.foreach((country) => {
    obj[country.name] = false;
  });
  const [state, setState] = useState(obj);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    setState({ ...state, [name]: checked });
  };
  const handleSet = () => {
    let filters = [];
    for (const [key, value] of Object.entries(state)) {
      if (value) filters.push(key);
    }
    setValue(filters);
    setState(obj);
    setUpdate(update + 1);
    setIsAnyOpen(false);
    onClose(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      className={classes.dialog}
    >
      <Grid item container direction="column" className={classes.container}>
        <Grid item container className={classes.titleContainer}>
          <Typography className={classes.header}>
            Country <span>(You can choose multiple options)</span>
          </Typography>
        </Grid>
        <Grid item container className={classes.optionContainer}>
          {allCounrtry.default.map((country, index) => (
            <Grid item container key={index} className={classes.margin}>
              <FormControlLabel
                className={classes.formControll}
                onChange={handleChange}
                label={
                  <div className={classes.div}>
                    <img src={country.image} className={classes.img} alt="" />
                    <span
                      className={
                        state[country.name] ? classes.active : classes.option
                      }
                    >
                      {country.name}
                    </span>
                  </div>
                }
                control={
                  <Checkbox
                    name={country.name}
                    className={classes.checkBox}
                    color="primary"
                    checkedIcon={<img src={image.checkIcon} alt="" />}
                    icon={<img src={image.unCheck} alt="" />}
                  />
                }
                labelPlacement="start"
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          className={classes.buttonsContainer}
        >
          <Button
            onClick={() => {
              onClose(false);
              setIsAnyOpen(false);
            }}
            className={classes.cancelButton}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            className={classes.setButton}
            onClick={handleSet}
            variant="text"
            color="primary"
          >
            Set
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};
