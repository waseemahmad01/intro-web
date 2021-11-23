import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	nav: {
		backgroundColor: "rgba(0,0,0,0.16)",
		boxShadow: "none",
		padding: "1rem 2.5rem",
		zIndex: 1300,
		animation: "3s fadeAnimation",
		[theme.breakpoints.down("lg")]: {
			padding: 0,
		},
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "rgba(0,0,0,0.16)",
		},
	},
	navLight: {
		backgroundColor: "transparent",
		boxShadow: "none",
		padding: "1rem 2.5rem",
		[theme.breakpoints.down("lg")]: {
			padding: 0,
		},
		[theme.breakpoints.down("sm")]: {
			backgroundColor: "#fcfcfc",
		},
	},
	navLinks: {
		marginLeft: "auto",
		"& .MuiTabs-indicator": {
			backgroundColor: "transparent",
		},
	},
	logo: {
		height: "5rem",
		"&:hover": {
			backgroundColor: "transparent",
		},
		[theme.breakpoints.down("lg")]: {
			height: "4rem",
		},
	},
	logoImage: {
		height: "100px",
		[theme.breakpoints.down("lg")]: {
			height: "80px",
		},
	},
	tab: {
		textAlign: "center",
		fontWeight: 300,
		fontSize: "28px",
		letterSpacing: 0,
		color: "#fff",
		opacity: 1,
		minWidth: 5,
		// width: "400px",
		textTransform: "none",
		marginRight: "1.6rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1rem",
			width: undefined,
		},
		[theme.breakpoints.down("sm")]: {
			color: "#000000",
		},
	},
	tabLight: {
		textAlign: "center",
		fontWeight: 300,
		fontSize: "28px",
		letterSpacing: 0,
		color: "#000000",
		opacity: 1,
		minWidth: 5,
		textTransform: "none",
		// width: '120px',
		marginRight: "1.6rem",

		[theme.breakpoints.down("lg")]: {
			fontSize: "1rem",
			marginRight: "0.5rem",
		},
		[theme.breakpoints.down("sm")]: {
			color: "#ffffff",
			textShadow: "1px 1px 5px #000",
		},
	},

	tabsLight: {
		color: "#000",
		textAlign: "center",
		fontWeight: 500,
		fontSize: "12px",
		letterSpacing: 0,
		opacity: 1,
		minWidth: 5,
		textTransform: "none",
		marginRight: "1.6rem",
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	indicator: {
		backgroundColor: "transparent",
	},
	drawerIconContainer: {
		marginLeft: "auto",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	drawerIcon: {
		color: "#fff",
		[theme.breakpoints.down("md")]: {
			height: "45px",
			width: "45px",
		},
		[theme.breakpoints.down("xs")]: {
			height: "35px",
			width: "35px",
		},
	},
	drawer: {
		backgroundColor: "rgba(0,0,0,0.16)",
		marginTop: "4.5rem",
		position: "absolute",
		left: 0,
		width: "100%",
		[theme.breakpoints.down("md")]: {
			top: "6px",
		},
		[theme.breakpoints.down("xs")]: {
			top: "-4px",
		},
		paddingBottom: "1rem",
	},
	drawerIconDark: {
		color: "#000",
	},
	// show: {
	// 	display: "flex",
	// 	opacity: 1,
	// 	animation: "1s fadeAnimation ease",
	// },
	// "@keyframes fadeAnimation": {
	// 	from: { opacity: 0 },
	// 	to: { opacity: 1 },
	// },
}));
