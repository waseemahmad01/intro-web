import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: "#fff8f5",
  },
  imagePreview: {
    height: "380px",
    width: "380px",
    padding: "1.5rem",
    backgroundColor: "rgba(119, 119, 119, 0.77)",
    marginTop: "2rem",
    borderRadius: "8px",
    border: `3px solid ${theme.palette.primary.main}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("lg")]: {
      height: "200px",
      width: "200px",
      marginTop: "1rem",
      padding: "0.5rem",
    },
  },
  title: {
    fontSize: "34px",
    marginTop: "6rem",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("lg")]: {
      fontSize: "22px",
      marginTop: "0rem",
      marginBottom: "0rem",
    },
  },
  previewText: {
    position: "absolute",
    margin: "auto",
    color: "#fff",
    fontSize: "21px",
    fontWeight: "300",
    letterSpacing: "1.2px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    [theme.breakpoints.down("lg")]: {
      marginTop: "2rem",
    },
  },
  uploadButton: {
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    height: "61px",
    width: "406px",
    borderRadius: "80px",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "61px",
    fontSize: "21px",
    marginLeft: "2rem",
    boxShadow: theme.shadows[3],
    [theme.breakpoints.down("lg")]: {
      width: "270px",
      height: "40px",
      fontSize: "18px",
      lineHeight: "40px",
    },
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
  },
  imageInput: {
    visibility: "hidden",
  },
  takeImageButton: {
    borderRadius: "0px",
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "1.3rem",
  },
}));
