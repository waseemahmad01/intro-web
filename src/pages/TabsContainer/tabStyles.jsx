import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	mainContainer: {
		backgroundColor: theme.palette.common.lightPink,
		padding: "0 2rem",
		boxShadow: theme.shadows[10],
		zIndex: 0,
		height: "100vh"
	},
	exploreContainer: {
		padding: "1rem 4rem",

		[theme.breakpoints.down("lg")]: {
			padding: "1rem 2rem",
		},
	},
	hero: {
		backgroundColor: "#fff",
		borderRadius: "54px",
		boxShadow: theme.shadows[5],
		marginBottom: "5px",
		marginTop: "0",
		maxHeight: "calc(100% - 130px)",
		minHeight: "calc(100% - 250px)",
		overflowY: "scroll",
		[theme.breakpoints.down("lg")]: {
			maxHeight: "calc(100vh - 90px)",
			minHeight: "calc(100vh - 90px)",
			borderRadius: "34px",
		},
		"&::-webkit-scrollbar-track": {
			background: "transparent",
			maxHeight: "50%",
			height: "50%",
		},
		"&::-webkit-scrollbar": {
			width: 7,
		},
		"&::-webkit-scrollbar-thumb": {
			background: theme.palette.common.darkPink,
			borderRadius: "20px",
		},
		"&::-webkit-scrollbar-button ": {
			width: "14px", //for horizontal scrollbar
			height: "14px", //for vertical scrollbar
		},
	},
	heroTitle: {
		fontSize: "30px",
		fontFamily: "Helvetica",
		marginBottom: "15px",
		color: "#000",
		margin: 0,
		fontWeight: 700,
		[theme.breakpoints.down("lg")]: {
			fontSize: "28px",
		},
	},
	fixButton: {
		backgroundColor: "#FE858C",
		position: "fixed",
		bottom: 20,
		right: 10,
		color: "#fff",
		"&:hover": {
			backgroundColor: "#Ff859C",
		},
	},
	tabsContainer: {
		padding: "3rem 0rem",
		[theme.breakpoints.down("lg")]: {
			padding: "2.5rem 0rem",
		},
	},
	tabsLogo: {
		width: "9rem",
		marginBottom: "1rem",
		[theme.breakpoints.down("lg")]:{
			width: '7rem',
		}
	},
	tabs: {
		width: "100%",
	},

	icons: {
		fontSize: "1.5rem",
		marginRight: "0px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.25rem",
		},
	},
	listItemText: {
		"& .MuiListItemText-primary": {
			color: "#000",
			fontSize: "21px",
			fontWeight: "500",
			margin: "auto 0",
			textAlign: "left",
			marginLeft: "15px",
			[theme.breakpoints.down("lg")]: {
				marginLeft: "10px",
				fontSize: "15px",
				margin: "auto 0",
			},
		},
	},
	listItem: {
		height: "64px",
		paddingLeft: "4.5rem",
		boxSizing: "content-box",
		cursor: "pointer",
		width: "80%",
		"& .MuiListItemIcon-root": {
			color: theme.palette.primary.main,
		},
		[theme.breakpoints.down("lg")]: {
			paddingLeft: "3rem",
			height: "35px",
		},
	},
	listItemActive: {
		borderRadius: "0px 35px 35px 0px",
		width: "82%",
		boxSizing: "content-box",
		backgroundColor: theme.palette.primary.main,
		[theme.breakpoints.down("lg")]: {
			width: "85%",
			borderRadius: "0px 32px 32px 0px",
		},
		"& .MuiListItemText-primary ": {
			color: "#fff",
		},
		"& .MuiListItemIcon-root": {
			color: theme.palette.common.darkPink,
		},
	},
	root: {
		"& .MuiListItem-root.Mui-selected": {
			backgroundColor: theme.palette.primary.main,
		},
	},
	listItemIcon: {
		minWidth: "0",
	},
	sliderContainer:{
		paddingInline: "0rem",
		marginTop: "5.7rem",
		marginBottom: '2.3rem',
		[theme.breakpoints.down("lg")]:{
			marginTop: '2rem',
			marginBottom: '1rem',
		}
	},
	newIcon:{
		[theme.breakpoints.down("lg")]:{
			width: '1.3rem',
		}
	}
}));
