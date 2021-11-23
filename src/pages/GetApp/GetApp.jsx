import React from "react";
import {
	makeStyles,
	Grid,
	Button,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import image from "../../assets/index";
import { Header } from "../../components/header/Header";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "#fbfbfb",
		height: "100vh",
	},
	innerContainer: {
		backgroundColor: "#707070",
		width: "1030px",
		height: "786px",
		borderRadius: "44px",
		marginTop: "3rem",
		boxShadow: theme.shadows[5],
		[theme.breakpoints.down("lg")]: {
			width: "600px",
			height: "470px",
			borderRadius: "30px",
		},
		[theme.breakpoints.down("md")]: {
			width: "400px",
			height: "370px",
		},
		[theme.breakpoints.down("sm")]: {
			width: "320px",
			height: "300px",
		},
	},

	logo: {
		marginBottom: "1rem",
		[theme.breakpoints.down("lg")]: {
			marginBottom: "0rem",
		},
	},
	logoImage: {
		width: "307px",
		height: "245px",
		[theme.breakpoints.down("lg")]: {
			height: "12rem",
		},
		[theme.breakpoints.down("md")]: {
			height: "8rem",
		},
		[theme.breakpoints.down("sm")]: {
			height: "6rem",
		},
	},
	btn: {
		marginBottom: "1rem",
		"&:hover": {
			backgroundColor: "transparent",
			cursor: "pointer",
		},
		[theme.breakpoints.down("lg")]: {
			marginBottom: "0.5rem",
			"& img": {
				width: "270px",
			},
		},
		[theme.breakpoints.down("md")]: {
			marginBottom: "0.5rem",
			"& img": {
				width: "220px",
			},
		},
		[theme.breakpoints.down("sm")]: {
			marginBottom: "0.5rem",
			"& img": {
				width: "180px",
			},
		},
	},
	txt: {
		fontSize: "25px",
		color: "#fff",
		marginTop: "4rem",

		[theme.breakpoints.down("lg")]: {
			fontSize: "17px",
			marginTop: "1rem",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "14px",
			marginTop: "1rem",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "12px",
			marginTop: "1rem",
		},
	},
	link: {
		color: theme.palette.common.crimson,
		marginLeft: "1ch",
	},
}));

export const GetApp = () => {
	const classes = useStyles();
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Grid
			container
			className={classes.container}
			justifyContent="center"
			alignItems="center"
		>
			<Header transparent />
			<Grid
				container
				className={classes.innerContainer}
				justifyContent="center"
				direction="column"
				alignItems="center"
			>
				<Grid item className={classes.logo}>
					<img
						src={image.logo2x}
						className={classes.logoImage}
						alt="app-logo"
					/>
				</Grid>
				<Grid item>
					<Button disableRipple className={classes.btn}>
						<img src={image.google} alt="google-paly-store" />
					</Button>
				</Grid>
				<Grid item>
					<Button disableRipple className={classes.btn}>
						<img src={image.apple} alt="apple-store" />
					</Button>
				</Grid>
				<Grid item>
					<p className={classes.txt}>
						Or take me back to
						{md ? (
							<span className={classes.link}>Sign In</span>
						) : (
							<Link to="/signin" className={classes.link} href="#">
								Sign In
							</Link>
						)}
					</p>
				</Grid>
			</Grid>
		</Grid>
	);
};
