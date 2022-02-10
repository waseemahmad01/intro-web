import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBlock: "27px",
    width: "380px",
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
    textAlign: "left",
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
    fontSize: "18px",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  active: {
    color: theme.palette.primary.main,
    fontSize: "18px",
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
}));

export const FilterDialog = ({
  options,
  setValue,
  open,
  onClose,
  title,
  update,
  setUpdate,
  setIsAnyOpen,
  value: filterValue = [],
}) => {
  // console.log("logging", value);
  const classes = useStyles();
  let obj = {};
  // eslint-disable-next-line
  options.forEach((option) => {
    obj[option] = false;
  });
  // const [options]
  const [state, setState] = useState(obj);
  const [filterChanged, setFilterChanged] = useState(false);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    // console.log(checked);
    setState({ ...state, [name]: checked });
  };
  const handleSet = () => {
    let filters = [];
    for (const [key, value] of Object.entries(state)) {
      // console.log(key, value);
      if (value) filters.push(key);
    }
    setValue(filters);
    // setState(obj);
    setFilterChanged(!filterChanged);
    setUpdate(update + 1);
    setIsAnyOpen(false);
    onClose(false);
  };
  useEffect(() => {
    let obj = {};
    // eslint-disable-next-line
    options.forEach((option) => {
      obj[option] = false;
    });
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (filterValue.indexOf(key) > -1) {
        obj[key] = true;
      }
    });
    // console.log("running");
    setState(obj);
    // console.log(obj);
  }, [filterChanged]);
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      className={classes.dialog}
    >
      <Grid item container direction="column" className={classes.container}>
        <Grid item container className={classes.titleContainer}>
          <Typography className={classes.header}>
            {title} <span>(You can choose multiple options)</span>
          </Typography>
        </Grid>
        <Grid item container className={classes.optionContainer}>
          {options.map((option, index) => (
            <Grid item container key={index} className={classes.margin}>
              <FormControlLabel
                className={classes.formControll}
                onChange={handleChange}
                label={
                  <span
                    className={state[option] ? classes.active : classes.option}
                  >
                    {option}
                  </span>
                }
                control={
                  <Checkbox
                    name={option}
                    className={classes.checkBox}
                    color="primary"
                    checked={Boolean(state[option])}
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
