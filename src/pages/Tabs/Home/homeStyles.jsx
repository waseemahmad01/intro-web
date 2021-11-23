import { makeStyles } from "@material-ui/core";
import item1 from "../../../assets/item1.png";
import item2 from "../../../assets/item2.png";
export const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 5rem",

		[theme.breakpoints.down("lg")]: {
			padding: "1rem 2rem",
			paddingBottom: "0rem",
		},
	},
	left: {
		width: "20%",
	},
	middle: {
		width: "50%",
	},
	right: {
		width: "30%",
	},
	title: {
		color: "#000",
		marginBottom: "20px",
		fontSize: "28px",
		fontWeight: "700",
		[theme.breakpoints.down("lg")]: {
			marginBottom: "10px",
		},
	},
	likes: {
		color: "#000",
		textAlign: "left",
		margin: 0,
		padding: "1rem",
		fontSize: "23px",
		fontWeight: 700,
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
			padding: "0rem",
			paddingLeft: "0.5rem",
		},
	},
	listItemText: {
		"& .MuiListItemText-primary": {
			color: "#000",
			fontSize: "14px",
			textAlign: "left",
			marginLeft: "10px",
			[theme.breakpoints.down("lg")]: {
				fontSize: "10px",
				marginLeft: "0px",
			},
		},
	},
	listItemRoot: {
		marginBottom: "1rem",
		[theme.breakpoints.down("lg")]: {
			marginBottom: "0.25rem",
		},
		"& .MuiListItemAvatar-root": {
			minWidth: "35px",
		},
	},
	listItemAvatar: {
		height: "46px",
		width: "46px",
		[theme.breakpoints.down("lg")]: {
			height: "30px",
			width: "30px",
		},
		"& .MuiListItemAvatar-root": {
			minWidth: "15px",
		},
	},
	thumbIcon: {
		height: "25px",
		width: "25px",
		[theme.breakpoints.down("lg")]: {
			height: "15px",
			width: "15px",
		},
	},
	listContainer: {
		backgroundColor: "#fbfbfb",
		width: "100%",
		height: "585px",
		borderRadius: "19px",
		boxSizing: "border-box",
		padding: "0.5rem",
		boxShadow: theme.shadows[3],
		position: "relative",
		[theme.breakpoints.down("lg")]: {
			width: "100%",
			height: "370px",
		},
	},
	card: {
		backgroundColor: "#fbfbfb",
		height: "133px",
		width: "100%",
		boxSizing: "border-box",
		padding: "1rem",
		borderRadius: "19px",
		boxShadow: theme.shadows[3],
		marginBottom: "0.9rem",
		[theme.breakpoints.down("lg")]: {
			width: "100%",
			height: "80px",
			marginBottom: "0.65rem",
		},
	},
	cardTitle: {
		display: "flex",
		justifyContent: "space-between",
		alignItem: "center",
		marginBottom: "10px",
		[theme.breakpoints.down("lg")]: {
			marginBottom: "0px",
		},
	},
	cardTitleOne: {
		color: "#000",
		fontSize: "21px",
		fontWeight: 300,
		margin: 0,
		[theme.breakpoints.down("lg")]: {
			fontSize: "12px",
		},
	},
	cardSubtitle: {
		color: "#000",
		fontSize: "13px",
		fontWeight: 300,
		textDecoration: "underline",
		margin: "auto 0",
		[theme.breakpoints.down("lg")]: {
			fontSize: "8px",
		},
	},
	cardAvatar: {
		height: "65px",
		width: "65px",
		marginLeft: "10px",
		[theme.breakpoints.down("lg")]: {
			height: "35px",
			width: "35px",
		},
	},
	itemOne: {
		width: "49%",
		height: "146px",
		borderRadius: "18px",
		boxShadow: theme.shadows[3],
		boxSizing: "border-box",
		padding: "1rem",
		backgroundImage: `url(${item1})`,
		backgroundSize: "cover",
		[theme.breakpoints.down("lg")]: {
			width: "49%",
			height: "100px",
		},
	},
	itemTwo: {
		width: "49%",
		height: "146px",
		borderRadius: "18px",
		boxShadow: theme.shadows[3],
		boxSizing: "border-box",
		padding: "1rem",
		backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${item2})`,
		backgroundSize: "cover",
		backgroungPosition: "center",
		[theme.breakpoints.down("lg")]: {
			width: "49%",
			height: "100px",
		},
	},
	reelContainer: {
		width: "100%",
		height: "402px",
		backgroundColor: "#fbfbfb",
		borderRadius: "13px",
		boxShadow: theme.shadows[3],
		boxSizing: "border-box",
		padding: "1rem 2rem",
		[theme.breakpoints.down("lg")]: {
			width: "100%",
			padding: "1rem",
			height: "260px",
		},
	},
	reelTitle: {
		color: "#000",
		textAlign: "center",
		width: "100%",
		margin: "0",
		fontSize: "20px",
		fontWeight: "700",
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
		},
	},
	reelAvatar: {
		width: "88px",
		height: "88px",
		borderRadius: "23px",
		[theme.breakpoints.down("lg")]: {
			width: "55px",
			height: "55px",
			borderRadius: "15px",
		},
	},
	reelItemText: {
		marginLeft: "15px",
		"& .MuiListItemText-primary": {
			color: "#000",
			fontSize: "15px",
			textAlign: "left",
			[theme.breakpoints.down("lg")]: {
				fontSize: "11px",
			},
		},
		"& .MuiListItemText-secondary": {
			color: "#000",
			fontSize: "12px",
			textAlign: "left",
			[theme.breakpoints.down("lg")]: {
				fontSize: "8px",
			},
		},
	},
	reelItem: {
		marginBottom: "0.9rem",
		[theme.breakpoints.down("lg")]: {
			marginBottom: "0.5rem",
		},
	},
	profileCard: {
		width: "100%",
		height: "162px",
		backgroundColor: "#fbfbfb",
		boxSizing: "border-box",
		borderRadius: "22px",
		boxShadow: theme.shadows[3],
		marginBottom: "1.3rem",
		padding: "1rem 2rem",
		[theme.breakpoints.down("lg")]: {
			width: "100%",
			padding: "0.75rem",
			height: "100px",
			marginBottom: "0.6rem",
		},
	},
	profileCardTitle: {
		color: "#000",
		fontSize: "23px",
		fontWeight: "700",
		margin: 0,
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
		},
	},
	profileAvatar: {
		height: "100px",
		width: "100px",
		[theme.breakpoints.down("lg")]: {
			height: "50px",
			width: "50px",
		},
	},
	badge: {
		backgroundColor: theme.palette.primary.main,
		width: "85px",
		height: "34px",
		color: "#fff",
		borderRadius: "17px",
		fontSize: "12px",
		textAlign: "center",
		lineHeight: "34px",
		[theme.breakpoints.down("lg")]: {
			width: "60px",
			height: "20px",
			lineHeight: "20px",
			fontSize: "9px",
		},
	},
	imageTitle: {
		margin: 0,
		color: "#fff",
		textAlign: "left",
		fontSize: "17px",
		marginTop: "50px",
		marginBottom: "5px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "13px",
			marginTop: "25px",
		},
	},
	imageText: {
		margin: 0,
		color: "#fff",
		textAlign: "left",
		fontSize: "15px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "10px",
		},
	},
	tags: {
		margin: "auto 0",
		width: "185px",
		height: "77px",
		marginLeft: "30px",
		[theme.breakpoints.down("lg")]: {
			marginLeft: "20px",
			width: "130px",
			height: "50px",
		},
	},
	reelAvatarContainer: {
		minWidth: "0px",
	},
	seeMore: {
		color: "#000",
		fontSize: "13px",
		fontWeight: 300,
		textDecoration: "underline",
		margin: "0",
		display: "block",
		marginTop: "auto",
		position: "absolute",
		bottom: "5px",
		left: 0,
		right: 0,
		[theme.breakpoints.down("lg")]: {
			fontSize: "10px",
		},
	},
}));
