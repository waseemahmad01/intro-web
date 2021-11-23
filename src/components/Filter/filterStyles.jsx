import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	heading: {
		color: "#000",
		margin: "0",
		[theme.breakpoints.down("lg")]: {
			fontSize: "18px",
		},
	},
	filterIconContainer: {
		height: "60px",
		width: "60px",
		backgroundColor: "#FE858C",
		"&:hover": {
			backgroundColor: "#FE858C",
		},
		[theme.breakpoints.down("lg")]: {
			height: "45px",
			width: "45px",
		},
	},
	filterIcon: {
		color: "#fff",
		fontSize: "2rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "1.5rem",
		},
	},
	accordionRoot: {
		backgroundColor: theme.palette.common.lightPink,
		borderRadius: "25px",
		width: "392px",
		[theme.breakpoints.down("lg")]: {
			width: "350px",
		},
		"& .MuiAccordionSummary-expandIcon.Mui-expanded": {
			transform: "rotate(0deg)",
		},
	},
	summary: {
		backgroundColor: "#fbfbfb",
		padding: "0.5rem 1rem",
		borderRadius: "25px",
		height: "85px",
		[theme.breakpoints.down("lg")]: {
			height: "55px",
		},
	},
	details: {
		display: "block",
		padding: "5px",
	},
	// child accordion
	childAccordionRoot: {
		width: "100%",
		borderRadius: "12px",
		marginBottom: "2px",
		"& .Mui-expanded": {
			margin: "auto",
		},
		"& .MuiAccordionSummary-expandIcon.Mui-expanded": {
			transform: "rotate(90deg)",
		},
	},
	childaccordionSummary: {
		height: "68px",
		"& .Mui-expanded": {
			minHeight: "20px",
			margin: 0,
			padding: 0,
		},
		[theme.breakpoints.down("lg")]: {
			height: "40px",
		},
	},
	childAccordionTitle: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
	},
	childAccordionHeading: {
		color: "#000",
		margin: "auto 0",
		fontSize: "18px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "13px",
		},
	},
	childAccordionHeading2: {
		color: "#858585",
		margin: "auto 0",
		fontSize: "19px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "14px",
		},
	},
	expandLess: {
		width: "100%",
		"&:hover": {
			backgroundColor: "transparent",
		},
		padding: "0",
		margin: "0",
	},
	expandLessIcon: {
		color: theme.palette.primary.main,
		fontSize: "3rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "2rem",
		},
	},
}));
