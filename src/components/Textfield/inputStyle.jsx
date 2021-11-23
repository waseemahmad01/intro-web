import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
	},
	input: {
		fontSize: "22px",
		backgroundColor: "#fff",
		borderRadius: "34px",
		height: "62px",
		marginBottom: "20px",
		paddingLeft: "7px",
		[theme.breakpoints.down("lg")]: {
			height: "40px",
			fontSize: "15px",
			marginBottom: "10px",
		},
	},
	inputDate: {
		fontSize: "22px",
		backgroundColor: "#fff",
		borderRadius: "34px",
		height: "62px",
		border: `2px solid ${theme.palette.primary.light}`,
		marginBottom: "30px",
		paddingLeft: "7px",
		"&::-webkit-calendar-picker-indicator": {
			// background: `url(${img})`,
			backgroundColor: "red",
			color: "rgba(0,0,0,0)",
			display: "block",
			width: "20px",
			height: "20px",
		},
		[theme.breakpoints.down("lg")]: {
			height: "35px",
			fontSize: "15px",
			border: `1px solid ${theme.palette.primary.light}`,
			marginBottom: "10px",
		},
	},
	inputLabel: {
		marginLeft: "25px",
		marginBottom: "5px",
		[theme.breakpoints.down("lg")]: {
			fontSize: "15px",
			marginLeft: "14px",
		},
	},
	inputRoot:{
		"& .MuiOutlinedInput-root":{
			'& fieldset': {
				border: `2px solid ${theme.palette.primary.main}` ,
			  },
			  '&:hover fieldset': {
				border: `2px solid ${theme.palette.primary.main}`
			  },
			  '&.Mui-focused fieldset': {
				border: `2px solid ${theme.palette.primary.main}`
			  },
		}
	}
}));
