import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Picker from "react-mobile-picker-scroll";

const DatePicker = ({ setDate }) => {
  const classes = useStyles();
  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auguest",
    "September",
    "October",
    "Nevember",
  ];
  const date = new Date(Date.now());
  const [value, setValue] = useState({
    month: months[date.getMonth()],
    day: date.getDate(),
    year: date.getFullYear(),
  });
  const [change, setChange] = useState(false);
  const getDays = () => {
    if (
      value.month === "January" ||
      value.month === "March" ||
      value.month === "May" ||
      value.month === "July" ||
      value.month === "August" ||
      value.month === "October" ||
      value.month === "December"
    ) {
      if (
        value.month === months[date.getMonth()] &&
        value.year === date.getFullYear()
      ) {
        let days = [];
        for (let i = date.getDate(); i <= 31; i++) {
          days.push(i);
        }
        return days;
      } else {
        return Array.from({ length: 31 }, (_, i) => i + 1);
      }
    } else if (value.month === "Feburary") {
      if (value.year % 4 === 0) {
        if (
          value.month === months[date.getMonth()] &&
          value.year === date.getFullYear()
        ) {
          let days = [];
          for (let i = date.getDate(); i <= 29; i++) {
            days.push(i);
          }
          return days;
        } else {
          return Array.from({ length: 29 }, (_, i) => i + 1);
        }
      } else {
        if (
          value.month === months[date.getMonth()] &&
          value.year === date.getFullYear()
        ) {
          let days = [];
          for (let i = date.getDate(); i <= 28; i++) {
            days.push(i);
          }
          return days;
        } else {
          return Array.from({ length: 28 }, (_, i) => i + 1);
        }
      }
    } else {
      if (
        value.month === months[date.getMonth()] &&
        value.year === date.getFullYear()
      ) {
        let days = [];
        for (let i = date.getDate(); i <= 30; i++) {
          days.push(i);
        }
        return days;
      } else {
        return Array.from({ length: 30 }, (_, i) => i + 1);
      }
    }
  };

  const getYears = () => {
    let years = [];
    let currentYear = date.getFullYear();
    for (let i = 0; i <= 50; i++) {
      years.push(currentYear);
      currentYear++;
    }
    return years;
  };

  const handleChange = (name, v) => {
    setValue({ ...value, [name]: v });
    setChange(!change);
  };
  const [options, setOptions] = useState({
    month: months,
    day: getDays(),
    year: getYears(),
  });
  useEffect(() => {
    setOptions((perv) => ({ ...perv, day: getDays() }));
    // console.log(
    //   new Date(`${months.indexOf(value.month) + 1}/${value.day}/${value.year}`)
    // );
    setDate({
      month: months.indexOf(value.month) + 1,
      day: value.day,
      year: value.year,
    });
  }, [change]);
  return (
    <Grid container className={classes.container}>
      <Picker
        optionGroups={options}
        valueGroups={value}
        onChange={handleChange}
        height={120}
      />
    </Grid>
  );
};

export default DatePicker;

const useStyles = makeStyles((theme) => ({
  container: {
    "& .picker-item": {
      fontSize: "20px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "17px",
      },
      "&.picker-item-selected": {
        color: "#D5616D !important",
      },
    },
    "& .picker-highlight": {
      "&:before": {
        background: "#000000",
      },
      "&:after": {
        background: "#000000",
      },
    },
  },
}));
