import React, { useState } from "react";
import { useStyles } from "../Styles/registerStyles";
import { Grid } from "@material-ui/core";
import image from "../../../assets/index";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { Header } from "../../../components/header/Header";
import { useDispatch } from "react-redux";
import { submit } from "../../../store/user";
import { religion as religionApi, children, step } from "../../../http";
import Joi from "joi-browser";
import { SelectOption } from "../../../components/SelectOption/SelectOption";
import { politics, religion, haveChild, wantChild } from "../../../data";
import axios from "axios";

export const RegisterSix = ({ onNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [show, setShow] = useState({
    religion: true,
    politics: true,
    haveChildren: true,
    wantChildren: true,
  });
  const [values, setValues] = useState({
    religion: "0",
    politics: "0",
    haveChildren: "0",
    wantChildren: "0",
  });
  const [errors, setErrors] = useState({
    religion: "",
    politics: "",
    haveChildren: "",
    wantChildren: "",
  });

  const schema = {
    religion: Joi.string().min(2).required(),
    politics: Joi.string().min(2).required(),
    haveChildren: Joi.string().min(2).required(),
    wantChildren: Joi.string().min(2).required(),
  };

  const validate = () => {
    const result = Joi.validate(values, schema, { abortEarly: false });
    if (!result.error) {
      setErrors({
        religion: "",
        politics: "",
        haveChildren: "",
        wantChildren: "",
      });
      return false;
    } else {
      const errorsObject = {};
      for (let item of result.error.details)
        errorsObject[item.path[0]] = `"${
          item.path[0].charAt(0).toUpperCase() + item.path[0].slice(1)
        }" is not allowed to be empty`;
      setErrors(errorsObject);
      return true;
    }
  };
  const handleShow = (e) => {
    const { checked, name } = e.target;
    setShow({ ...show, [name]: checked });
    // alert(name);
  };
  const handleSelect = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    // eslint-disable-next-line
    const it = error
      ? setErrors({
          ...errors,
          [name]: `"${
            name.charAt(0).toUpperCase() + name.slice(1)
          }" is not allowed to be empty`,
        })
      : setErrors({ ...errors, [name]: "" });
  };
  const handleNext = async () => {
    const error = validate();
    if (!error) {
      const religionData = {
        religion: values.religion,
        visible: show.religion,
        step: "/get-user-children",
      };
      const childData = {
        have_children: values.haveChildren,
        want_children: values.wantChildren,
        visible: show.haveChildren,
        step: "/get-user-vices",
      };
      await axios
        .all([religionApi(religionData), children(childData)])
        .then(
          axios.spread((res1, res2) => {
            dispatch(submit(res2.data));
            onNext();
          })
        )
        .catch((err) => console.log(err));
    }
  };
  const handleSkip = async () => {
    const stepData = {
      step: "/get-user-vices",
    };
    try {
      const { data } = await step(stepData);
      dispatch(submit(data));
      onNext();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid
      container
      className={classes.container}
      style={{
        backgroundImage: `url(${image.bag})`,
        backgroundPosition: "100% 100%",
      }}
    >
      <Header transparent />
      <Grid
        container
        alignItems="center"
        direction="column"
        className={classes.form}
        // style={{ marginBottom: lgScreen ? "5rem" : "10rem" }}
      >
        <Grid item>
          <form action="" autoComplete="off">
            <Grid
              container
              direction="column"
              className={classes.formContainer}
              // style={{ marginTop: lgScreen ? "3rem" : "8rem" }}
            >
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Religion"
                  options={religion}
                  placeholder="Choose Religion"
                  show={show.religion}
                  handleShow={handleShow}
                  name="religion"
                  onSelect={handleSelect}
                  value={values.religion}
                  error={Boolean(errors.religion)}
                  errorText={errors.religion}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Politics"
                  options={politics}
                  placeholder="Choose an option"
                  show={show.politics}
                  handleShow={handleShow}
                  name="politics"
                  onSelect={handleSelect}
                  value={values.politics}
                  error={Boolean(errors.politics)}
                  errorText={errors.politics}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Have Children"
                  options={haveChild}
                  placeholder="Choose an option"
                  show={show.haveChildren}
                  handleShow={handleShow}
                  name="haveChildren"
                  onSelect={handleSelect}
                  value={values.haveChildren}
                  error={Boolean(errors.haveChildren)}
                  errorText={errors.haveChildren}
                />
              </Grid>
              <Grid item sm={12}>
                <SelectOption
                  checkboxVaraint="switch"
                  label="Want Children"
                  options={wantChild}
                  placeholder="Choose an option"
                  show={show.wantChildren}
                  handleShow={handleShow}
                  name="wantChildren"
                  onSelect={handleSelect}
                  value={values.wantChildren}
                  error={Boolean(errors.wantChildren)}
                  errorText={errors.wantChildren}
                />
              </Grid>
              <Grid
                item
                container
                style={{ marginTop: "2rem" }}
                justifyContent="center"
              >
                <CustomIconButton onClick={handleNext} />
                <CustomButton onClick={handleSkip} variant="outlineButton">
                  Skip
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
