import { makeStyles } from "@material-ui/core";
import image from "../../assets/hero.png";

export const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: "100vh",
		backgroundImage: `linear-gradient(to right, rgb(101, 74, 171, 0.5), rgb(216, 114, 136, 0.5)),url(${image})`,
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		zIndex: -1,
	},
	logo: {
		marginTop: "7.5rem",
		marginBottom: "4rem",
		[theme.breakpoints.down("lg")]: {
			height: "13rem",
			marginTop: "2rem",
			marginBottom: "0.5rem",
		},
	},
	loginContainer: {
		// maxWidth: "45ch",
	},
	anchor: {
		fontSize: "20px",
		color: "#fff",
		margin: "0 1ch",
		[theme.breakpoints.down("lg")]: {
			fontSize: "0.85rem",
		},
	},
	anchor2: {
		fontSize: "12px",
		color: "#fff",
		margin: "0 1ch",
		textDecoration: "underline",
		[theme.breakpoints.down("lg")]: {
			fontSize: "0.6rem",
		},
	},
	body1: {
		marginTop: "6.5rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "0.85rem",
			marginTop: "4rem",
		},
	},
	body2: {
		marginTop: "3.5rem",
		fontSize: "12px",
		width: "57ch",
		[theme.breakpoints.down("lg")]: {
			fontSize: "0.6rem",
			marginTop: "0rem",
		},
	},
	facebookButton: {
		backgroundColor: "#3B5998",
		marginTop: "0.5rem",
		width: "410px",
		height: "65px",
		textTransform: "none",
		fontSize: "21px",
		fontWeight: 300,
		borderRadius: "33px",
		color: "#fff",
		boxSizing: "border-box",
		[theme.breakpoints.down("lg")]: {
			width: "270px",
			height: "40px",
			fontSize: "15px",
			marginTop: "0.15rem",
		},
		"&:hover": {
			backgroundColor: "#4262A5",
		},
		"&:first-child": {
			display: "flex",
			justifyContent: "space-between",
			padding: "1rem",
		},
	},
	googleButton: {
		backgroundColor: "#CE4317",
		width: "410px",
		height: "65px",
		textTransform: "none",
		fontSize: "21px",
		fontWeight: 300,
		borderRadius: "33px",
		color: "#fff",
		boxSizing: "border-box",
		[theme.breakpoints.down("lg")]: {
			width: "270px",
			height: "40px",
			fontSize: "15px",
		},
		"&:hover": {
			backgroundColor: "#D14B21",
		},
		"&:first-child": {
			display: "flex",
			justifyContent: "space-between",
			padding: "1rem",
		},
	},
	googleIcon: {
		[theme.breakpoints.down("lg")]: {
			width: "1.5rem",
		},
	},
	fbIcon: {
		[theme.breakpoints.down("lg")]: {
			width: "1.5rem",
		},
	},
}));
