import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: "100vh",
		backgroundColor: "#ffffff",
	},
	innerContainer: {
		marginTop: "18rem",
		[theme.breakpoints.down("lg")]: {
			marginTop: "13rem",
		},
	},
	titleContainer:{
		marginBottom: "2.8rem",
		[theme.breakpoints.down("lg")]:{
			marginBottom: '1rem'
		}
	},
	title: {
		fontSize: "59px",
		color: theme.palette.primary.main,
		fontWeight: "500",
		display: "inline",
		textAlign: "center",
		[theme.breakpoints.down("lg")]: {
			fontSize: "30px",
		},
	},
	searchBar: {
		width: "870px",
		height: "97px",
		borderRadius: "49px",
		backgroundColor: "#fbfbfb",
		boxShadow: theme.shadows[3],
		padding: "0 1.5rem",
		[theme.breakpoints.down("lg")]: {
			width: "500px",
			height: "45px",
		},
	},
	searchInput: {
		width: "70%",
		margin: 0,
		fontSize: "35px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "18px",
		},
	},
	searchIcon: {
		[theme.breakpoints.down("lg")]: {
			height: "25px",
			width: "25px",
		},
	},
	navNextBtn: {
		height: "67px",
		width: "67px",
		backgroundColor: theme.palette.primary.main,
		"&:hover":{
			backgroundColor: theme.palette.primary.light,
		},
		[theme.breakpoints.down("lg")]: {
			height: "25px",
			width: "25px",
		},
	},
	navNextIcon: {
		fontSize: "4rem",
		color: "#fff",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.5rem",
		},
	},
	subTitle1: {
		fontSize: "36px",
		marginTop: "4rem",
		marginBottom: '4.25rem',
		"& span": {
			color: theme.palette.primary.main,
		},
		[theme.breakpoints.down("lg")]: {
			fontSize: "20px",
			marginTop: "2rem",
			marginBottom: "2.25rem",
		},
	},
	subTitle2:{
		fontSize: '36px',
		color: "#000000",
		marginTop: '5rem',
		marginBottom: '3rem',
		[theme.breakpoints.down("lg")]: {
			fontSize: "20px",
			marginTop: "2.5rem",
			marginBottom: "1.5rem",
		},
	},
	card: {
		backgroundColor: "#fbfbfb",
		borderRadius: "30px",
		height: "394px",
		boxShadow: theme.shadows[3],
		width: '265px',
		[theme.breakpoints.down("lg")]:{
			width: "180px",
			height: '250px',
			borderRadius: '22px',
		}
	},
	cardHeader: {
		textAlign: "center",
		padding: "2rem 1rem",
		paddingBottom: "1.5rem",
		"& .MuiCardHeader-title": {
			color: theme.palette.primary.main,
			fontSize: "21px",
			fontWeight: 700,
			[theme.breakpoints.down("lg")]: {
				fontSize: "13px",
				padding: "0rem",
				paddingBottom: "0rem",
			},
		},
	},
	cardContent: {
		paddingTop: "0px",
		padding: "0 1rem",
		"& p": {
			fontSize: "21px",
			fontWeight: "100",
			// textAlign: "justify",
			[theme.breakpoints.down("lg")]: {
				fontSize: "13px",
			},
		},
	},
	question: {
		width: "1227px",
		height: "85px",
		backgroundColor: "#fbfbfb",
		padding: " 0 3rem",
		borderRadius: "25px",
		boxShadow: theme.shadows[3],
		marginBottom: "3rem",
		[theme.breakpoints.down("lg")]: {
			width: "600px",
			height: "45px",
		},
		"& p": {
			fontSize: "21px",
			fontWeight: 700,
			[theme.breakpoints.down("lg")]: {
				fontSize: "12px",
			},
		},
	},
	questionIcon: {
		height: "52px",
		width: "52px",
		backgroundColor: "#ffffff",
		borderRadius: "50%",
		border: "1px solid #707070",
		[theme.breakpoints.down("lg")]: {
			height: "22px",
			width: "22px",
		},
	},

	// help pages

	colorTxt: {
		textAlign: "center",
		height: "208px",
		backgroundColor: "rgba(254, 133, 140,0.5)",
		marginTop: "12rem",
		[theme.breakpoints.down("lg")]: {
			marginTop: "7rem",
			height: "150px",
		},
	},
	textContainer: {
		"& h1": {
			fontSize: "59px",
			[theme.breakpoints.down("lg")]: {
				fontSize: "45px",
			},
		},
		"& h2": {
			fontSize: "21px",
			[theme.breakpoints.down("lg")]: {
				fontSize: "17px",
			},
		},
	},
	subtitle2: {
		fontSize: "18px",
		fontWeight: "300",
		marginTop: "1rem",
		[theme.breakpoints.down("lg")]:{
			fontSize: "15px",
			marginTop: '0.5rem',
		}
	},
	columnContainer: {
		marginTop: "4.5rem",
		[theme.breakpoints.down("lg")]: {
			marginTop: "2rem",
		},
	},
	colTitle: {
		textAlign: "left",
		fontWeight: "700",
		fontSize: '33px',
		[theme.breakpoints.down("lg")]: {
			fontSize: "22px",
		},
	},
	colText: {
		textAlign: "left",
		marginBottom: '0.8rem',
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
			marginBottom: "0.35rem"
		},
	},

	colInnerContainer: {
		maxWidth: "38ch",
		margin: "0 auto",
		[theme.breakpoints.down("lg")]: {
			// maxWidth: "250px",
		},
	},
	column:{
		display: "flex",
		flexDirection: "column",
	},
	margin:{
		marginTop: '6rem',
		[theme.breakpoints.down("lg")]: {
			marginTop: '1.8rem',
		},
	}
}));
