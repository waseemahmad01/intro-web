import React, { useState, useRef, useCallback, useEffect } from "react";
import { useStyles } from "./selectImageStyles";
import { Grid, useTheme, Typography, Dialog, Button } from "@material-ui/core";
import { Header } from "../../../components/header/Header";
import image from "../../../assets/index";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { profileImage, step } from "../../../http";
import { submit } from "../../../store/user";
import ButtonComp from "../../../components/ButtonComp/ButtonComp";
export const SelectImage = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const webcamRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const headerItems = [
    {
      label: "Register",
      to: "/signinscreen",
    },
    {
      label: "Help",
      to: "/helpcenter",
    },
  ];
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openWebCam, setOpenWebCam] = useState(false);
  const [error, setError] = useState(false);
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const handleUploadImage = (e) => {
    setError(false);
    setUploadImage("");
    setImageFile(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setUploadImage(image);
  };
  const takeScreenShot = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadImage(imageSrc);
    console.log(imageSrc);
    setOpenWebCam(false);
  }, [webcamRef]);
  const handleSubmit = async () => {
    if (imageFile === null) return setError(true);
    try {
      let imageData = new FormData();
      const stepData = {
        step: "/home",
      };
      imageData.append("profile_img", imageFile);
      let res = await profileImage(imageData);
      res = await step(stepData);
      dispatch(submit(res.data));
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (imageFile !== null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [imageFile]);
  return (
    <Grid
      container
      className={classes.container}
      justifyContent="center"
      alignItems="center"
    >
      <Header headerItems={headerItems} transparent />
      <Grid
        container
        direction="column"
        className={classes.contentContainer}
        alignItems="center"
      >
        <Grid item>
          <Typography className={classes.title} variant="h4">
            Choose your best photo
          </Typography>
        </Grid>
        <Grid item>
          <div
            className={classes.imagePreview}
            style={{
              padding: lgScreen
                ? uploadImage
                  ? "0rem"
                  : "1rem"
                : uploadImage
                ? "0rem"
                : "2rem",
            }}
          >
            <img
              src={uploadImage ? uploadImage : image.previewCircle}
              className={classes.previewImage}
              alt={uploadImage ? "profile" : "preview-image"}
            />
            {uploadImage ? undefined : (
              <p className={classes.previewText}>Selected Image</p>
            )}
          </div>
          {error && (
            <span className={classes.error}>Please upload an image.</span>
          )}
        </Grid>
        {/* <Grid item>
          <CustomButton
            variant="btnOutlineRed"
            styleProps={{
              marginTop: "2rem",
              width: lgScreen ? "150px" : "188px",
              fontSize: lgScreen ? "15px" : "21px",
              paddingInline: "0",
            }}
            onClick={() => setOpenWebCam(true)}
          >
            Open Camera
          </CustomButton>
        </Grid> */}
        <Grid
          item
          container
          justifyContent="center"
          style={{ margin: smScreen ? "1rem 0" : "2rem 0" }}
          direction={smScreen ? "column" : "row"}
          alignItems="center"
          spacing={smScreen ? 2 : undefined}
        >
          {/* <CustomButton
            variant="btnFacebook"
            styleProps={{
              marginRight: smScreen ? "0" : "2rem",
              marginBottom: smScreen ? "1rem" : "0",
            }}
          >
            Choose from Facebook
          </CustomButton> */}
          <label htmlFor="image-picker" className={classes.uploadButton}>
            Upload
          </label>
        </Grid>
        {/* <Link to="/home"> */}
        {/* <CustomIconButton onClick={handleSubmit} /> */}
        <ButtonComp
          label="Continue"
          disabled={disabled}
          onClick={handleSubmit}
        />
        {/* </Link> */}
        <input
          type="file"
          id="image-picker"
          onChange={handleUploadImage}
          className={classes.imageInput}
        />
        <Dialog open={openWebCam} onClose={() => setOpenWebCam(false)}>
          <Webcam
            ref={webcamRef}
            mirrored="false"
            screenshotQuality="1"
            screenshotFormat="image/jpeg"
            imageSmoothing
          />
          <Button
            variant="contained"
            color="primary"
            onClick={takeScreenShot}
            className={classes.takeImageButton}
          >
            Take Photo
          </Button>
        </Dialog>
      </Grid>
    </Grid>
  );
};
