import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	mainContainer: {
		paddingInline: "2rem",
		paddingTop: "1rem",
		[theme.breakpoints.down(1680)]: {
			paddingInline: "1rem",
		},
	},
	username: {
		fontSize: "2.1875rem",
		fontWeight: 700,
		[theme.breakpoints.down(1680)]: {
			fontSize: "1.25rem",
		},
	},
	statsContainer: {
		width: "124px",
		height: "51px",
		border: `1px solid ${theme.palette.primary.main} `,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "25px",
		marginRight: "2rem",
		marginTop: "1.6rem",
		[theme.breakpoints.down(1680)]: {
			width: "70px",
			height: "25px",
			marginTop: "1rem",
			marginRight: "1rem",
		},
	},
	count: {
		fontSize: "1.56rem",
		marginLeft: "1rem",
		color: theme.palette.primary.main,
		[theme.breakpoints.down(1680)]: {
			fontSize: "1rem",
		}, 
	},
	gemIcon: {
		[theme.breakpoints.down(1680)]: {
			width: "1rem",
		},
	},
	eyeIcon: {
		[theme.breakpoints.down("lg")]: {
			width: "1.35rem",
		},
	},
	left: {
		width: "66.5%",
	},
	battleContainer: {
		marginTop: "1rem",
		position: "relative",
		height: "800px",
		borderRadius: "15px",
		overflow: "hidden",
		[theme.breakpoints.down(1680)]:{
			height: '470px'
		}
	},

	battleRight: {
		borderLeft: `1px solid ${theme.palette.primary.main}`,
		position: "relative",
		height: "100%",
	},
	outlineTextRight: {
		color: "#fff",
		fontSize: "92px",
		"-webkit-textStroke": `4px #FE858C `,
		position: "absolute",
		bottom: "20px",
		display: "inline",
		width: "50px",
		left: 0,
		right: 0,
		marginInline: "auto",
	},

	battleLeft: {
		borderRight: `1px solid ${theme.palette.primary.main}`,
		position: "relative",
		height: "100%",
	},
	outlineTextLeft: {
		color: "#fff",
		fontSize: "92px",
		"-webkit-textStroke": `4px  ${theme.palette.primary.main}`,
		position: "absolute",
		bottom: "20px",
		display: "inline",
		width: "50px",
		left: 0,
		right: 0,
		marginInline: "auto",
	},
	closeButton: {
		position: "absolute",
		top: "10px",
		right: "10px",
		"&:hover": {
			backgroundColor: "transparent",
		},
	},
	closeIcon: {
		color: "#fff",
		fontSize: "2rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "1.5rem",
		},
	},
	vsButton: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: "auto",
		marginInline: "auto",
		height: "95px",
		width: "95px",
		backgroundColor: "#FE858C",
		"&:hover": {
			backgroundColor: "#FE858C",
		},
		[theme.breakpoints.down(1680)]: {
			height: "65px",
			width: "65px",
		},
	},
	vsIcon: {
		color: "#fff",
		fontSize: "36px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "25px",
		},
	},
	battleImg: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},

	warningContainer: {
		height: "100px",
		boxShadow: theme.shadows[3],
		borderRadius: "9px",
		padding: "0 2rem",
		marginTop: "1.5rem",
		maxWidth: "100%",
		[theme.breakpoints.down("lg")]: {
			height: "70px",
			marginTop: '1rem',
		},
	},
	warning: {
		fontSize: "1.06rem",
		marginLeft: "1rem",
		marginTop: "0.3rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "0.75rem",
		},
	},
	block: {
		color: "#FF6464",
		fontSize: "2rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.5rem",
		},
	},
	utilityContainer: {
		width: "32.5%",
	},
	// dialog
	dialogContainer: {
		backgroundColor: theme.palette.common.lightPink,
		padding: "2rem",
	},
	dialogTitle: {
		color: "#000",
		margin: "0",
		fontSize: "32px",
		marginBottom: "2rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "24px",
			marginBottom: "1rem",
		},
	},
	dialogSubtitle: {
		color: "#000",
		margin: "0",
		fontSize: "20px",
		width: "36ch",
		marginBottom: "1.5rem",
		[theme.breakpoints.down(1680)]: {
			fontSize: "15px",
			marginBottom: "1rem",
		},
	},
	skipbtn: {
		width: "265px",
		height: "63px",
		textTransform: "none",
		fontSize: "22px",
		borderRadius: "38px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "15px",
			width: "180px",
			height: "45px",
		},
	},
	endbtn: {
		width: "265px",
		height: "63px",
		textTransform: "none",
		fontSize: "22px",
		borderRadius: "38px",
		backgroundColor: "#FE858C",
		color: "#fff",
		margin: "1rem",
		"&:hover": {
			backgroundColor: "#FB838A",
		},
		[theme.breakpoints.down(1680)]: {
			fontSize: "15px",
			width: "180px",
			height: "45px",
			margin: "0.5rem",
		},
	},
	cancelbtn: {
		width: "265px",
		height: "63px",
		textTransform: "none",
		fontSize: "22px",
		borderRadius: "38px",
		[theme.breakpoints.down(1680)]: {
			fontSize: "15px",
			width: "180px",
			height: "45px",
		},
	},
}));
