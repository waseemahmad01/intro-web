import React from "react";
import {
	makeStyles,
	Grid,
	FormControlLabel,
	Typography,
	Radio,
	RadioGroup,
	TextField,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "0 3rem",
		[theme.breakpoints.down(1680)]: {
			padding: "0 2rem",
		},
	},
	title: {
		fontSize: "33px",
		fontWeight: 700,
		background: "-webkit-linear-gradient(#654AAB, #E77783)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
		marginRight: "1rem",
		lineHeight: "53px",
		[theme.breakpoints.down(1480)]: {
			fontSize: "25px",
			lineHeight: "45px",
		},
	},
	price: {
		fontSize: "18px",
		color: "#FE858C",
		marginLeft: "1rem",
		lineHeight: "53px",
		[theme.breakpoints.down(1480)]: {
			fontSize: "15px",
			lineHeight: "45px",
		},
	},
	verticalLine: {
		width: "1px",
		display: "inline-block",
		background: "rgba(112,112,112,0.5)",
	},
	formControlLabel: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		"& 	.MuiFormControlLabel-label": {
			marginBottom: "0",
		},
	},
	label: {
		color: "#7E7E7E",
		fontSize: "19px",
		margin: "auto 0",
		[theme.breakpoints.down(1680)]: {
			fontSize: "15px",
		},
	},

	input: {
		fontSize: "16px",
		borderRadius: "34px",
		height: "57px",
		border: "1px solid #A0A0A0",
		marginBottom: "30px",
		paddingLeft: "7px",
		[theme.breakpoints.down(1680)]: {
			height: "45px",
			fontSize: "12px",
			marginBottom: "10px",
		},
	},
	button: {
		width: "216px",
		height: "54px",
		borderRadius: "38px",
		textTransform: "none",
		fontSize: "23px",
		boxShadow: "3px 3px 10px black",
		marginTop: "2rem",
		[theme.breakpoints.down(1680)]: {
			marginTop: "0.5rem",
			height: "40px",
			width: "140px",
			fontSize: "15px",
		},
	},
	radiobtn: {
		transform: "scale(1.5)",
		color: "#cecece",
		borderColor: "#cecece",
		"&:hover": {
			backgroundColor: "transparent",
		},
		"& .Mui-checked": {
			backgroundColor: "transparent",
		},
		[theme.breakpoints.down(1680)]: {
			transform: "scale(1.1)",
		},
	},
	radioButtons: {
		width: "100%",
		marginTop: "2rem",
		[theme.breakpoints.down(1680)]: {
			marginTop: "1rem",
		},
	},
	formContainer: {
		marginTop: "1rem",
		[theme.breakpoints.down(1680)]: {
			marginTop: "0.5rem",
		},
	},
}));
export const BuyGems = () => {
	const classes = useStyles();
	return (
		<Grid
			container
			alignItems="center"
			className={classes.container}
			direction="column"
		>
			<Grid item container justifyContent="center">
				<Grid item>
					<span className={classes.title}>500 Gems</span>
				</Grid>
				<Grid item className={classes.verticalLine}></Grid>
				<Grid item>
					<span className={classes.price}>Total $4.99</span>
				</Grid>
			</Grid>
			<Grid item container>
				<RadioGroup className={classes.radioButtons}>
					<FormControlLabel
						value="paypal"
						className={classes.formControlLabel}
						control={
							<Radio
								disableRipple
								disableFocusRipple
								className={classes.radiobtn}
								color="primary"
							/>
						}
						labelPlacement="start"
						label={
							<Typography variant="h1" className={classes.label}>
								Pay With PAYPAL
							</Typography>
						}
					/>
					<FormControlLabel
						value="creditcard"
						className={classes.formControlLabel}
						control={
							<Radio
								disableRipple
								disableFocusRipple
								className={classes.radiobtn}
								color="primary"
							/>
						}
						labelPlacement="start"
						label={
							<Typography variant="h1" className={classes.label}>
								Pay with credit card
							</Typography>
						}
					/>
				</RadioGroup>
			</Grid>
			<Grid item container className={classes.formContainer}>
				<Grid item container spacing={2}>
					<Grid item xs>
						<TextField
							className={classes.field}
							type="text"
							fullWidth
							variant="outlined"
							placeholder="First Name"
							InputProps={{ className: classes.input }}
							inputProps={{
								style: {
									"&::placeholder": {
										color: "#7E7E7E",
									},
								},
							}}
						/>
					</Grid>
					<Grid item xs>
						<TextField
							className={classes.field}
							type="text"
							variant="outlined"
							placeholder="Last Name"
							InputProps={{ className: classes.input }}
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid item style={{ width: "100%" }}>
					<TextField
						type="text"
						variant="outlined"
						placeholder="Credit Card Number"
						fullWidth
						className={classes.field}
						InputProps={{ className: classes.input }}
					/>
				</Grid>
				<Grid item container spacing={2}>
					<Grid item xs>
						<TextField
							className={classes.field}
							type="text"
							variant="outlined"
							fullWidth
							placeholder="Expiry (MM/YY)"
							InputProps={{ className: classes.input }}
						/>
					</Grid>
					<Grid item xs>
						<TextField
							className={classes.field}
							type="text"
							variant="outlined"
							placeholder="Security"
							fullWidth
							InputProps={{ className: classes.input }}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Button className={classes.button} variant="contained" color="primary">
					Checkout
				</Button>
			</Grid>
		</Grid>
	);
};
