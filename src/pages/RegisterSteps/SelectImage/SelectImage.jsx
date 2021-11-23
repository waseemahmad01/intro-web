import React, { useState, useRef, useCallback } from "react";
import { useStyles } from "./selectImageStyles";
import { Grid, useTheme, Typography, Dialog, Button } from "@material-ui/core";
import { Header } from "../../../components/header/Header";
import image from "../../../assets/index";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomIconButton } from "../../../components/IconButton/CustomIconButton";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { profileImage, step } from "../../../http";
import { submit } from "../../../store/user";
import axios from "axios";
export const SelectImage = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const webcamRef = useRef();
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
  const userState = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [openWebCam, setOpenWebCam] = useState(false);
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const lgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const handleUploadImage = (e) => {
    setUploadImage("");
    setImageFile(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    console.log(e.target.files[0]);
    setUploadImage(image);
  };
  const takeScreenShot = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadImage(imageSrc);
    console.log(imageSrc);
    setOpenWebCam(false);
  }, [webcamRef]);
  const handleSubmit = async () => {
    try {
      history.push("/home");
      let imageData = new FormData();
      imageData.append("profile_img", imageFile);
      axios.all([profileImage(imageData), step({ step: "/home" })]).then(
        axios.spread(function (res1, res2) {
          console.log(res2.data);
          dispatch(submit(res2.data));
        })
      );
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };
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
        </Grid>
        <Grid item>
          <CustomButton
            variant="btnOutlineRed"
            styleProps={{
              marginTop: "2rem",
              width: lgScreen ? "150px" : "188px",
              fontSize: lgScreen ? "15px" : "21px",
            }}
            onClick={() => setOpenWebCam(true)}
          >
            Open Camera
          </CustomButton>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          style={{ margin: smScreen ? "1rem 0" : "2rem 0" }}
          direction={smScreen ? "column" : "row"}
          alignItems="center"
          spacing={smScreen ? 2 : undefined}
        >
          <CustomButton
            variant="btnFacebook"
            styleProps={{
              marginRight: smScreen ? "0" : "2rem",
              marginBottom: smScreen ? "1rem" : "0",
            }}
          >
            Choose from Facebook
          </CustomButton>
          {/* <CustomButton
						variant="btnBlue"
						styleProps={{
							marginLeft: smScreen ? "0" : "2rem",
						}}
					>
						Upload
					</CustomButton> */}
          <label htmlFor="image-picker" className={classes.uploadButton}>
            Upload
          </label>
        </Grid>
        {/* <Link to="/home"> */}
        <CustomIconButton onClick={handleSubmit} />
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
