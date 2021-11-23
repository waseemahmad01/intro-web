import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		padding: "0rem 7rem",
		[theme.breakpoints.down(1579)]: {
			padding: "0rem 1.8rem",
		},
		"& .MuiGrid-item":{
			padding: "6px 12px",
			[theme.breakpoints.down(1579)]:{
				padding: "3px 4px",
			}
		}
	},
	liveUser: {
		width: "297px",
		height: "294px",
		position: "relative",
		borderRadius: "11px",
		overflow: "hidden",
		[theme.breakpoints.down(1579)]: {
			width: "199px",
			height: "196px",
		},
	},
	liveUserImage: {
		width: "100%",
		objectFit: "cover",
	},
	userOverly: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		heigth: "100%",
		padding: "1rem",
	},
	views: {
		border: "1px solid #ffffff",
		width: "63px",
		height: "26px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		boxSizing: "border-box",
		borderRadius: "25px",
		[theme.breakpoints.down(1579)]: {
			width: "40px",
			height: "18px",
		},
	},
	viewCount: {
		marginLeft: "5px",
		color: "#fff",
		fontSize: "9px",
		[theme.breakpoints.down(1579)]: {
			fontSize: "8px",
			marginLeft: "3px",
		},
	},
	vsButton: {
		width: "44px",
		height: "44px",
		border: `1px solid ${theme.palette.primary.main}`,
		backgroundColor: "#FE858C",
		[theme.breakpoints.down(1579)]: {
			width: "24px",
			height: "24px",
		},
		"& span": {
			color: "#fff",
			fontSize: "17px",
			[theme.breakpoints.down(1579)]: {
				fontSize: "12px",
			},
		},
	},
	userInfoContainer: {
		marginTop: "55%",
		padding: "0 3.5rem",
		[theme.breakpoints.down(1579)]: {
			padding: "0 2rem",
		},
	},
	userInfo: {
		margin: 0,
		fontSize: "19px",
		[theme.breakpoints.down(1579)]: {
			fontSize: "14px",
		},
	},
	userCity: {
		margin: 0,
		textAlign: "center",
		fontSize: "13px",
		[theme.breakpoints.down(1579)]: {
			fontSize: "11px",
		},
	},
	item: {
		marginBottom: "-2rem",
	}
}));
